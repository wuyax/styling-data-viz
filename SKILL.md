---
name: styling-data-viz
description: Build, style, or audit ECharts dark-mode dashboards across qunqing (群青), guofeng (国风), or huanzi (幻紫) styles.
---

# 大屏数据可视化 Skill (Styling Data Viz)

## Overview
本 Skill 指导 Agent 构建符合 Edward Tufte 高数据墨水比 (Data-Ink Ratio) 理念的 ECharts 5 / 6+ 暗色高质感大屏图表。架构采用「通用基线」与「类型图表特有规则」解耦设计。

---

## 核心执行步骤 (Execution Steps)

接收到大屏图表构建、重构或审查任务时，必须按顺序执行以下四步：

### Step 1. 匹配视觉风格与 Theme
分析需求关键词，确定视觉风格并加载对应规则：
- **`qunqing` (群青科技暗蓝 - 默认)**：科技驾驶舱、IT/运维/数据中心 ➔ 载入 [`rules/styles/qunqing.md`](rules/styles/qunqing.md)
- **`guofeng` (国风水墨青绿)**：生态环境、智慧文旅、数字故宫、农业 ➔ 载入 [`rules/styles/guofeng.md`](rules/styles/guofeng.md)
- **`huanzi` (幻紫赛博霓虹)**：AI算力、元宇宙、赛博朋克、机器人 ➔ 载入 [`rules/styles/huanzi.md`](rules/styles/huanzi.md)

### Step 2. 应用通用低噪基线 (Universal Baseline)
无缝融入大屏毛玻璃卡片 ➔ 载入通用基线规范 [`rules/universal/baseline-spec.md`](rules/universal/baseline-spec.md)：
- **透明容器**：`backgroundColor: 'transparent'`, `grid.containLabel = true`
- **低噪轴线**：隐藏 Y 轴线，横向网格设为 `rgba(205, 225, 248, 0.05)` 超淡虚线，隐藏纵向网格
- **等宽数值与排版**：关键数值配置 `'D-DIN, DINPro-Medium, monospace'` 与 `font-feature-settings: "tnum"`
- **渐变质感与斜纹**：填充配置 `LinearGradient` 渐变；重点单/双柱推荐 ARIA 斜纹 [`references/ariaStripeDecal.ts`](references/ariaStripeDecal.ts) ➔ 载入 [`rules/universal/stripe-texture-and-gradients.md`](rules/universal/stripe-texture-and-gradients.md)
- **自适应响应式**：绑定 `ResizeObserver` 防抖 resize

### Step 3. 加载具体图表类型特有约束 (Chart Specs)
根据需求匹配图表类型规格文档：
- **柱状图 / 象形柱图** ➔ [`rules/charts/bar-spec.md`](rules/charts/bar-spec.md)：直角切面 `borderRadius: 0`（微过渡上限 $\le 1$）
- **饼图 / 环形图** ➔ [`rules/charts/pie-and-donut-spec.md`](rules/charts/pie-and-donut-spec.md)：物理开裂 `padAngle: 5~8`，极微倒角 `borderRadius: 1~3`，`centerX` 与 `title` 绝对联动
- **折线 / 面积图** ➔ [`rules/charts/line-and-area-spec.md`](rules/charts/line-and-area-spec.md)：`smooth: 0.35`，默认隐藏节点 `showSymbol: false`，面积渐变云雾
- **折柱混合双轴图** ➔ [`rules/charts/combo-dual-axis-spec.md`](rules/charts/combo-dual-axis-spec.md)：单侧网格独占（右 Y 轴 `splitLine: { show: false }`）
- **仪表盘 / 玉珏图 / 水球图** ➔ [`rules/charts/gauge-spec.md`](rules/charts/gauge-spec.md)：无针化进度环 `pointer: { show: false }`，刻度开启时 `radius ≤ 70%`，支持极坐标玉珏图与水球图
- **地图 / 迁徙飞线图** ➔ [`rules/charts/map-and-flyline-spec.md`](rules/charts/map-and-flyline-spec.md)：深色发光陆块 `areaColor`，低频穿梭飞线 `period: 4~6s` 与呼吸散点
- **桑基图 / 树图** ➔ [`rules/charts/sankey-and-tree-spec.md`](rules/charts/sankey-and-tree-spec.md)：按 `(字数×12px)+20px` 显式设置固定像素 `right`（约 `75px`）或反转末端标签对齐
- **旭日图 / 树图** ➔ [`rules/charts/sunburst-and-treemap-spec.md`](rules/charts/sunburst-and-treemap-spec.md)：外侧 Label 模式外径上限 `radius ≤ 55%`，小角度自动隐藏标签

### Step 4. 自检与 Completion Criteria
输出 ECharts 配置选项 (option) 之前，必须对以下 7 项标准逐一核对：
1. [ ] `backgroundColor` 是否已显式设为 `'transparent'`？
2. [ ] 是否已配置 `LinearGradient` 渐变填充？
3. [ ] 柱状图 `borderRadius` 是否设为 `0`（微过渡上限 $\le 1$）？
4. [ ] 饼环图包含右侧图例时，`title.left` 与 `graphic` 位置是否与 `center[0]`（如 `'32%'`）绝对联动？
5. [ ] 折柱双轴图的右 Y 轴 `splitLine.show` 是否已显式设为 `false`？
6. [ ] 非直角坐标系（桑基/饼/旭日图）是否已配置空间预算（外径 $\le 55\%$ 或末端固定像素/对齐留白），防止 Label 裁切？
7. [ ] 是否已按 [`rules/universal/baseline-spec.md`](rules/universal/baseline-spec.md) 自检对照表完成正向自检？

---

## 目录索引 (Directory Index)

- **通用规范**：[`baseline-spec.md`](rules/universal/baseline-spec.md) | [`stripe-texture-and-gradients.md`](rules/universal/stripe-texture-and-gradients.md) | [`animation-and-rhythm.md`](rules/universal/animation-and-rhythm.md)
- **图表特有规范**：[`bar-spec.md`](rules/charts/bar-spec.md) | [`pie-and-donut-spec.md`](rules/charts/pie-and-donut-spec.md) | [`line-and-area-spec.md`](rules/charts/line-and-area-spec.md) | [`combo-dual-axis-spec.md`](rules/charts/combo-dual-axis-spec.md) | [`gauge-spec.md`](rules/charts/gauge-spec.md) | [`map-and-flyline-spec.md`](rules/charts/map-and-flyline-spec.md) | [`sankey-and-tree-spec.md`](rules/charts/sankey-and-tree-spec.md) | [`sunburst-and-treemap-spec.md`](rules/charts/sunburst-and-treemap-spec.md)
- **风格矩阵**：[`rules/styles/index.md`](rules/styles/index.md) (`qunqing.md` / `guofeng.md` / `huanzi.md`)
- **参考代码与工具**：[`references/ariaStripeDecal.ts`](references/ariaStripeDecal.ts) | [`examples/`](examples/)


