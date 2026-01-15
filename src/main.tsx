import { SyncSettings } from './types.js';
import { syncManager, syncState } from './sync/sync-manager.js';
import { subscribe, snapshot } from 'valtio/vanilla';
import LogoImg from '../icon.png';
import './styles/main.css';

// 简单声明全局 orca 对象以满足 TypeScript（同项目内有 src/orca.d.ts，但保证编译器可识别）
declare const orca: any;

let pluginName: string;

// 插件入口：load / unload
export async function load(_name: string) {
  pluginName = _name;
  console.log(`${pluginName} plugin enabled`);

  // 注入 CSS 样式
  orca.themes.injectCSSResource(`${pluginName}/dist/index.css`, pluginName);

  // 注册设置界面
  await orca.plugins.setSettingsSchema(pluginName, {
    apiKey: {
      label: 'API Key',
      description: 'Your Readwise access token. Get it from https://readwise.io/access_token',
      type: 'string',
    },
    defaultSyncMode: {
      label: 'Default Sync Mode',
      description: 'Incremental sync only fetches new highlights since last sync. Full sync fetches all highlights.',
      type: 'string',
      defaultValue: 'incremental',
    },
    autoSyncEnabled: {
      label: 'Auto Sync',
      description: 'Automatically sync highlights at regular intervals',
      type: 'boolean',
      defaultValue: false,
    },
    syncInterval: {
      label: 'Sync Interval (minutes)',
      description: 'Minimum interval is 5 minutes',
      type: 'number',
      defaultValue: 60,
    },
    syncCategory: {
      label: 'Sync Category',
      description: 'Choose which category of highlights to sync',
      type: 'string',
      defaultValue: 'all',
      enum: ['all', 'books', 'articles', 'tweets', 'supplementals', 'podcasts'],
    },
    includeTags: {
      label: 'Include Tags',
      description: 'Include tags when importing highlights',
      type: 'boolean',
      defaultValue: true,
    },
  });

  // 初始化插件配置和功能
  await initializePlugin(pluginName);
}

export async function unload() {
  console.log('Readwise Sync plugin disabled');

  // 清理资源，确保无内存泄漏
  await cleanupPlugin();

  // 移除 CSS 样式
  try {
    orca.themes.removeCSSResources(pluginName);
  } catch (e) {
    // 忽略错误
  }

  // 注销 headbar 按钮
  try {
    orca.headbar?.unregisterHeadbarButton?.(`${pluginName}.sync`);
  } catch (e) {
    // 忽略错误
  }

  // 注销命令
  try {
    orca.commands.unregisterCommand(`${pluginName}.sync`);
  } catch (e) {
    // 忽略错误
  }

  try {
    orca.commands.unregisterCommand(`${pluginName}.testConnection`);
  } catch (e) {
    // 忽略错误
  }
}

async function loadSettings(): Promise<SyncSettings> {
  const defaultSettings: SyncSettings = {
    apiKey: '',
    defaultSyncMode: 'incremental',
    autoSyncEnabled: false,
    syncInterval: 60,
    lastSyncDate: '',
    syncCategory: 'all',
    includeTags: true
  };

  try {
    // 从持久化存储加载用户配置
    const savedSettings = await orca.plugins.getData('readwise-sync', 'settings');
    return savedSettings || defaultSettings;
  } catch (error) {
    return defaultSettings;
  }
}


function registerCommands(_pluginName: string) {
  // 增量同步命令（默认）
  if (orca.state.commands?.[`${_pluginName}.sync`] == null) {
    orca.commands.registerCommand(
      `${_pluginName}.sync`,
      async () => {
        try {
          // 从 orca.state.plugins 读取最新设置
          const currentSettings = orca.state.plugins[_pluginName]?.settings || await loadSettings();
          syncManager.settings = { ...syncManager.settings, ...currentSettings };

          // 检查 API Key
          if (!syncManager.settings.apiKey) {
            orca.notify('error', 'Please configure your Readwise API Key in settings');
            return;
          }

          orca.notify('info', 'Starting incremental sync...');
          const stats = await syncManager.performSync('incremental');
          orca.notify('success', `Sync completed: ${stats.newCount || 0} new highlights`);
        } catch (error: any) {
          orca.notify('error', `Sync failed: ${error?.message || String(error)}`);
        }
      },
      'Sync Readwise Highlights (Incremental)'
    );
  }

  // 全量同步命令
  if (orca.state.commands?.[`${_pluginName}.fullSync`] == null) {
    orca.commands.registerCommand(
      `${_pluginName}.fullSync`,
      async () => {
        try {
          // 从 orca.state.plugins 读取最新设置
          const currentSettings = orca.state.plugins[_pluginName]?.settings || await loadSettings();
          syncManager.settings = { ...syncManager.settings, ...currentSettings };

          // 检查 API Key
          if (!syncManager.settings.apiKey) {
            orca.notify('error', 'Please configure your Readwise API Key in settings');
            return;
          }

          orca.notify('info', 'Starting full sync...');
          const stats = await syncManager.performSync('full');
          orca.notify('success', `Full sync completed: ${stats.newCount || 0} highlights`);
        } catch (error: any) {
          orca.notify('error', `Sync failed: ${error?.message || String(error)}`);
        }
      },
      'Full Sync Readwise Highlights'
    );
  }

  // 连接测试命令
  if (orca.state.commands?.[`${_pluginName}.testConnection`] == null) {
    orca.commands.registerCommand(
      `${_pluginName}.testConnection`,
      async () => {
        try {
          // 从 orca.state.plugins 读取最新设置
          const currentSettings = orca.state.plugins[_pluginName]?.settings || await loadSettings();
          syncManager.settings = { ...syncManager.settings, ...currentSettings };

          // 检查 API Key
          if (!syncManager.settings.apiKey) {
            orca.notify('error', 'Please configure your Readwise API Key in settings');
            return false;
          }

          await syncManager.validateConnection();
          orca.notify('success', 'Readwise connection successful');
          return true;
        } catch (err: any) {
          orca.notify('error', `Readwise connection failed: ${err?.message || 'Unknown error'}`);
          return false;
        }
      },
      'Test Readwise Connection'
    );
  }
}

function registerToolbarButton(_pluginName: string) {
  // 参考 orca-dinox-sync，使用 JSX 语法注册 headbar 按钮
  if (orca.state.headbarButtons?.[`${_pluginName}.sync`] == null) {
    try {
      // 使用 orca.components 获取组件
      const Button = orca.components.Button;
      const HoverContextMenu = orca.components.HoverContextMenu;
      const MenuText = orca.components.MenuText;

      if (!Button || !HoverContextMenu || !MenuText) {
        console.error('[Readwise Sync] Required components not available');
        return;
      }

      // 用于触发重新渲染的函数
      let rerender: (() => void) | null = null;

      // 渲染按钮的函数
      const renderButton = () => {
        const currentState = snapshot(syncState);
        const isSyncing = currentState.isSyncing;
        const progress = currentState.progress;

        // 生成进度文本
        let progressText = '';
        if (isSyncing && progress.total > 0) {
          progressText = `${progress.current}/${progress.total} 同步中`;
        } else if (isSyncing) {
          progressText = '同步中...';
        }

        return (
          <HoverContextMenu
            menu={(closeMenu: () => void) => (
              <>
                <MenuText
                  title={isSyncing ? "正在同步中..." : "Sync Now (Incremental)"}
                  onClick={async () => {
                    if (!isSyncing) {
                      closeMenu();
                      await orca.commands.invokeCommand(`${_pluginName}.sync`);
                    }
                  }}
                  disabled={isSyncing}
                />
                <MenuText
                  title="Full Sync (All Highlights)"
                  onClick={async () => {
                    if (!isSyncing) {
                      closeMenu();
                      await orca.commands.invokeCommand(`${_pluginName}.fullSync`);
                    }
                  }}
                  disabled={isSyncing}
                />
                <MenuText
                  title="Test Connection"
                  onClick={async () => {
                    if (!isSyncing) {
                      closeMenu();
                      await orca.commands.invokeCommand(`${_pluginName}.testConnection`);
                    }
                  }}
                  disabled={isSyncing}
                />
              </>
            )}
          >
            <Button
              variant="plain"
              onClick={() => {
                if (!isSyncing) {
                  orca.commands.invokeCommand(`${_pluginName}.sync`);
                }
              }}
              disabled={isSyncing}
              style={{ opacity: isSyncing ? 0.5 : 1 }}
            >
              <img className="readwise-sync-button" src={LogoImg} alt="Readwise Sync" />
              {progressText && <span style={{ marginLeft: '8px', fontSize: '12px' }}>{progressText}</span>}
            </Button>
          </HoverContextMenu>
        );
      };

      // 注册 headbar 按钮，使用 JSX
      orca.headbar.registerHeadbarButton(
        `${_pluginName}.sync`,
        () => renderButton()
      );

      // 订阅状态变化，触发重新渲染
      const unsubscribe = subscribe(syncState, () => {
        // 强制 Orca 重新渲染按钮
        orca.headbar.unregisterHeadbarButton(`${_pluginName}.sync`);
        orca.headbar.registerHeadbarButton(
          `${_pluginName}.sync`,
          () => renderButton()
        );
      });

      // 保存取消订阅函数，用于清理
      (window as any).__readwiseSyncUnsubscribe = unsubscribe;

      console.log('[Readwise Sync] Headbar button registered successfully');
    } catch (error) {
      console.error('[Readwise Sync] Failed to register headbar button:', error);
    }
  } else {
    console.log('[Readwise Sync] Headbar button already registered');
  }
}

// 自动同步职责交给 syncManager
function setupAutoSync(settings: SyncSettings) {
  // 将设置同步到 syncManager 并让它管理定时器
  syncManager.settings = { ...syncManager.settings, ...settings };
  if (typeof syncManager.setupAutoSync === 'function') {
    syncManager.setupAutoSync();
  }
}

// 简单的初始化/清理实现
async function initializePlugin(_pluginName: string) {
  // 读取本地设置并交给 syncManager 管理
  const settings = await loadSettings();
  setupAutoSync(settings);

  // 先注册命令
  registerCommands(_pluginName);

  // 等待一小段时间确保命令注册完成
  await new Promise(resolve => setTimeout(resolve, 100));

  // 再注册按钮
  registerToolbarButton(_pluginName);
}

async function cleanupPlugin() {
  // 交由 syncManager 做资源清理
  if (typeof syncManager.cleanup === 'function') {
    syncManager.cleanup();
  }
}
