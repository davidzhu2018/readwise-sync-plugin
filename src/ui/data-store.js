class DataStore {
  constructor(pluginName = 'readwise-sync') {
    this.pluginName = pluginName;
  }

  // 保存设置配置
  async saveSettings(settings) {
    try {
      await orca.plugins.setData(this.pluginName, 'settings', JSON.stringify(settings));
    } catch (error) {
      throw new Error(`STORAGE_ERROR: Failed to save settings - ${error.message}`);
    }
  }

  // 读取设置配置
  async loadSettings() {
    try {
      const saved = await orca.plugins.getData(this.pluginName, 'settings');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      throw new Error(`STORAGE_ERROR: Failed to load settings - ${error.message}`);
    }
  }

  // 保存最后同步时间戳
  async saveLastSyncDate(isoString) {
    await orca.plugins.setData(this.pluginName, 'lastSyncDate', isoString);
  }

  // 获取最后同步时间戳
  async getLastSyncDate() {
    return await orca.plugins.getData(this.pluginName, 'lastSyncDate');
  }

  // 保存同步统计信息
  async saveSyncStats(stats) {
    await orca.plugins.setData(this.pluginName, 'syncStats', JSON.stringify(stats));
  }

  // 获取同步统计信息
  async getSyncStats() {
    const stats = await orca.plugins.getData(this.pluginName, 'syncStats');
    return stats ? JSON.parse(stats) : null;
  }
}
//🔄 缓存策略实现
//针对 Readwise API 数据特点，实现智能缓存机制：

//高亮内容缓存
class HighlightsCache {
  constructor(pluginName) {
    this.pluginName = pluginName;
    this.cacheTTL = 5 * 60 * 1000; // 5分钟缓存有效期
  }

  // 按分类缓存高亮数据
  async cacheHighlights(category, highlights, cursor = null) {
    const cacheKey = `highlights_${category}`;
    const cacheData = {
      highlights,
      cursor,
      timestamp: Date.now(),
      ttl: this.cacheTTL
    };
    
    await orca.plugins.setData(this.pluginName, cacheKey, JSON.stringify(cacheData));
  }

  // 获取缓存的分类高亮
  async getCachedHighlights(category) {
    const cacheKey = `highlights_${category}`;
    const cached = await orca.plugins.getData(this.pluginName, cacheKey);
    
    if (!cached) return null;
    
    const cacheData = JSON.parse(cached);
    const isExpired = Date.now() - cacheData.timestamp > cacheData.ttl;
    
    return isExpired ? null : cacheData;
  }

  // 清理过期缓存
  async cleanupExpiredCache() {
    const allKeys = await this.getAllCacheKeys();
    
    for (const key of allKeys) {
      if (key.startsWith('highlights_')) {
        const cached = await orca.plugins.getData(this.pluginName, key);
        if (cached) {
          const cacheData = JSON.parse(cached);
          if (Date.now() - cacheData.timestamp > cacheData.ttl) {
            await orca.plugins.removeData(this.pluginName, key);
          }
        }
      }
    }
  }
}
//API 游标缓存管理
class CursorManager {
  constructor(pluginName) {
    this.pluginName = pluginName;
  }

  // 保存分类游标
  async saveCursor(category, cursor) {
    const cursorKey = `cursor_${category}`;
    await orca.plugins.setData(this.pluginName, cursorKey, cursor);
  }

  // 获取分类游标
  async getCursor(category) {
    const cursorKey = `cursor_${category}`;
    return await orca.plugins.getData(this.pluginName, cursorKey);
  }

  // 清理所有游标（用于全量同步）
  async clearAllCursors() {
    const allKeys = await this.getAllDataKeys();
    
    for (const key of allKeys) {
      if (key.startsWith('cursor_')) {
        await orca.plugins.removeData(this.pluginName, key);
      }
    }
  }
}
//⚡ 性能优化策略
//批量写入优化
class BatchWriter {
  constructor(pluginName) {
    this.pluginName = pluginName;
    this.batchQueue = new Map();
    this.batchTimer = null;
    this.BATCH_DELAY = 100; // 100ms批量写入延迟
  }

  // 批量写入数据
  async batchSet(key, value) {
    this.batchQueue.set(key, value);
    
    if (!this.batchTimer) {
      this.batchTimer = setTimeout(() => {
        this.flushBatch();
      }, this.BATCH_DELAY);
    }
  }

  // 刷新批量队列
  async flushBatch() {
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }

    for (const [key, value] of this.batchQueue) {
      await orca.plugins.setData(this.pluginName, key, value);
    }
    
    this.batchQueue.clear();
  }
}
//🔍 数据完整性保障
//原子操作保障
class AtomicOperations {
  constructor(pluginName) {
    this.pluginName = pluginName;
  }

  // 原子更新最后同步时间
  async atomicUpdateLastSync(newSyncDate) {
    try {
      await orca.plugins.setData(this.pluginName, 'lastSyncDate', newSyncDate);
      return true;
    } catch (error) {
      // 记录错误但不中断流程
      console.error('Atomic update failed:', error);
      return false;
    }
  }

  // 事务性保存设置和统计
  async transactionalSave(settings, stats) {
    const settingsJson = JSON.stringify(settings);
    const statsJson = JSON.stringify(stats);
    
    try {
      await orca.plugins.setData(this.pluginName, 'settings', settingsJson);
      await orca.plugins.setData(this.pluginName, 'syncStats', statsJson);
      return true;
    } catch (error) {
      // 事务失败，尝试回滚
      await this.rollbackSave();
      throw new Error(`TRANSACTION_ERROR: Failed to save data - ${error.message}`);
    }
  }
}
//📊 存储状态监控
class StorageMonitor {
  constructor(pluginName) {
    this.pluginName = pluginName;
    this.storageUsage = 0;
  }

  // 估算存储使用量
  async estimateStorageUsage() {
    let totalSize = 0;
    const allKeys = await this.getAllDataKeys();
    
    for (const key of allKeys) {
      const value = await orca.plugins.getData(this.pluginName, key);
      if (value) {
        totalSize += new Blob([value]).size;
      }
    }
    
    this.storageUsage = totalSize;
    return totalSize;
  }

  // 检查存储限制（浏览器本地存储通常5MB）
  async checkStorageLimit() {
    const usage = await this.estimateStorageUsage();
    const limit = 5 * 1024 * 1024; // 5MB
    return {
      usage,
      limit,
      percentage: (usage / limit) * 100,
      isNearLimit: usage > limit * 0.8
    };
  }

  // 自动清理旧数据
  async autoCleanup() {
    const storageInfo = await this.checkStorageLimit();
    
    if (storageInfo.isNearLimit) {
      await this.cleanupExpiredCache();
      // 保留最近7天的同步统计
      await this.cleanupOldStats(7);
    }
  }
}
//🎯 完整导出模块
export default class DataStoreManager {
  constructor(pluginName = 'readwise-sync') {
    this.pluginName = pluginName;
    this.dataStore = new DataStore(pluginName);
    this.highlightsCache = new HighlightsCache(pluginName);
    this.cursorManager = new CursorManager(pluginName);
    this.batchWriter = new BatchWriter(pluginName);
    this.atomicOps = new AtomicOperations(pluginName);
    this.storageMonitor = new StorageMonitor(pluginName);
  }

  // 初始化存储系统
  async initialize() {
    // 清理过期缓存
    await this.highlightsCache.cleanupExpiredCache();
    
    // 检查存储状态
    await this.storageMonitor.autoCleanup();
    
    // 加载初始设置
    return await this.dataStore.loadSettings();
  }

  // 统一数据访问接口
  get settings() {
    return this.dataStore;
  }

  get cache() {
    return this.highlightsCache;
  }

  get cursors() {
    return this.cursorManager;
  }

  // 插件卸载时的清理
  async cleanup() {
    await this.batchWriter.flushBatch();
    await this.highlightsCache.cleanupExpiredCache();
  }
}