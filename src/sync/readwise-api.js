/**
 * @type {import('../orca.d.ts').OrcaAPI}
 */
globalThis.orca = globalThis.orca || {};

import { proxy,snapshot,subscribe } from 'valtio/vanilla';
//const { proxy } = require('valtio');
class ReadwiseAPI {
  constructor(apiKey) {
    this.baseURL = 'https://readwise.io/api/v2';
    this.apiKey = apiKey;
    this.requestState = proxy({
      isConnected: false,
      lastError: null,
      requestCount: 0
    });
  }

  // 更新配置（响应 settingsChanged 广播）
  updateSettings(settings) {
    this.apiKey = settings.apiKey;
    this.requestState.lastError = null;
  }
//🔐 统一请求封装与错误处理
//请求拦截器 实现了与 main.ts 错误通知规范的对接：

async makeRequest(endpoint, options = {}) {
  if (!this.apiKey) {
    throw new Error('AUTH_ERROR: Readwise API key not configured');
  }

  const url = `${this.baseURL}${endpoint}`;
  const config = {
    headers: {
      'Authorization': `Token ${this.apiKey}`,
      'Content-Type': 'application/json',
    },
    ...options
  };

  try {
    this.requestState.requestCount++;
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorType = response.status === 401 ? 'AUTH_ERROR' : 
                       response.status === 429 ? 'RATE_LIMIT_ERROR' : 'NETWORK_ERROR';
      throw new Error(`${errorType}: HTTP ${response.status} - ${await response.text()}`);
    }
    
    return await response.json();
  } catch (error) {
    this.requestState.lastError = error.message;
    console.error('Readwise API Request Failed:', error);
    throw error;
  }
}
//📖 分页获取所有高亮内容
//核心同步接口 实现了基于游标的分页机制，支持增量同步：

async getHighlights(updatedAfter = null) {
  let allHighlights = [];
  let nextCursor = null;
  let page = 1;

  console.log(`🔄 Fetching highlights ${updatedAfter ? `updated after ${updatedAfter}` : 'all time'}`);

  do {
    const params = new URLSearchParams({
      page_size: '1000'  // Readwise API 允许的最大页大小
    });

    if (updatedAfter) {
      params.append('updated_after', updatedAfter);  // 支持增量同步
    }
    if (nextCursor) {
      params.append('page', page.toString());
    }

    try {
      const data = await this.makeRequest(`/highlights?${params.toString()}`);

      if (data?.results) {
        allHighlights = allHighlights.concat(data.results);
        console.log(`📄 Page ${page}: ${data.results.length} highlights`);

        // Readwise 使用基于游标的分页
        nextCursor = data.next ? page + 1 : null;
        page++;

        // 遵守速率限制：每页请求后延迟 100ms
        await this.delay(100);
      } else {
        nextCursor = null;
      }
    } catch (error) {
      console.error(`❌ Failed to fetch page ${page}:`, error);
      throw error;  // 向上传递错误供 main.ts 统一处理
    }
  } while (nextCursor);

  console.log(`✅ Total highlights fetched: ${allHighlights.length}`);
  return allHighlights;
}

//📤 Export API - 推荐的导出端点
//使用 Readwise Export API 获取所有高亮（包括书籍信息）

async exportHighlights(updatedAfter = null) {
  let allData = [];
  let nextPageCursor = null;

  console.log(`🔄 Exporting highlights ${updatedAfter ? `updated after ${updatedAfter}` : 'all time'}`);

  do {
    const params = new URLSearchParams();

    if (nextPageCursor) {
      params.append('pageCursor', nextPageCursor);
    }
    if (updatedAfter) {
      params.append('updatedAfter', updatedAfter);
    }

    console.log(`Making export API request with params: ${params.toString()}`);

    try {
      const response = await this.makeRequest(`/export/?${params.toString()}`);

      if (response?.results) {
        allData = allData.concat(response.results);
        nextPageCursor = response.nextPageCursor;
        console.log(`📄 Fetched ${response.results.length} books, total highlights so far: ${allData.reduce((sum, book) => sum + (book.highlights?.length || 0), 0)}`);
      } else {
        nextPageCursor = null;
      }

      // 遵守速率限制：每页请求后延迟 100ms
      if (nextPageCursor) {
        await this.delay(100);
      }
    } catch (error) {
      console.error(`❌ Failed to export page:`, error);
      throw error;
    }
  } while (nextPageCursor);

  console.log(`✅ Export complete: ${allData.length} books`);
  return allData;
}
//🧪 连接测试接口
//认证验证 为配置界面提供实时反馈：

async testConnection() {
  try {
    // Readwise API 没有专门的认证端点，通过获取书籍列表测试连接
    const data = await this.makeRequest('/books?page_size=1');
    this.requestState.isConnected = true;
    return true;
  } catch (error) {
    this.requestState.isConnected = false;
    return false;
  }
}
//📊 分类内容获取（支持同步所有分类）
////多类型支持 确保所有分类内容都能被同步：

async getHighlightsByCategory(category, updatedAfter = null) {
  const params = new URLSearchParams({
    category: category,
    page_size: '1000'
  });

  if (updatedAfter) {
    params.append('updated_after', updatedAfter);
  }

  return await this.makeRequest(`/highlights?${params.toString()}`);
}

// 支持的主要内容类型
static get SupportedCategories() {
  return ['books', 'articles', 'tweets', 'podcasts', 'supplementals'];
}
//⚡ 性能优化与资源管理
//请求控制 确保符合最小同步间隔要求：

// 延迟函数，避免触发速率限制
delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 清理函数，供 main.ts 的 cleanupPlugin 调用
cleanup() {
  this.requestState.isConnected = false;
  this.requestState.lastError = null;
  this.requestState.requestCount = 0;
}
//🔄 与主流程的完整对接
//方法签名 严格匹配 main.ts 的调用预期：

// 供手动/自动同步调用的统一接口
async syncHighlightsToOrca(updatedAfter = null) {
  const startTime = Date.now();
  const highlights = await this.getHighlights(updatedAfter);
  
  return {
    totalCount: highlights.length,
    newCount: updatedAfter ? highlights.length : 0,
    duration: Date.now() - startTime,
    categories: [...new Set(highlights.map(h => h.category))]
  };
}
}

export default ReadwiseAPI;