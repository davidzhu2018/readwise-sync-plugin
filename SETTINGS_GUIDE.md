# Readwise Sync Plugin - Settings Guide

## 设置界面说明

插件提供了以下设置选项，可以在 Orca 的插件设置界面中配置：

### 1. API Key（必填）
- **说明**：您的 Readwise 访问令牌
- **获取方式**：访问 https://readwise.io/access_token
- **类型**：字符串
- **示例**：`xxrbWCOJV3aoIiof0QWTdNQUIFVYgwYsgSqjIhxqFQG3ikuhUC`

### 2. Enable Auto Sync（自动同步）
- **说明**：启用后，插件将按设定的时间间隔自动同步高亮
- **类型**：开关（boolean）
- **默认值**：关闭
- **注意事项**：
  - 最小同步间隔为 5 分钟
  - 建议设置为 60 分钟或更长，避免频繁请求

### 3. Auto Sync Interval（自动同步间隔）
- **说明**：自动同步的时间间隔（分钟）
- **类型**：数字
- **默认值**：60 分钟
- **最小值**：5 分钟
- **推荐值**：60 分钟

### 4. Sync Category（同步分类）
- **说明**：选择要同步的内容分类
- **类型**：下拉列表
- **选项**：
  - `all` - 同步所有分类（默认）
  - `books` - 仅同步书籍高亮
  - `articles` - 仅同步文章高亮
  - `tweets` - 仅同步推特内容
  - `podcasts` - 仅同步播客内容
  - `supplementals` - 仅同步补充材料

### 5. Default Sync Mode（默认同步模式）
- **说明**：选择默认的同步方式
- **类型**：下拉列表
- **选项**：
  - `incremental` - 增量同步：仅获取上次同步后的新高亮（默认）
  - `full` - 全量同步：每次都获取所有高亮

### 6. Include Tags（包含标签）
- **说明**：同步时是否包含 Readwise 中的标签
- **类型**：开关（boolean）
- **默认值**：开启

### 7. Last Sync Time（上次同步时间）
- **说明**：显示最后一次成功同步的时间戳
- **类型**：字符串（只读显示）
- **格式**：ISO 8601 格式，例如：`2025-01-19T10:30:45.123Z`
- **用途**：
  - 用于增量同步时确定起始时间
  - 可以通过工具栏菜单的"Reset Sync Time"重置

## 工具栏菜单功能

点击工具栏的 Readwise 图标会显示下拉菜单，包含以下选项：

### 1. Sync Now (Incremental)
- **功能**：执行增量同步
- **说明**：仅同步上次同步后的新高亮

### 2. Full Sync (All Highlights)
- **功能**：执行全量同步
- **说明**：同步所有高亮，不考虑上次同步时间

### 3. Test Connection
- **功能**：测试 Readwise API 连接
- **说明**：验证 API Key 是否有效

### 4. Reset Sync Time（新增）
- **功能**：重置上次同步时间
- **说明**：
  - 清空 `Last Sync Time` 字段
  - 下次增量同步时会获取所有历史高亮
  - 适用场景：
    - 想要重新同步所有历史数据
    - 上次同步出现问题，需要重新开始
    - 更换了 Readwise 账号

## 使用建议

### 首次使用
1. 在设置中配置 API Key
2. 选择要同步的分类（建议先选择单个分类测试）
3. 点击"Test Connection"验证连接
4. 执行第一次同步（可以选择 Full Sync）

### 日常使用
1. 开启自动同步，设置间隔为 60 分钟
2. 使用增量同步模式
3. 定期检查同步状态

### 故障排除
1. 如果同步出现问题，先"Test Connection"
2. 如果需要重新同步所有数据，使用"Reset Sync Time"
3. 查看控制台日志了解详细错误信息

## 数据结构说明

同步后的数据结构：

```
当前页面
  └─ ## ReadwiseSyncToOrca20250119153045 [标签: Readwise]
       ├─ ### books [标签: Readwise/books]
       │    ├─ 高亮内容 1
       │    ├─ 高亮内容 2
       │    └─ ...
       ├─ ### articles [标签: Readwise/articles]
       │    ├─ 高亮内容 1
       │    └─ ...
       ├─ ### tweets [标签: Readwise/tweets]
       ├─ ### supplementals [标签: Readwise/supplementals]
       └─ ### podcasts [标签: Readwise/podcasts]
```

## 注意事项

1. **API 限制**：Readwise API 有速率限制，建议不要设置过短的自动同步间隔
2. **首次同步**：如果您有大量高亮（超过 1000 条），首次同步可能需要较长时间
3. **数据安全**：API Key 会保存在 Orca 的插件数据中，请妥善保管
4. **同步时间**：`Last Sync Time` 字段在每次成功同步后自动更新
5. **分类过滤**：选择特定分类后，只会同步该分类的内容，其他分类的高亮不会显示
