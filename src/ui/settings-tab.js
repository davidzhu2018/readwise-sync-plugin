import React from 'react';
import { useSnapshot } from 'valtio';

// 配置状态管理
const syncState = proxy({
  isSyncing: false,
  lastSyncDate: null,
  syncStats: {},
  error: null
});

export function SettingsTab() {
  const pluginName = 'readwise-sync';
  const settings = orca.state.plugins[pluginName]?.settings || {};
  const stateSnapshot = useSnapshot(syncState);
  
  return (
    <div className="readwise-settings">
      <h2>Readwise 同步设置</h2>
      
      {/* API 密钥配置 */}
      <div className="setting-section">
        <h3>API 配置</h3>
        <ApiKeySetting 
          value={settings.apiKey} 
          onValidate={handleApiKeyValidation}
        />
      </div>
      
      {/* 同步选项 */}
      <div className="setting-section">
        <h3>同步选项</h3>
        <SyncOptions 
          settings={settings}
          onSettingsChange={handleSettingsChange}
        />
      </div>
      
      {/* 自动同步配置 */}
      <div className="setting-section">
        <h3>自动同步</h3>
        <AutoSyncSettings 
          settings={settings}
          onSettingsChange={handleSettingsChange}
        />
      </div>
      
      {/* 状态显示 */}
      <SyncStatusDisplay state={stateSnapshot} />
    </div>
  );
}
//API 密钥配置组件
function ApiKeySetting({ value, onValidate }) {
  const [isValidating, setIsValidating] = React.useState(false);
  const [validationResult, setValidationResult] = React.useState(null);
  
  const handleApiKeyChange = async (newApiKey) => {
    // 保存设置
    await orca.plugins.setSettings('app', 'readwise-sync', {
      ...orca.state.plugins['readwise-sync']?.settings,
      apiKey: newApiKey
    });
    
    // 触发验证
    if (newApiKey.trim()) {
      setIsValidating(true);
      const isValid = await onValidate(newApiKey);
      setValidationResult(isValid ? 'valid' : 'invalid');
      setIsValidating(false);
    }
  };
  
  return (
    <div className="api-key-setting">
      <label htmlFor="api-key">Readwise API Key:</label>
      <input
        id="api-key"
        type="password"
        value={value || ''}
        onChange={(e) => handleApiKeyChange(e.target.value)}
        placeholder="输入您的 Readwise API 密钥"
      />
      
      {isValidating && <span className="validating">验证中...</span>}
      {validationResult === 'valid' && (
        <span className="valid">✅ API 密钥有效</span>
      )}
      {validationResult === 'invalid' && (
        <span className="invalid">❌ API 密钥无效</span>
      )}
    </div>
  );
}
//同步选项配置组件
function SyncOptions({ settings, onSettingsChange }) {
  const handleToggleChange = async (key, value) => {
    const newSettings = {
      ...settings,
      [key]: value
    };
    
    await orca.plugins.setSettings('app', 'readwise-sync', newSettings);
    onSettingsChange(newSettings);
  };
  
  return (
    <div className="sync-options">
      <div className="option-row">
        <label>
          <input
            type="checkbox"
            checked={settings.syncAllCategories ?? true}
            onChange={(e) => handleToggleChange('syncAllCategories', e.target.checked)}
          />
          同步所有分类内容
        </label>
        <span className="option-help">同步 Readwise 中的所有高亮分类</span>
      </div>
      
      <div className="option-row">
        <label>
          <input
            type="checkbox"
            checked={settings.includeTags ?? true}
            onChange={(e) => handleToggleChange('includeTags', e.target.checked)}
          />
          包含标签信息
        </label>
        <span className="option-help">将 Readwise 标签写入 Orca 块属性</span>
      </div>
    </div>
  );
}
//自动同步配置组件
function AutoSyncSettings({ settings, onSettingsChange }) {
  const [intervalError, setIntervalError] = React.useState('');
  
  const handleIntervalChange = async (newInterval) => {
    const interval = parseInt(newInterval);
    
    // 验证最小间隔
    if (interval < 5) {
      setIntervalError('自动同步间隔不能小于 5 分钟');
      return;
    }
    
    setIntervalError('');
    
    const newSettings = {
      ...settings,
      syncInterval: interval
    };
    
    await orca.plugins.setSettings('app', 'readwise-sync', newSettings);
    onSettingsChange(newSettings);
  };
  
  const handleAutoSyncToggle = async (enabled) => {
    const newSettings = {
      ...settings,
      autoSyncEnabled: enabled
    };
    
    await orca.plugins.setSettings('app', 'readwise-sync', newSettings);
    onSettingsChange(newSettings);
    
    if (enabled) {
      orca.notify('info', `已启用自动同步，间隔: ${settings.syncInterval || 60}分钟`);
    } else {
      orca.notify('info', '已禁用自动同步');
    }
  };
  
  return (
    <div className="auto-sync-settings">
      <div className="option-row">
        <label>
          <input
            type="checkbox"
            checked={settings.autoSyncEnabled ?? false}
            onChange={(e) => handleAutoSyncToggle(e.target.checked)}
          />
          启用自动同步
        </label>
      </div>
      
      {settings.autoSyncEnabled && (
        <div className="interval-setting">
          <label htmlFor="sync-interval">同步间隔 (分钟):</label>
          <input
            id="sync-interval"
            type="number"
            min="5"
            step="5"
            value={settings.syncInterval || 60}
            onChange={(e) => handleIntervalChange(e.target.value)}
          />
          {intervalError && <span className="error">{intervalError}</span>}
          <span className="help-text">最小间隔: 5分钟</span>
        </div>
      )}
    </div>
  );
}
//同步状态显示组件
function SyncStatusDisplay({ state }) {
  const formatDate = (dateString) => {
    if (!dateString) return '从未同步';
    return new Date(dateString).toLocaleString('zh-CN');
  };
  
  const formatDuration = (ms) => {
    if (!ms) return '';
    const seconds = Math.floor(ms / 1000);
    return `${seconds}秒`;
  };
  
  return (
    <div className="sync-status">
      <h3>同步状态</h3>
      
      <div className="status-grid">
        <div className="status-item">
          <span className="label">同步状态:</span>
          <span className={`value ${state.isSyncing ? 'syncing' : 'idle'}`}>
            {state.isSyncing ? '🔄 同步中...' : '✅ 空闲'}
          </span>
        </div>
        
        <div className="status-item">
          <span className="label">上次同步:</span>
          <span className="value">{formatDate(state.lastSyncDate)}</span>
        </div>
        
        {state.syncStats && Object.keys(state.syncStats).length > 0 && (
          <>
            <div className="status-item">
              <span className="label">新增高亮:</span>
              <span className="value">{state.syncStats.newHighlights || 0}</span>
            </div>
            
            <div className="status-item">
              <span className="label">同步分类:</span>
              <span className="value">{state.syncStats.categories?.join(', ') || '无'}</span>
            </div>
            
            <div className="status-item">
              <span className="label">耗时:</span>
              <span className="value">{formatDuration(state.syncStats.duration)}</span>
            </div>
          </>
        )}
      </div>
      
      {state.error && (
        <div className="error-message">
          <strong>错误:</strong> {state.error}
        </div>
      )}
    </div>
  );
}
//设置变更事件处理
// 监听设置变化事件
orca.broadcasts.registerHandler('core.settingsChanged', async (pluginName, newSettings) => {
  if (pluginName === 'readwise-sync') {
    // 更新自动同步定时器
    if (newSettings.autoSyncEnabled !== undefined || newSettings.syncInterval !== undefined) {
      await setupAutoSync(newSettings);
    }
    
    // 更新 API 实例配置
    if (newSettings.apiKey !== undefined) {
      readwiseAPI.updateSettings(newSettings);
    }
    
    // 通知用户设置已保存
    orca.notify('success', 'Readwise 同步设置已更新');
  }
});

// API 密钥验证函数
async function handleApiKeyValidation(apiKey) {
  try {
    const isValid = await readwiseAPI.testConnection(apiKey);
    if (isValid) {
      orca.notify('success', 'API 密钥验证成功');
    } else {
      orca.notify('error', 'API 密钥验证失败');
    }
    return isValid;
  } catch (error) {
    orca.notify('error', `验证失败: ${error.message}`);
    return false;
  }
}
//手动同步触发组件
function SyncActions({ onSyncNow, isSyncing }) {
  const handleSyncNow = async () => {
    try {
      await onSyncNow();
      orca.notify('success', '同步完成');
    } catch (error) {
      orca.notify('error', `同步失败: ${error.message}`);
    }
  };
  
  return (
    <div className="sync-actions">
      <button 
        className="sync-button"
        onClick={handleSyncNow}
        disabled={isSyncing}
      >
        {isSyncing ? '🔄 同步中...' : '🔄 立即同步'}
      </button>
      
      <button 
        className="test-button"
        onClick={() => orca.commands.invokeCommand('readwise-sync.testConnection')}
      >
        🔍 测试连接
      </button>
    </div>
  );
}
//完整的设置界面集成
// 主设置界面组件
export function ReadwiseSettingsTab() {
  const pluginName = 'readwise-sync';
  const settings = orca.state.plugins[pluginName]?.settings || {};
  const stateSnapshot = useSnapshot(syncState);
  
  const handleSettingsChange = (newSettings) => {
    // 触发设置变更广播
    orca.broadcasts.broadcast('core.settingsChanged', pluginName, newSettings);
  };
  
  const handleSyncNow = async () => {
    syncState.isSyncing = true;
    try {
      const result = await orca.commands.invokeCommand('readwise-sync.syncNow');
      syncState.lastSyncDate = new Date().toISOString();
      syncState.syncStats = result;
      syncState.error = null;
    } catch (error) {
      syncState.error = error.message;
    } finally {
      syncState.isSyncing = false;
    }
  };
  
  return (
    <div className="readwise-settings-tab">
      <SettingsTab />
      <SyncActions 
        onSyncNow={handleSyncNow}
        isSyncing={stateSnapshot.isSyncing}
      />
    </div>
  );
}

// 注册设置标签页
export async function registerSettingsTab() {
  orca.plugins.registerSettingsTab('readwise-sync', {
    title: 'Readwise 同步',
    component: ReadwiseSettingsTab
  });
}