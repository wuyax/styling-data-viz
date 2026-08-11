# 大屏图表踩坑清单与反模式自检 (Universal Anti-Patterns & Positive Fixes)

编写或审查大屏 ECharts 配置时，务必对照下表自动自检并修正在视觉与几何设计上的常见偏差：

---

## 通用反模式与正向规范对照

| 检查维度 | 常见偏差 / 反模式 | 正向 leading 规范与标准写法 (Fix) |
|---|---|---|
| **容器融合度** | 声明硬底背景（如 `backgroundColor: '#000000'`），产生突兀黑块 | **透明融入容器**：统一设置 `backgroundColor: 'transparent'`，融入玻璃卡片 |
| **轴线与网格** | 显式开启 Y 轴线或四周边框全显 | **低噪降噪轴线**：隐藏 Y 轴线，横向网格设为 `rgba(205, 225, 248, 0.05)` 超淡虚线，隐藏纵轴线 |
| **图例占用** | 默认巨大 Legend 居中遮挡图表主体 | **精细图例布局**：移至 `top: '2%', right: '4%'`，图标设为 `10px`，字号 `12px` |
| **柱体切面几何** | 柱图使用 `borderRadius: [4, 4, 0, 0]` 或大圆角胶囊顶 | **直角切面法则**：默认保持 `borderRadius: 0`，若极端微弱软化，上限为 `borderRadius ≤ 1` |
| **扇区与倒角** | 环形图扇区无间隔或 `borderRadius ≥ 4` 膨胀为药丸头 | **物理开裂与极微倒角**：显式配置 `padAngle: 5 ~ 8` 物理开裂与极微倒角 `borderRadius: 1 ~ 3` |
| **双 Y 轴网格** | 左右 Y 轴均开启 `splitLine` 导致网格错位交织 | **单侧网格独占**：只保留左 Y 轴 `splitLine`，右 Y 轴强制设为 `splitLine: { show: false }` |
| **色彩质感** | 使用单色平涂大面积柱体/面积 | **渐变衰减质感**：强制配置 `LinearGradient` 顶部高亮与底部衰减 |
| **响应式自适应** | 缺少 `containLabel: true` 导致大屏缩放时轴标签切断 | **自适应容器约束**：强制设置 `grid.containLabel = true` |
