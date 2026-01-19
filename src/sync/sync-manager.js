/**
 * @type {import('../orca.d.ts').OrcaAPI}
 */
globalThis.orca = globalThis.orca || {};

//import { proxy} from 'valtio';
import { proxy,snapshot,subscribe } from 'valtio/vanilla';
import ReadwiseAPI from './readwise-api.js';
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
      defaultSyncMode: 'incremental',
      autoSyncEnabled: false,
      syncInterval: 30, // 最小5分钟
      lastSyncDate: null,
      syncCategory: 'all',
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

    // 显示开始同步消息
    orca.notify('info', '正在同步中，请稍候！');

    const syncStartTime = Date.now();

    try {
      // 验证API密钥和连接
      await this.validateConnection();

      // 根据同步类型决定是否使用增量同步
      // triggerType: 'incremental' | 'full' | 'auto' | 'manual'
      let updatedAfter = null;

      if (triggerType === 'full') {
        // 全量同步：不传递时间戳，获取所有数据
        updatedAfter = null;
        console.log('Performing full sync (all highlights)');
      } else if (triggerType === 'incremental') {
        // 增量同步：使用上次同步时间
        updatedAfter = this.settings.lastSyncDate;
        console.log('Performing incremental sync', updatedAfter ? `after ${updatedAfter}` : '(first sync)');
      } else {
        // manual 或 auto：使用配置的默认同步模式
        const defaultMode = this.settings.defaultSyncMode || 'incremental';
        if (defaultMode === 'full') {
          updatedAfter = null;
          console.log('Performing full sync (default mode)');
        } else {
          updatedAfter = this.settings.lastSyncDate;
          console.log('Performing incremental sync (default mode)', updatedAfter ? `after ${updatedAfter}` : '(first sync)');
        }
      }

      // 执行同步（获取和处理数据）
      const result = await this.syncHighlightsToOrca(updatedAfter);

      // 更新同步统计
      this.updateSyncStats(result, triggerType);

      // 保存最后同步时间
      await this.saveLastSyncDate();

      // 计算耗时
      const syncEndTime = Date.now();
      const totalDuration = syncEndTime - syncStartTime;
      const minutes = Math.floor(totalDuration / 60000);
      const seconds = Math.floor((totalDuration % 60000) / 1000);

      // 显示完成消息
      orca.notify('success', `同步完成，本次同步 ${result.newCount} 条数据，耗时 ${minutes} 分 ${seconds} 秒。`);

      return result;

    } catch (error) {
      syncState.error = error;
      orca.notify('error', `同步失败：${error.message}`);
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

    syncState.progress.message = '获取高亮内容...';

    try {
      // 使用 Readwise Export API 获取所有高亮
      const allBooks = await this.readwiseAPI.exportHighlights(updatedAfter);

      // 从 Export API 响应中提取所有高亮
      // Export API 返回: { results: [{ user_book_id, title, author, highlights: [...] }, ...] }
      const allHighlights = [];
      for (const book of allBooks) {
        if (book.highlights && Array.isArray(book.highlights)) {
          // 为每个高亮添加书籍信息
          for (const highlight of book.highlights) {
            allHighlights.push({
              ...highlight,
              book_title: book.title,
              author: book.author,
              category: book.category || 'books'
            });
          }
        }
      }

      syncState.progress = {
        current: 0,
        total: allHighlights.length,
        message: `已获取 ${allHighlights.length} 条高亮`
      };

      // 过滤并创建 Orca 块
      const { createdBlocks, failedBlocks } = await this.createOrcaBlocks(allHighlights);

      const categories = this.categorizeHighlights(allHighlights);
      const duration = Date.now() - startTime;

      return {
        totalCount: allHighlights.length,
        newCount: createdBlocks.length,
        failedCount: failedBlocks.length,
        duration,
        categories
      };
    } catch (error) {
      console.error('Failed to fetch highlights:', error);
      throw new Error(`FETCH_ERROR: ${error.message}`);
    }
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
    // 如果是首次同步（lastSyncDate 为空），同步所有内容
    if (!this.settings.lastSyncDate) {
      return true;
    }

    // 检查是否在同步时间范围内
    if (highlight.updated_at && highlight.updated_at <= this.settings.lastSyncDate) {
      return false;
    }

    // 检查分类过滤
    if (!this.isCategoryEnabled(highlight.category)) {
      return false;
    }

    return true;
  }

  categorizeHighlights(highlights) {
    const categories = {};
    highlights.forEach(h => {
      const category = h.category || 'uncategorized';
      categories[category] = (categories[category] || 0) + 1;
    });
    return categories;
  }

  isCategoryEnabled(category) {
    // 如果选择了 'all'，则同步所有分类
    if (this.settings.syncCategory === 'all') {
      return true;
    }
    // 检查高亮的分类是否与选择的分类匹配
    return category === this.settings.syncCategory;
  }

  formatBlockContent(highlight) {
    // 格式化高亮内容为 Orca 块内容
    let content = String(highlight.text || highlight.highlight || '');

    // 添加来源信息
    if (highlight.book_title) {
      content += `\n\n来源: ${String(highlight.book_title)}`;
      if (highlight.author) {
        content += ` by ${String(highlight.author)}`;
      }
    }

    // 添加高亮位置信息
    if (highlight.highlighted_at) {
      content += `\n高亮时间: ${String(highlight.highlighted_at)}`;
    }

    return content;
  }

  extractBlockProperties(highlight) {
    const properties = [];

    // 添加 Readwise ID
    if (highlight.id) {
      properties.push({
        name: 'readwise_id',
        type: 'string',
        value: highlight.id.toString()
      });
    }

    // 添加分类信息
    if (highlight.category) {
      properties.push({
        name: 'category',
        type: 'string',
        value: highlight.category
      });
    }

    // 添加更新时间
    if (highlight.updated_at) {
      properties.push({
        name: 'updated_at',
        type: 'string',
        value: highlight.updated_at
      });
    }

    // 添加笔记 URL
    if (highlight.highlight_url) {
      properties.push({
        name: 'highlight_url',
        type: 'string',
        value: highlight.highlight_url
      });
    }

    return properties;
  }

  async addTagsToBlock(blockId, tags) {
    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return;
    }

    for (const tag of tags) {
      try {
        // 假设 orca.blocks 有 addTag 方法
        if (orca.blocks.addTag) {
          await orca.blocks.addTag(blockId, tag.name || tag);
        }
      } catch (error) {
        console.error(`Failed to add tag ${tag} to block ${blockId}:`, error);
      }
    }
  }
//💾 Orca 数据写入
//将高亮内容转换为 Orca 块格式并写入系统：

  async createOrcaBlocks(highlights) {
    const createdBlocks = [];
    const failedBlocks = [];

    console.log('Starting to create blocks for', highlights.length, 'highlights');

    // 获取根块ID - 简化逻辑，直接查找根块
    let rootBlockId = null;

    // 直接查找根块（最快的方法）
    const blocks = orca.state?.blocks;
    if (blocks) {
      for (const blockId in blocks) {
        const block = blocks[blockId];
        if (!block.parent && !block.left) {
          rootBlockId = blockId;
          console.log('Found root block:', rootBlockId);
          break;
        }
      }
    }

    // 如果还是找不到，抛出错误
    if (!rootBlockId) {
      throw new Error('No root block found. Please open a document or journal page first.');
    }

    console.log('Using root block ID:', rootBlockId);

    // 创建同步标记块：ReadwiseSyncToOrca + 年月日时分秒
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    const syncTimestamp = `${year}${month}${day}${hour}${minute}${second}`;
    const syncBlockTitle = `ReadwiseSyncToOrca${syncTimestamp}`;

    let syncRootBlockId = null;
    try {
      // 在根块的最后创建同步标记块
      syncRootBlockId = await orca.commands.invokeEditorCommand(
        'core.editor.insertBlock',
        null,
        rootBlockId,
        'lastChild',
        [{ t: 't', v: syncBlockTitle }]
      );

      console.log('Created sync root block with ID:', syncRootBlockId);

      if (syncRootBlockId) {
        // 将其转换为二级标题
        await orca.commands.invokeEditorCommand('core.editor.makeHeading2', null, syncRootBlockId);

        // 添加 "Readwise" 标签到同步标记块
        try {
          await orca.commands.invokeEditorCommand(
            'core.editor.insertTag',
            null,
            syncRootBlockId,
            'Readwise'
          );
          console.log('Added Readwise tag to sync block');
        } catch (tagError) {
          console.warn('Failed to add tag to sync block:', tagError);
        }

        // 等待一下让块完全创建
        await this.delay(100);

        syncState.progress.total = highlights.length;
        syncState.progress.message = '创建 Orca 块...';

        console.log('Creating category structure for', highlights.length, 'highlights');

        const validHighlights = highlights.filter(h => {
          const text = this.formatBlockContent(h);
          return text && text.trim() !== '';
        });

        console.log('Valid highlights to create:', validHighlights.length);

        // 按分类组织高亮
        const categoryHighlights = this.groupHighlightsByCategory(validHighlights);
        console.log('Grouped highlights by category:', Object.keys(categoryHighlights).map(cat => `${cat}: ${categoryHighlights[cat].length}`));

        // 创建三级结构：分类块 + 高亮块
        await this.createCategoryBlocks(syncRootBlockId, categoryHighlights, createdBlocks, failedBlocks);

        syncState.progress.current = createdBlocks.length;
        syncState.progress.message = `已创建 ${createdBlocks.length}/${validHighlights.length} 个块`;

        console.log('Created', createdBlocks.length, 'blocks, failed', failedBlocks.length);

        // 等待一下让块完全创建
        await this.delay(200);

        // 验证块是否真的被创建
        const syncBlock = orca.state.blocks[syncRootBlockId];
        if (syncBlock) {
          console.log('Sync block verification:', {
            id: syncBlock.id,
            text: syncBlock.text,
            content: syncBlock.content,
            children: syncBlock.children?.length || 0,
            parent: syncBlock.parent,
            left: syncBlock.left
          });

          // 验证子块
          if (syncBlock.children && Array.isArray(syncBlock.children)) {
            console.log('Children block IDs:', syncBlock.children);
            syncBlock.children.forEach((childId, index) => {
              const childBlock = orca.state.blocks[childId];
              if (childBlock) {
                console.log(`Child ${index}:`, {
                  id: childBlock.id,
                  parent: childBlock.parent,
                  left: childBlock.left,
                  text: childBlock.text?.substring(0, 30)
                });
              } else {
                console.warn(`Child block ${childId} not found in state!`);
              }
            });
          } else {
            console.warn('Sync block has no children array');
          }
        } else {
          console.warn('Sync block not found in orca.state.blocks after creation!');
        }
      }
    } catch (error) {
      console.error('Failed to create sync block:', error);
      throw new Error('Failed to create sync block: ' + error.message);
    }

    return { createdBlocks, failedBlocks };
  }

  // 按分类分组高亮
  groupHighlightsByCategory(highlights) {
    const categories = {
      books: [],
      articles: [],
      tweets: [],
      supplementals: [],
      podcasts: []
    };

    for (const highlight of highlights) {
      const category = highlight.category || 'books';
      if (categories[category]) {
        categories[category].push(highlight);
      } else {
        // 默认归入 books
        categories.books.push(highlight);
      }
    }

    return categories;
  }

  // 创建分类块和高亮块的三级结构
  async createCategoryBlocks(syncRootBlockId, categoryHighlights, createdBlocks, failedBlocks) {
    console.log('Creating category blocks...');

    // 5个分类的顺序
    const categoryOrder = ['books', 'articles', 'tweets', 'supplementals', 'podcasts'];

    // 确保同步标记块有 children 数组
    if (!orca.state.blocks[syncRootBlockId].children) {
      orca.state.blocks[syncRootBlockId].children = [];
    }

    // 获取根块ID（用于创建独立分类块）
    let rootBlockId = null;
    const blocks = orca.state?.blocks;
    if (blocks) {
      for (const blockId in blocks) {
        const block = blocks[blockId];
        if (!block.parent && !block.left) {
          rootBlockId = blockId;
          break;
        }
      }
    }

    if (!rootBlockId) {
      console.error('No root block found for creating category blocks');
      return;
    }

    const categoryBlockIds = {};

    // 第一步：创建5个分类块（books, articles, tweets, supplementals, podcasts）
    for (let i = 0; i < categoryOrder.length; i++) {
      const category = categoryOrder[i];
      const highlights = categoryHighlights[category];

      // 跳过没有高亮的分类
      if (!highlights || highlights.length === 0) {
        console.log(`Skipping category ${category} (no highlights)`);
        continue;
      }

      try {
        // 在根块下创建分类块（独立块）
        const categoryBlockId = await orca.commands.invokeEditorCommand(
          'core.editor.insertBlock',
          null,
          rootBlockId,
          'lastChild',
          [{ t: 't', v: category }]
        );

        // 转换为三级标题
        await orca.commands.invokeEditorCommand('core.editor.makeHeading3', null, categoryBlockId);

        // 添加标签
        try {
          await orca.commands.invokeEditorCommand(
            'core.editor.insertTag',
            null,
            categoryBlockId,
            `Readwise/${category}`
          );
        } catch (tagError) {
          console.warn(`Failed to add tag to category block ${category}:`, tagError);
        }

        categoryBlockIds[category] = categoryBlockId;
        console.log(`Created category block ${categoryBlockId} for ${category}`);

      } catch (error) {
        console.error(`Failed to create category block for ${category}:`, error);
      }
    }

    console.log('Created category blocks:', Object.keys(categoryBlockIds));

    // 等待所有分类块创建完成
    await this.delay(100);

    // 第二步：将所有分类块移动到同步标记块下，并设置正确的属性
    const categoryBlockIdsArray = Object.keys(categoryBlockIds).map(cat => categoryBlockIds[cat]);

    if (categoryBlockIdsArray.length > 0) {
      console.log(`Moving ${categoryBlockIdsArray.length} category blocks to sync root...`);

      // 使用 moveBlocks 批量移动所有分类块到同步标记块下
      try {
        await orca.commands.invokeEditorCommand(
          'core.editor.moveBlocks',
          null,
          categoryBlockIdsArray,
          syncRootBlockId,
          'lastChild'
        );
        console.log(`Moved ${categoryBlockIdsArray.length} category blocks to sync root using moveBlocks`);
      } catch (error) {
        console.error('Failed to move category blocks using moveBlocks:', error);
      }

      // 手动设置每个分类块的 parent 和 left 属性
      for (let i = 0; i < categoryBlockIdsArray.length; i++) {
        const blockId = categoryBlockIdsArray[i];
        const prevBlockId = i > 0 ? categoryBlockIdsArray[i - 1] : null;

        // 设置 parent 和 left
        if (orca.state.blocks[blockId]) {
          orca.state.blocks[blockId].parent = syncRootBlockId;
          orca.state.blocks[blockId].left = prevBlockId;
          console.log(`Set category block ${blockId}: parent=${syncRootBlockId}, left=${prevBlockId}`);
        }

        // 添加到同步标记块的 children 数组
        if (!orca.state.blocks[syncRootBlockId].children.includes(blockId)) {
          orca.state.blocks[syncRootBlockId].children.push(blockId);
        }
      }

      console.log('All category blocks moved and properties set');
    }

    // 第三步：为每个分类创建高亮块
    for (const category of categoryOrder) {
      const categoryBlockId = categoryBlockIds[category];
      const highlights = categoryHighlights[category];

      if (!categoryBlockId || !highlights || highlights.length === 0) {
        continue;
      }

      console.log(`Creating highlights for category ${category} (${highlights.length} highlights)...`);

      // 为该分类创建高亮块
      await this.createBlocksIndividually(
        categoryBlockId,
        category,
        highlights,
        createdBlocks,
        failedBlocks
      );

      console.log(`Completed category ${category}`);
    }

    console.log('All category blocks and highlights created');
  }

  // 并发创建独立块，然后移动到同步标记块下
  async createBlocksIndividually(syncRootBlockId, categoryName, validHighlights, createdBlocks, failedBlocks) {
    console.log(`Creating ${validHighlights.length} blocks for category ${categoryName}...`);

    // 根据总条数确定刷新频率
    const totalCount = validHighlights.length;
    let refreshInterval;
    if (totalCount > 600) {
      refreshInterval = 200;
    } else if (totalCount > 200) {
      refreshInterval = 100;
    } else {
      refreshInterval = 50;
    }

    // 自适应并发数：根据高亮数量动态调整
    let CONCURRENCY;
    if (totalCount > 1000) {
      CONCURRENCY = 100;  // 大量数据使用更高并发
    } else if (totalCount > 500) {
      CONCURRENCY = 80;
    } else if (totalCount > 200) {
      CONCURRENCY = 50;
    } else {
      CONCURRENCY = 30;   // 少量数据使用较低并发
    }

    console.log(`Using adaptive concurrency: ${CONCURRENCY} for ${totalCount} highlights`);

    // 直接使用高并发逐个创建（batchInsertText 不稳定，暂时禁用）
    return await this.createBlocksIndividuallyLegacy(
      syncRootBlockId,
      categoryName,
      validHighlights,
      createdBlocks,
      failedBlocks,
      refreshInterval,
      CONCURRENCY
    );
  }

  // 原有的逐个创建方法（高并发优化版）
  async createBlocksIndividuallyLegacy(syncRootBlockId, categoryName, validHighlights, createdBlocks, failedBlocks, refreshInterval, CONCURRENCY) {
    // 获取根块ID（用于创建独立块）
    let rootBlockId = null;
    const blocks = orca.state?.blocks;
    if (blocks) {
      for (const blockId in blocks) {
        const block = blocks[blockId];
        if (!block.parent && !block.left) {
          rootBlockId = blockId;
          break;
        }
      }
    }

    if (!rootBlockId) {
      throw new Error('No root block found for creating independent blocks');
    }

    // 并发创建独立块的函数
    const createIndependentBlock = async (highlight, index) => {
      const text = this.formatBlockContent(highlight);
      try {
        // 在根块下创建独立块
        const blockId = await orca.commands.invokeEditorCommand(
          'core.editor.insertBlock',
          null,
          rootBlockId,
          'lastChild',
          [{ t: 't', v: text }]
        );
        return { success: true, blockId, highlight, index };
      } catch (error) {
        return { success: false, error, highlight, index };
      }
    };

    const independentBlocks = [];
    let batchCreatedCount = 0;

    for (let i = 0; i < validHighlights.length; i += CONCURRENCY) {
      const batch = validHighlights.slice(i, i + CONCURRENCY);
      const batchPromises = batch.map((highlight, batchIndex) =>
        createIndependentBlock(highlight, i + batchIndex)
      );

      const results = await Promise.all(batchPromises);

      for (const result of results) {
        if (result.success) {
          independentBlocks.push({
            id: result.blockId,
            content: this.formatBlockContent(result.highlight),
            originalIndex: result.index
          });
          createdBlocks.push({ id: result.blockId, content: this.formatBlockContent(result.highlight) });
          batchCreatedCount++;
        } else {
          failedBlocks.push({ highlight: result.highlight, error: result.error });
        }
      }

      // 根据刷新频率更新进度
      if ((batchCreatedCount % refreshInterval === 0) || batchCreatedCount === validHighlights.length) {
        syncState.progress.current = batchCreatedCount;
        syncState.progress.message = `${categoryName}: ${batchCreatedCount}/${validHighlights.length}`;
      }
    }

    console.log(`Created ${independentBlocks.length} independent blocks for category ${categoryName}`);

    // 按原始顺序排序
    independentBlocks.sort((a, b) => a.originalIndex - b.originalIndex);

    // 移动所有独立块到同步标记块下
    await this.moveBlocksToParent(syncRootBlockId, independentBlocks);

    // 返回本次创建的数量
    return independentBlocks.length;
  }

  // 移动块到父块下并设置正确的parent/left/children属性
  async moveBlocksToParent(parentBlockId, blocks) {
    if (blocks.length === 0) return;

    console.log(`Moving ${blocks.length} blocks to parent ${parentBlockId}...`);

    // 确保父块有 children 数组
    if (!orca.state.blocks[parentBlockId].children) {
      orca.state.blocks[parentBlockId].children = [];
    }

    // 收集所有要移动的块ID
    const blockIds = blocks.map(b => b.id);

    // 使用 moveBlocks 批量移动所有块到父块下
    try {
      await orca.commands.invokeEditorCommand(
        'core.editor.moveBlocks',
        null,
        blockIds,
        parentBlockId,
        'lastChild'
      );
      console.log(`Moved ${blockIds.length} blocks to parent ${parentBlockId} using moveBlocks`);
    } catch (error) {
      console.error('Failed to move blocks using moveBlocks:', error);
    }

    // 手动设置每个子块的 parent 和 left 属性
    const parentChildren = orca.state.blocks[parentBlockId].children;

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      const blockId = block.id;
      const prevBlockId = i > 0 ? blocks[i - 1].id : null;

      // 设置 parent 和 left
      if (orca.state.blocks[blockId]) {
        orca.state.blocks[blockId].parent = parentBlockId;
        orca.state.blocks[blockId].left = prevBlockId;
        console.log(`Set block ${blockId}: parent=${parentBlockId}, left=${prevBlockId}`);
      }

      // 同步刷新父块的 children 数组
      if (!parentChildren.includes(blockId)) {
        parentChildren.push(blockId);
      }
    }

    console.log(`All ${blocks.length} blocks moved and properties set successfully`);
  }

  // 获取当前活动的面板
  async getActivePanel() {
    // 从 orca.state.panels 中找到活动的面板
    console.log('Looking for active panel, orca.state:', orca.state);

    if (orca.state) {
      // 尝试直接访问 panels
      if (orca.state.panels) {
        for (const panelId in orca.state.panels) {
          const panel = orca.state.panels[panelId];
          console.log('Checking panel:', panelId, panel);
          // 假设活动的面板是 journal 或 block 类型的面板
          if (panel.view === 'journal' || panel.view === 'block') {
            console.log('Found active panel:', panel);
            return panel;
          }
        }
      } else {
        console.log('orca.state.panels is not available, trying alternative methods');

        // 尝试使用 orca.commands 来获取当前编辑器状态
        try {
          // 获取所有块，找到没有父块的根块
          const blocks = orca.state?.blocks;
          if (blocks) {
            console.log('Found blocks in state:', Object.keys(blocks).length);

            // 找到第一个没有父块的块作为根块
            for (const blockId in blocks) {
              const block = blocks[blockId];
              if (!block.parent && !block.left) {
                console.log('Found root block by iterating blocks:', blockId, block);
                // 返回一个模拟的面板对象
                return {
                  rootBlockId: blockId,
                  view: 'block',
                  id: blockId
                };
              }
            }
          }
        } catch (e) {
          console.error('Error finding root block:', e);
        }
      }
    }

    console.warn('No active panel found, falling back to today\'s journal page');
    // 如果没有找到活动面板，返回 null，让调用者处理
    return null;
  }

  // 获取或创建今日日记页面
  async getOrCreateTodayJournalPage() {
    try {
      // 获取今天的日期（格式：YYYY-MM-DD）
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;

      console.log('Getting or creating journal page for date:', dateStr);

      // 尝试通过命令获取今日日记页面
      try {
        // 使用 orca.commands 调用获取日记块
        const journalBlock = await orca.commands.invokeCommand('core.journal.getJournalBlock', dateStr);

        if (journalBlock) {
          console.log('Found today\'s journal block:', journalBlock);
          return {
            rootBlockId: journalBlock.id || journalBlock,
            view: 'journal',
            id: journalBlock.id || journalBlock
          };
        }
      } catch (journalError) {
        console.log('Journal block command failed, trying alternative method:', journalError);
      }

      // 如果命令失败，尝试直接在 blocks 中查找日记块
      try {
        const blocks = orca.state?.blocks;
        if (blocks) {
          // 查找可能包含今日日期的块
          for (const blockId in blocks) {
            const block = blocks[blockId];
            if (block.text && (block.text.includes(dateStr) || block.text.includes('Journal'))) {
              console.log('Found potential journal block by text:', blockId, block);
              return {
                rootBlockId: blockId,
                view: 'journal',
                id: blockId
              };
            }
          }
        }
      } catch (searchError) {
        console.log('Failed to search for journal block:', searchError);
      }

      // 如果无法获取日记页面，返回 null 让调用者使用其他方法
      console.warn('Could not get or create journal page');
      return null;

    } catch (error) {
      console.error('Error getting today\'s journal page:', error);
      return null;
    }
  }

  // 在面板中找到根块（没有 parent 的块）
  findRootBlock(panel) {
    if (!panel || !panel.rootBlockId) {
      return null;
    }

    const rootBlock = orca.state.blocks[panel.rootBlockId];
    if (rootBlock) {
      console.log('Found root block:', rootBlock);
      return panel.rootBlockId;
    }

    // 如果没有 rootBlockId，遍历所有块找到没有 parent 的块
    for (const blockId in orca.state.blocks) {
      const block = orca.state.blocks[blockId];
      if (!block.parent) {
        console.log('Found root block by iteration:', block);
        return blockId;
      }
    }

    return null;
  }

  // 获取或创建 Readwise 分类块
  async getOrCreateReadwiseBlock() {
    // 尝试查找别名为 "Readwise" 的块
    try {
      const readwiseBlock = await orca.invokeBackend('get-block-by-alias', 'Readwise');
      if (readwiseBlock) {
        console.log('Found existing Readwise block:', readwiseBlock);
        return readwiseBlock;
      }
    } catch (error) {
      // 块不存在，需要创建
      console.log('Readwise block not found, will create new one');
    }

    // 创建 Readwise 分类块
    try {
      // 先创建一个普通文本块
      const newBlockId = await orca.commands.invokeEditorCommand(
        'core.editor.insertBlock',
        null,
        null,  // refBlock 为 null，插入到根级别
        'lastChild',
        [{ t: 't', v: 'Readwise Highlights' }]
      );

      if (newBlockId) {
        // 将其转换为二级标题
        await orca.commands.invokeEditorCommand('core.editor.makeHeading2', null, newBlockId);

        // 创建别名
        await orca.commands.invokeEditorCommand(
          'core.editor.createAlias',
          null,
          'Readwise',
          newBlockId
        );

        // 获取刚创建的块对象
        const newBlock = orca.state.blocks[newBlockId];
        if (newBlock) {
          console.log('Created new Readwise block:', newBlock);
          return newBlock;
        }
      }
    } catch (error) {
      console.error('Failed to create Readwise block:', error);
    }

    throw new Error('Failed to create Readwise block');
  }

  async createHighlightBlock(highlight) {
    const blockContent = this.formatBlockContent(highlight);

    // 获取 Readwise 分类块（块对象）
    const rootBlock = await this.getOrCreateReadwiseBlock();

    if (!rootBlock) {
      throw new Error('Readwise block not found');
    }

    // 使用 core.editor.insertBlock 创建块
    // 不传递 repr 参数，默认为文本块
    const blockId = await orca.commands.invokeEditorCommand(
      'core.editor.insertBlock',
      null,
      rootBlock,
      'lastChild',
      [{ t: 't', v: blockContent }]
    );

    return { id: blockId };
  }

  formatContentForOrca(text) {
    // 将文本格式化为 Orca 的内容格式（包含 content 类型的数组）
    return [{ t: 't', v: text }];
  }
//⚡ 自动同步管理
//管理定时同步任务，确保配置变更时的正确重新调度：

  setupAutoSync() {
    // 清理现有的自动同步定时器
    this.cleanupAutoSync();

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

  // 清理自动同步定时器
  cleanupAutoSync() {
    if (this.autoSyncInterval) {
      clearInterval(this.autoSyncInterval);
      this.autoSyncInterval = null;
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
    // 每次验证前重新从持久化存储加载最新设置
    try {
      const savedSettings = await orca.plugins.getData('readwise-sync', 'settings');
      if (savedSettings) {
        this.settings = { ...this.settings, ...savedSettings };
        console.log('Loaded settings for validation:', this.settings);
      }
    } catch (error) {
      console.error('Failed to load settings for validation:', error);
    }

    if (!this.settings.apiKey) {
      throw new Error('AUTH_ERROR: API key not configured');
    }

    if (!this.readwiseAPI) {
      this.readwiseAPI = new ReadwiseAPI(this.settings);
    } else {
      // 确保 readwiseAPI 使用最新的 API Key
      this.readwiseAPI.updateSettings(this.settings);
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