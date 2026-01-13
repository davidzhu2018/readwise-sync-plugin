import { SyncSettings } from './types.js';
import { syncManager } from './sync/sync-manager.js';

// 简单声明全局或ca 对象以满足 TypeScript（同项目内有 src/orca.d.ts，但保证编译器可识别）
declare const orca: any;

// 插件入口：load / unload
export async function load(pluginName: string) {
  console.log(`${pluginName} plugin enabled`);

  // 初始化插件配置和功能（使用已有的 syncManager）
  await initializePlugin(pluginName);
}

export async function unload() {
  console.log('Readwise Sync plugin disabled');

  // 清理资源，确保无内存泄漏
  await cleanupPlugin();
}
async function loadSettings(): Promise<SyncSettings> {
  const defaultSettings: SyncSettings = {
    apiKey: '',
    autoSyncEnabled: false,
    syncInterval: 60,
    lastSyncDate: '',
    syncAllCategories: true,
    includeTags: true
  };

  try {
    // 从持久化存储加载用户配置
    const savedSettings = await (orca as any).plugins.getData('readwise-sync', 'settings');
    return savedSettings || defaultSettings;
  } catch (error) {
    return defaultSettings;
  }
}

async function saveSettings(settings: SyncSettings): Promise<void> {
  // 安全存储配置数据
  await (orca as any).plugins.setData('readwise-sync', 'settings', settings);
}
function registerCommands(pluginName: string) {
  // 手动同步命令
  (orca as any).commands.registerCommand(
    `${pluginName}.manual-sync`,
    async () => {
      try {
        (orca as any).notify('info', 'Starting Readwise sync...');
  const stats = await syncManager.performSync('manual');
  (orca as any).notify('success', `Sync completed: ${stats.newCount || 0} new highlights`);
      } catch (error: any) {
        (orca as any).notify('error', `Sync failed: ${error?.message || String(error)}`);
      }
    },
    'Sync Readwise Highlights'
  );

  // 连接测试命令
  (orca as any).commands.registerCommand(
    `${pluginName}.test-connection`,
    async () => {
      try {
        // syncManager 内部会维护 readwise API 实例并提供验证逻辑
        await (syncManager as any).validateConnection();
        (orca as any).notify('success', 'Readwise connection successful');
        return true;
      } catch (err) {
        (orca as any).notify('error', 'Readwise connection failed');
        return false;
      }
    },
    'Test Readwise Connection'
  );
}

function registerToolbarButton(pluginName: string) {
  (orca as any).toolbar.registerToolbarButton(`${pluginName}.toolbar-button`, {
    icon: 'ti ti-refresh',
    tooltip: 'Sync Readwise Highlights',
    command: `${pluginName}.manual-sync`
  });
}

// 自动同步职责交给 syncManager，实现中已包含定时器与 listener
function setupAutoSync(settings: SyncSettings) {
  // 将设置同步到 syncManager 并让它管理定时器
  (syncManager as any).settings = { ...(syncManager as any).settings, ...settings };
  if (typeof (syncManager as any).setupAutoSync === 'function') {
    (syncManager as any).setupAutoSync();
  }
}

// 监听设置变化事件
// 主同步管理器在自身实现里已经注册了设置监听器；这里保留轻量的响应以便同步 UI

(orca as any).broadcasts.registerHandler('core.settingsChanged', 
  async (changedPluginName: string, newSettings: any) => {
    if (changedPluginName === 'readwise-sync') {
      setupAutoSync(newSettings);
      if (typeof (syncManager as any).updateSettings === 'function') {
        (syncManager as any).updateSettings(newSettings);
      }
    }
  }
);


async function performSync(): Promise<void> {
  try {
    // 同步逻辑执行
    await syncManager.performSync('manual');
  } catch (error) {
    // 分级错误处理
    const msg = (error && (error as any).message) ? (error as any).message : String(error);
    if (msg.includes('NETWORK_ERROR') || msg.includes('PAGE_FETCH_ERROR')) {
      (orca as any).notify('error', 'Network error: Please check your connection');
    } else if (msg.includes('AUTH_ERROR')) {
      (orca as any).notify('error', 'Authentication failed: Check your API key');
    } else {
      (orca as any).notify('error', `Sync failed: ${msg}`);
    }
    console.error('Sync error details:', error);
  }
}

let syncStatus: 'idle' | 'syncing' | 'error' = 'idle';

async function setSyncStatus(status: typeof syncStatus) {
  syncStatus = status;
  // 更新UI状态指示器（简单实现：更新 orca 的插件 state）
  await updateSyncIndicator(status);
}

async function updateSyncIndicator(status: string) {
  try {
    (orca as any).state.plugins = (orca as any).state.plugins || {};
    (orca as any).state.plugins['readwise-sync'] = (orca as any).state.plugins['readwise-sync'] || {};
    (orca as any).state.plugins['readwise-sync'].syncStatus = status;
  } catch (e) {
    // 不阻塞主流程
  }
}

async function performIncrementalSync() {
  const settings = await (orca as any).plugins.getData('readwise-sync', 'settings');
  const updatedAfter = settings?.lastSyncDate || undefined;

  // 仅同步自上次同步后的新内容（调用 syncManager 的方法）
  if (typeof (syncManager as any).syncHighlightsToOrca === 'function') {
    return await (syncManager as any).syncHighlightsToOrca(updatedAfter);
  }
  return [];
}

const i18n = {
  en: {
    syncSuccess: 'Sync completed successfully',
    syncFailed: 'Sync failed',
    testingConnection: 'Testing connection...'
  },
  zh: {
    syncSuccess: '同步完成',
    syncFailed: '同步失败',
    testingConnection: '测试连接中...'
  }
};

function getLocalizedString(key: string): string {
  const lang = (orca as any).state?.settings?.language || (orca as any).state?.plugins?.language || 'en';
  return ((i18n as any)[lang]?.[key] || (i18n as any).en[key]) as string;
}

// 简单的初始化/清理实现，原仓库没有提供 plugin-lifecycle 模块
async function initializePlugin(pluginName: string) {
  // 读取本地设置并交给 syncManager 管理
  const settings = await loadSettings();
  setupAutoSync(settings);
  registerCommands(pluginName);
  registerToolbarButton(pluginName);
}

async function cleanupPlugin() {
  // 交由 syncManager 做资源清理
  if (typeof (syncManager as any).cleanup === 'function') {
    (syncManager as any).cleanup();
  }
}

