//import { proxy} from 'valtio';
import { proxy,snapshot,subscribe } from 'valtio/vanilla';
//const { proxy } = require('valtio');
export const syncState = proxy({
  isSyncing: false,
  lastSyncDate: null,
  syncStats: {
    totalHighlights: 0,
    newHighlights: 0,
    failedHighlights: 0,
    duration: 0,
    categories: []
  },
  error: null,
  progress: {
    current: 0,
    total: 0,
    message: ''
  }
});
//⚙️ 同步配置管理
//从插件设置中获取同步配置，并实现设置变更的实时响应：

class SyncManager {
  constructor() {
    this.settings = null;
    this.readwiseAPI = null;
    this.cleanupFunctions = [];
    
    this.initializeSettings();
    this.setupSettingsListener();
  }

  async initializeSettings() {
    try {
      this.settings = await orca.plugins.getData('readwise-sync', 'settings');
      if (!this.settings) {
        this.settings = this.getDefaultSettings();
      }
    } catch (error) {
      console.error('Failed to load sync settings:', error);
      this.settings = this.getDefaultSettings();
    }
  }

  getDefaultSettings() {
    return {
      apiKey: '',
      autoSyncEnabled: false,
      syncInterval: 30, // 最小5分钟
      lastSyncDate: null,
      syncAllCategories: true,
      includeTags: true
    };
  }
//🔄 增量同步核心逻辑
//实现基于时间戳的高效增量同步，避免重复数据拉取：

  async performSync(triggerType = 'manual') {
    if (syncState.isSyncing) {
      throw new Error('SYNC_IN_PROGRESS');
    }

    syncState.isSyncing = true;
    syncState.error = null;
    syncState.progress = { current: 0, total: 0, message: '准备同步...' };

    try {
      // 验证API密钥和连接
      await this.validateConnection();

      // 获取增量同步时间戳
      const updatedAfter = this.settings.lastSyncDate;
      
      // 执行同步
      const result = await this.syncHighlightsToOrca(updatedAfter);
      
      // 更新同步统计
      this.updateSyncStats(result, triggerType);
      
      // 保存最后同步时间
      await this.saveLastSyncDate();
      
      return result;
      
    } catch (error) {
      syncState.error = error;
      throw error;
    } finally {
      syncState.isSyncing = false;
      syncState.progress = { current: 0, total: 0, message: '' };
    }
  }
//📊 分页处理与性能优化
//处理 Readwise API 的分页响应，确保大数据量的稳定同步：

  async syncHighlightsToOrca(updatedAfter = null) {
    const startTime = Date.now();
    let allHighlights = [];
    let nextPageUrl = null;
    let pageCount = 0;

    syncState.progress.message = '获取高亮内容...';

    do {
      try {
        pageCount++;
        const response = await this.fetchHighlightsPage(updatedAfter, nextPageUrl);
        
        if (response.results && response.results.length > 0) {
          allHighlights = allHighlights.concat(response.results);
          syncState.progress = {
            current: allHighlights.length,
            total: response.count || allHighlights.length,
            message: `已获取 ${allHighlights.length} 条高亮`
          };
        }

        nextPageUrl = response.next;
        
        // 添加延迟避免速率限制
        if (nextPageUrl) {
          await this.delay(200);
        }
        
      } catch (error) {
        console.error(`Failed to fetch page ${pageCount}:`, error);
        throw new Error(`PAGE_FETCH_ERROR: ${error.message}`);
      }
    } while (nextPageUrl);

    return this.processHighlights(allHighlights, startTime);
  }
//🔍 数据过滤与分类处理
//根据用户配置过滤和分类高亮内容：

  processHighlights(highlights, startTime) {
    const processedHighlights = highlights.filter(highlight => 
      this.shouldSyncHighlight(highlight)
    );

    const categories = this.categorizeHighlights(processedHighlights);
    const duration = Date.now() - startTime;

    return {
      totalCount: highlights.length,
      newCount: processedHighlights.length,
      duration,
      categories,
      highlights: processedHighlights
    };
  }

  shouldSyncHighlight(highlight) {
    // 检查是否在同步时间范围内
    if (this.settings.lastSyncDate && 
        highlight.updated_at <= this.settings.lastSyncDate) {
      return false;
    }

    // 检查分类过滤
    if (!this.settings.syncAllCategories && 
        !this.isCategoryEnabled(highlight.category)) {
      return false;
    }

    return true;
  }
//💾 Orca 数据写入
//将高亮内容转换为 Orca 块格式并写入系统：

  async createOrcaBlocks(highlights) {
    const createdBlocks = [];
    const failedBlocks = [];

    syncState.progress.total = highlights.length;
    syncState.progress.message = '创建 Orca 块...';

    for (let i = 0; i < highlights.length; i++) {
      const highlight = highlights[i];
      
      try {
        const block = await this.createHighlightBlock(highlight);
        createdBlocks.push(block);
        
        syncState.progress.current = i + 1;
        syncState.progress.message = `已创建 ${i + 1}/${highlights.length} 个块`;
        
        // 批量处理延迟
        if ((i + 1) % 10 === 0) {
          await this.delay(100);
        }
        
      } catch (error) {
        console.error(`Failed to create block for highlight ${highlight.id}:`, error);
        failedBlocks.push({ highlight, error });
      }
    }

    return { createdBlocks, failedBlocks };
  }

  async createHighlightBlock(highlight) {
    const blockContent = this.formatBlockContent(highlight);
    const properties = this.extractBlockProperties(highlight);

    const newBlock = await orca.blocks.createBlock({
      type: 'text',
      content: blockContent,
      properties: properties
    });

    // 添加标签
    if (this.settings.includeTags && highlight.tags) {
      await this.addTagsToBlock(newBlock.id, highlight.tags);
    }

    return newBlock;
  }
//⚡ 自动同步管理
//管理定时同步任务，确保配置变更时的正确重新调度：

  setupAutoSync() {
    //this.cleanupAutoSync();
    
    if (this.settings.autoSyncEnabled && this.settings.apiKey) {
      const intervalMs = Math.max(5, this.settings.syncInterval) * 60 * 1000;
      
      this.autoSyncInterval = setInterval(() => {
        this.performAutoSync();
      }, intervalMs);
      
      this.cleanupFunctions.push(() => {
        clearInterval(this.autoSyncInterval);
      });
    }
  }

  async performAutoSync() {
    if (syncState.isSyncing) {
      console.log('Auto sync skipped: manual sync in progress');
      return;
    }

    try {
      await this.performSync('auto');
      console.log('Auto sync completed successfully');
    } catch (error) {
      console.error('Auto sync failed:', error);
      // 自动同步错误不显示给用户，仅记录日志
    }
  }
//🔧 设置变更监听
//实时响应设置变更，动态调整同步行为：

  setupSettingsListener() {
    const settingsHandler = async (pluginName, newSettings) => {
      if (pluginName === 'readwise-sync') {
        this.settings = { ...this.settings, ...newSettings };
        
        // 重新配置自动同步
        this.setupAutoSync();
        
        // 更新API密钥
        if (this.readwiseAPI && newSettings.apiKey) {
          this.readwiseAPI.updateSettings(newSettings);
        }
      }
    };

    orca.broadcasts.registerHandler('core.settingsChanged', settingsHandler);
    
    this.cleanupFunctions.push(() => {
      orca.broadcasts.unregisterHandler('core.settingsChanged', settingsHandler);
    });
  }
//🧹 资源清理与生命周期管理
//确保插件卸载时的资源正确释放：

  cleanup() {
    // 清理定时器
    this.cleanupFunctions.forEach(cleanup => cleanup());
    
    // 清理API资源
    if (this.readwiseAPI) {
      this.readwiseAPI.cleanup();
    }
    
    // 重置状态
    syncState.isSyncing = false;
    syncState.error = null;
    syncState.progress = { current: 0, total: 0, message: '' };
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
//📈 统计信息暴露
//提供同步统计信息供主入口文件使用：

  getStats() {
    return {
      isSyncing: syncState.isSyncing,
      lastSyncDate: syncState.lastSyncDate,
      ...syncState.syncStats
    };
  }

  updateSyncStats(result, triggerType) {
    syncState.syncStats = {
      totalHighlights: result.totalCount,
      newHighlights: result.newCount,
      failedHighlights: result.failedCount || 0,
      duration: result.duration,
      categories: result.categories,
      triggerType: triggerType,
      timestamp: new Date().toISOString()
    };
    
    syncState.lastSyncDate = new Date().toISOString();
  }
//🔐 连接验证与错误处理
  async validateConnection() {
    if (!this.settings.apiKey) {
      throw new Error('AUTH_ERROR: API key not configured');
    }

    if (!this.readwiseAPI) {
      this.readwiseAPI = new ReadwiseAPI(this.settings);
    }

    const isValid = await this.readwiseAPI.testConnection();
    if (!isValid) {
      throw new Error('AUTH_ERROR: Invalid API key or connection failed');
    }
  }

  async saveLastSyncDate() {
    this.settings.lastSyncDate = new Date().toISOString();
    await orca.plugins.setData('readwise-sync', 'settings', this.settings);
  }
}
export const syncManager = new SyncManager();
//export { syncState };