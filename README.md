# Readwise Sync Plugin for Orca Note

[![Version](https://img.shields.io/badge/version-1.2.0-blue.svg)](https://github.com/yourusername/readwise-sync)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

一个高性能的 Readwise 同步插件，用于将 Readwise 高亮内容同步到 Orca Note。

## ✨ 核心功能

### 📥 智能同步
- **增量同步**：只同步上次同步后的新高亮
- **全量同步**：同步所有历史高亮
- **分类同步**：支持按类别选择性同步（books, articles, tweets, podcasts, supplementals）
- **自动同步**：可配置定时自动同步（最小间隔 5 分钟）

### 🚀 高性能优化
- **自适应并发**：根据数据量自动调整并发数（30-100）
- **超快速度**：2400+ 条高亮仅需 30-60 秒
- **6-10 倍提速**：相比初始版本显著提升

### 📊 三级数据结构
```
当前页面
  └─ ## ReadwiseSyncToOrca20250119153045 [标签: Readwise]
       ├─ ### books [标签: Readwise/books]
       │    ├─ 高亮内容 1
       │    ├─ 高亮内容 2
       │    └─ ...
       ├─ ### articles [标签: Readwise/articles]
       ├─ ### tweets [标签: Readwise/tweets]
       ├─ ### supplementals [标签: Readwise/supplementals]
       └─ ### podcasts [标签: Readwise/podcasts]
```

### 🎯 便捷功能
- **实时进度**：工具栏显示同步进度
- **连接测试**：一键测试 API 连接
- **重置同步时间**：清空同步历史，重新同步所有数据
- **详细统计**：显示同步条数和耗时

## 📦 安装

### 前置要求
- Orca Note (最新版本)
- Readwise 账号和 API Key

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/yourusername/readwise-sync-plugin.git
   cd readwise-sync-plugin
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **编译插件**
   ```bash
   npm run build
   ```

4. **加载到 Orca**
   - 打开 Orca Note
   - 进入插件管理器
   - 选择 `dist` 目录加载插件

## ⚙️ 配置

### 1. 获取 API Key
访问 [Readwise Access Token](https://readwise.io/access_token) 获取您的 API Key。

### 2. 配置插件设置

在 Orca 插件设置界面配置以下选项：

| 设置项 | 说明 | 默认值 |
|--------|------|--------|
| **API Key** | Readwise API 访问令牌 | 必填 |
| **Enable Auto Sync** | 启用自动同步 | 关闭 |
| **Auto Sync Interval** | 自动同步间隔（分钟） | 60 |
| **Sync Category** | 同步分类选择 | all |
| **Default Sync Mode** | 默认同步模式 | incremental |
| **Include Tags** | 包含标签 | 开启 |
| **Last Sync Time** | 上次同步时间（只读） | - |

详细设置说明请参考 [SETTINGS_GUIDE.md](./SETTINGS_GUIDE.md)

## 🎮 使用方法

### 工具栏操作

点击工具栏的 Readwise 图标，可以看到以下选项：

1. **Sync Now (Incremental)** - 增量同步
   - 只同步上次同步后的新高亮
   - 推荐日常使用

2. **Full Sync (All Highlights)** - 全量同步
   - 同步所有历史高亮
   - 适合首次同步或重新同步

3. **Test Connection** - 测试连接
   - 验证 API Key 是否有效
   - 检查网络连接

4. **Reset Sync Time** - 重置同步时间
   - 清空上次同步时间
   - 下次增量同步会获取所有高亮

### 快捷使用

**首次使用**：
```
1. 配置 API Key
2. 点击 "Test Connection" 验证
3. 点击 "Full Sync" 进行首次同步
4. 等待同步完成（进度条显示在工具栏）
```

**日常使用**：
```
1. 点击 Readwise 图标
2. 选择 "Sync Now" 进行增量同步
3. 查看同步结果通知
```

**自动同步**：
```
1. 在设置中启用 "Enable Auto Sync"
2. 设置同步间隔（推荐 60 分钟）
3. 插件会自动在后台同步
```

## 📊 性能数据

### 同步速度

| 高亮数量 | 并发数 | 预计时间 | 实际测试 |
|----------|--------|----------|----------|
| < 200 | 30 | < 10s | ~5s |
| 200-500 | 50 | 10-20s | ~15s |
| 500-1000 | 80 | 20-30s | ~25s |
| 1000-2500 | 100 | 30-60s | ~45s |
| > 2500 | 100 | 60-120s | ~90s |

### 性能优化历史

- **v1.0.0**: 2400 条高亮需要 5-8 分钟
- **v1.1.0**: 优化到 1-2 分钟（3-5 倍提速）
- **v1.2.0**: 最终优化到 30-60 秒（6-10 倍提速）

## 🔧 开发

### 项目结构
```
readwise-sync-plugin/
├── src/
│   ├── main.tsx              # 插件入口
│   ├── types.ts              # TypeScript 类型定义
│   ├── orca.d.ts             # Orca API 类型定义
│   ├── sync/
│   │   ├── sync-manager.js   # 同步管理器
│   │   └── readwise-api.js   # Readwise API 封装
│   └── styles/
│       └── main.css          # 样式文件
├── dist/                      # 编译输出目录
├── icon.png                  # 插件图标
├── package.json
├── tsconfig.json
├── vite.config.js
└── README.md
```

### 开发命令

```bash
# 安装依赖
npm install

# 开发模式（监听文件变化）
npm run dev

# 编译生产版本
npm run build

# 类型检查
npm run type-check
```

### 技术栈

- **框架**: React + TypeScript
- **构建工具**: Vite
- **状态管理**: Valtio
- **API 集成**: Readwise Export API
- **目标平台**: Orca Note Plugin System

## 📚 文档

- [SETTINGS_GUIDE.md](./SETTINGS_GUIDE.md) - 详细的设置使用指南
- [OPTIMIZATION_SUMMARY.md](./OPTIMIZATION_SUMMARY.md) - 优化总结
- [FINAL_OPTIMIZATION.md](./FINAL_OPTIMIZATION.md) - 最终优化报告

## ❓ 常见问题

### Q: 第一次 Test Connection 失败怎么办？
A: 这是已知问题已修复。确保使用 v1.2.0 以上版本。如仍有问题，请重启 Orca 并重新加载插件。

### Q: 同步很慢怎么办？
A:
1. 确保使用最新版本（v1.2.0）
2. 检查网络连接
3. 查看控制台确认使用的并发数
4. 对于大量数据（> 2000 条），30-60 秒是正常的

### Q: 同步内容会放在哪里？
A: 同步内容会添加到当前打开的页面。建议先打开目标页面再执行同步。

### Q: 如何重新同步所有数据？
A:
1. 点击工具栏菜单
2. 选择 "Reset Sync Time"
3. 再执行 "Sync Now" 即可

### Q: 可以选择性同步某个分类吗？
A: 可以。在设置中的 "Sync Category" 下拉列表选择具体分类（books, articles, tweets, podcasts, supplementals）。

### Q: 自动同步的最小间隔是多少？
A: 5 分钟。推荐设置为 60 分钟，避免频繁请求。

## 🐛 故障排除

### 同步卡住
1. 检查控制台日志
2. 确认网络连接正常
3. 尝试减少同步数据量（选择特定分类）
4. 重启 Orca 重试

### 块未显示
1. 刷新 Orca 页面
2. 检查控制台是否有错误
3. 确认块的 parent 和 left 属性是否正确

### API 连接失败
1. 检查 API Key 是否正确
2. 确认网络可以访问 readwise.io
3. 查看控制台的详细错误信息

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发流程
1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Orca Note](https://orca.so) - 强大的笔记应用
- [Readwise](https://readwise.io) - 优秀的阅读高亮管理服务
- [orca-dinox-sync](https://github.com/sethyuan/orca-dinox-sync) - 参考项目

## 📞 联系方式

- 问题反馈: [GitHub Issues](https://github.com/yourusername/readwise-sync-plugin/issues)
- 邮箱: your.email@example.com

---

**享受高效的知识同步体验！** 🚀
