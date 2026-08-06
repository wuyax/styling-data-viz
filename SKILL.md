---
name: screen-data-viz
description: >-
  Use when creating, styling, reviewing, or optimizing ECharts (v5 & v6+) data visualization
  charts for dark-mode screens, tech dashboards, or large-screen data visualization systems (数据可视化大屏).
  Applies to Vue, React, HTML/JS ECharts implementations requiring high-texture dark theme aesthetics,
  high Data-Ink ratio, gradient fills, and responsive container resizing.
author: 小狼阿亮, wuyax
allowed-tools: Read, Glob, Grep
---

# 大屏数据可视化 Skill (Screen Data Visualization)

> **作者**: 小狼阿亮、wuyax

基于 **「群青」官方设计规范** 与 **Edward Tufte 高数据墨水比 (Data-Ink Ratio)** 理念打造。用于指导 Agent 生成具备**顶级视觉质感**、**高对比度冷感沉浸**、**响应式自适应**的大屏 ECharts 5 / 6+ 图表。

---

## 什么时候使用 When to Use

- 正在为数据可视化大屏 (Screen Data Viz)、科技驾驶舱 (Cockpit) 或暗色 Dashboards 开发/修改 ECharts (v5 / v6+) 图表。
- 默认 ECharts 样式太轻量或过于普通，缺少科技感、质感与暗色沉浸感。
- 图表在大屏缩放/高分屏切换时发生拉伸变形或字号错位。
- 需要复用标准「群青」设计语言（调色盘、D-DIN 字阶、斜纹质感柱、切口环形图等）。

---

## 核心设计规范 「群青」标准 (Ultranavy Specs)

大屏开发必须严格贯彻以下 6 项顶级质感法则：

### 1. 钛空暗蓝底色与透明融入
- 图表容器背景设为 `backgroundColor: 'transparent'`，无缝嵌入大屏玻璃卡片（Card/DOM）。
- 主题 JSON 及预览参照 `references/qunqing-theme.json`（以钛空暗蓝 `#050e17` 为深沉底座，完美兼容 ECharts 5 / 6）。

### 2. 科技发光渐变与呼吸感 (Gradient Layering)
- **面积/折线图**：填充严禁使用实色块，必须使用 `echarts.graphic.LinearGradient` 从上至下渐变（透明度从 20% 衰减至 0%），突出轻盈光晕与多层穿透感。
- **柱状图**：柱体顶部高亮，底部暗沉，搭配 `showBackground: true`（`rgba(205, 225, 248, 0.03)`）暗色底槽与 `borderRadius: [4, 4, 0, 0]` 圆角。

### 3. 超淡网格与低噪坐标轴 (Low-Noise Grid)
- **Top / Right 边框**：隐藏顶部与右侧轴线及刻度（`show: false`）。
- **Y 轴 / 网格线**：隐藏 Y 轴线，横向网格线透明度压低至 `3% ~ 5%`（`rgba(205, 225, 248, 0.05)`），禁用纵向网格。

### 4. 「群青」六色主调色盘 (Color System)

| 顺序 | 语义 Token | Hex 色值 | 适用场景 |
|---|---|---|---|
| 01 | 天蓝发光色 | `#12adfd` | 核心趋势/第一系列/重点高亮 |
| 02 | 群青电光青 | `#11c3dd` | 第二系列/渐变面积/次要焦点 |
| 03 | 沉稳橙金 | `#e68513` | 第三系列/强调对比/TOP 1 标号 |
| 04 | 靛蓝宝蓝 | `#5592f7` | 第四系列/平稳序列 |
| 05 | 翡翠生机绿 | `#18db6c` | 第五系列/正常与成功状态 |
| 06 | 柔和钛灰蓝 | `#83aad8` | 第六系列/辅助线与历史基准 |

文本与轴线调色：
- **主标题/核心文字**：`#f0f0f0`（纯亮白）
- **副标题/关键数字**：`#cde1f8`（浅冰蓝）
- **坐标轴刻度/辅助**：`#8299b1`（灰蓝降噪）

### 5. 字阶与数字字体 (Typography Hierarchy)
- **标题**：`抖音美好体`（Header 40px / Title 24px / SubTitle 20px）。
- **正文/标签**：`思源黑体 SC`（重要 16px / 正常 14px / 次要 12px）。
- **关键数值**：**强制使用等宽数字字体 `D-DIN` / `D-DIN Bold`**（重点 KPI 24px / 图表数值 20px / 坐标数字 14px），设置 `font-feature-settings: "tnum"`。

### 6. 大屏容器自适应 (ResizeObserver)
- 所有图表必须绑定 `ResizeObserver` 监听 DOM 容器变化，结合 `fitPx` 动态计算响应式字号与间距（详见 `rules/layout-and-responsive.md`）。

---

## 支撑规则与参考目录 Structure

- **主规范文档**：`SKILL.md`
- **主题 JSON 引用**：`references/qunqing-theme.json`（兼容 ECharts 5 及 ECharts 6 的「群青」Theme Builder 项目文件）
- **细则指南 (`rules/`)**：
  - `rules/theme-and-color.md` —— 「群青」配色、调色盘、字阶与状态色规范
  - `rules/echarts-spec.md` —— ECharts 5 / 6+ 大屏配置项最佳实践（Grid, Axis, Legend, Tooltip, Series）
  - `rules/layout-and-responsive.md` —— ResizeObserver 容器自适应、动态 fitPx 与 Vue 3 集成范例
  - `rules/anti-patterns.md` —— 常见“廉价塑料感”踩坑反模式与自动修复对览
- **代码范例 (`examples/`)**：
  - `examples/basic-charts.js` —— 渐变折线、胶囊柱图、KPI 环形图、多维雷达图
  - `examples/effect-charts.js` —— 折柱双轴、象形柱 (PictorialBar)、无针大屏仪表盘
  - `examples/map-geo-charts.js` —— 2D/3D 地图迁徙飞线、热力图、桑基图

---

## 验证检查清单 Validation Checklist

在交付或呈现图表配置前，请确保满足以下所有验收条件：

- [ ] **版本兼容**：配置完全兼容 ECharts 5 与 ECharts 6+。
- [ ] **背景透明**：`backgroundColor` 设置为 `'transparent'`，无突兀硬白/硬黑块。
- [ ] **渐变衰减**：面积图与柱状图均包含 `LinearGradient` 渐变填充，无平涂实色块。
- [ ] **轴线降噪**：顶部与右侧坐标轴已关闭（`show: false`），横向网格透明度在 `3% ~ 5%`。
- [ ] **色盘合规**：使用「群青」色彩（`#12adfd`, `#11c3dd`, `#e68513`, `#5592f7`, `#18db6c`, `#83aad8`）。
- [ ] **数字字体**：关键数值与 KPI 均显式指定 `fontFamily: 'D-DIN, Roboto, monospace'`。
- [ ] **容器自适应**：图表绑定了 `ResizeObserver` 并在容器变动时触发 `resize()`。
- [ ] **Tooltip 格式化**：Tooltip 采用暗色半透明高透卡片 (`backdrop-filter: blur(8px)`), 数值包含缩写与单位。
