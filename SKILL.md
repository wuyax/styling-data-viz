---
name: styling-data-viz
description: >-
  Use when creating, styling, reviewing, or optimizing ECharts (v5 & v6+) data visualization
  charts for dark-mode screens, tech dashboards, traditional Chinese style (国风), cyber neon purple (幻紫),
  or large-screen data visualization systems (数据可视化大屏) across Vue, React, or vanilla HTML/JS projects.
author: 小狼阿亮, wuyax
allowed-tools: Read, Glob, Grep
---

# 大屏数据可视化 Skill (Multi-Style Screen Data Visualization)

## Overview
本 Skill 基于 **Edward Tufte 高数据墨水比 (Data-Ink Ratio)** 理念与 **多风格模块化设计架构** 打造。用于指导 Agent 构建具备顶级视觉质感、高对比度沉浸、无缝斜条纹发光（可选）及响应式自适应的大屏 ECharts 5 / 6+ 图表。

---

## 什么时候使用 When to Use

### ✅ 适用场景
- 正在为数据可视化大屏 (Screen Data Viz)、科技驾驶舱 (Cockpit)、暗色 Dashboards、中式国风大屏或赛博霓虹大屏开发/修改 ECharts (v5 / v6+) 图表。
- 默认 ECharts 样式太轻量或过于普通，需要切换不同设计风格（如「群青」科技暗蓝、「国风」水墨青绿 或 「幻紫」赛博霓虹）。
- 图表在大屏缩放/高分屏切换时发生拉伸变形或字号错位。
- 需要选用符合风格标准的调色盘、字体排版（D-DIN / DINPro / 优设标题黑 / 楷宋 / 思源黑体）、无缝斜条纹 Pattern 生成器与切口组件。

### ❌ 不适用场景 (When NOT to Use)
- 浅色背景 (Light Mode) 的常规 Web 后台管理系统报表。
- 移动端 H5 微型图表或极简纯文本统计卡片。
- 使用 Canvas 2D / WebGL 手写自由绘图或纯 D3.js 图表场景。

---

## 🗺️ 风格与质感路由图 (Decision Flowchart)

```mermaid
flowchart TD
    Start[接收大屏图表需求] --> StyleCheck{用户是否指定设计风格?}
    StyleCheck -- "无指定 / 默认" --> QunQing[使用 qunqing 科技暗蓝]
    StyleCheck -- "国风 / 文化 / 生态" --> GuoFeng[使用 guofeng 水墨青绿]
    StyleCheck -- "AI / 元宇宙 / 赛博" --> HuanZi[使用 huanzi 赛博霓虹]

    QunQing --> DensityCheck{是否为 Hero/重点图表 或 需高科技感?}
    GuoFeng --> DensityCheck
    HuanZi --> DensityCheck

    DensityCheck -- "是 (重点/单柱/单折线)" --> DualLayer[采用单图层 ARIA 斜条纹/双图层 Overlay]
    DensityCheck -- "否 (多系列/密集数据)" --> SingleLayer[采用单图层 LinearGradient 渐变填充]

    DualLayer --> FinalCode[遵循对应风格 Token 生成 ECharts 配置]
    SingleLayer --> FinalCode
```

---

## 🎨 多风格路由系统 (Multi-Style System)

本 Skill 支持多种视觉设计风格， Agent 应根据用户 Prompt 的场景提示自动切换或引导用户选择对应风格：

| 风格 Token | 风格名称 | 对应 ECharts 主题 JSON | 专属规则文档 | 适用场景 / 行业 |
|---|---|---|---|---|
| `qunqing` | **「群青」科技暗蓝** | `references/themes/qunqing-theme.json` | [`rules/styles/qunqing.md`](rules/styles/qunqing.md) | 科技驾驶舱、IT/数据中心、交通监控、通用暗色大屏 |
| `guofeng` | **「国风」水墨青绿** | `references/themes/guofeng-theme.json` | [`rules/styles/guofeng.md`](rules/styles/guofeng.md) | 生态环境、智慧文旅、数字故宫、农业/乡村振兴、文化展厅 |
| `huanzi` | **「幻紫」赛博霓虹** | `references/themes/huanzi-theme.json` | [`rules/styles/huanzi.md`](rules/styles/huanzi.md) | AI算力中心、元宇宙、赛博朋克、高精尖科技、机器人驾驶舱 |

---

## ⚡ 核心模式微对比 (Core Pattern Before / After)

```javascript
// ❌ 反模式：平涂纯实色、硬黑背景、强坐标轴杂线
{ backgroundColor: '#000000', series: [{ type: 'bar', itemStyle: { color: '#12adfd' } }] }

// ✅ 正确规范：透明融入背景、渐变光晕衰减、高 Alpha 渐变描边、超淡降噪网格
{
  backgroundColor: 'transparent',
  aria: createAriaStripeDecal({ rotation: -45 }), // 不传 color 自动继承 itemStyle 渐变色，gap 默认为 [4, 6]
  yAxis: { splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)' } } },
  series: [{
    type: 'bar',
    itemStyle: {
      borderWidth: 1.5,
      borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(18, 173, 253, 1.0)' }, { offset: 1, color: 'rgba(85, 146, 247, 0.6)' }]),
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(18, 173, 253, 0.65)' }, { offset: 1, color: 'rgba(85, 146, 247, 0.15)' }])
    }
  }]
}
```

---

## 核心质感法则 (Universal & Optional Design Specs)

设计大屏图表时，需区分**通用基线法则**与**可选高级增强方案**：

### 📌 通用基线法则 (Universal Baseline Specs - 必须遵循)

#### 1. 容器背景透明融入
- 图表容器背景强制设为 `backgroundColor: 'transparent'`，无缝嵌入大屏玻璃卡片 DOM 中。

#### 2. 光晕渐变衰减 (Gradient Layering)
- **柱状图 / 折线面积图**：**默认必须使用 `echarts.graphic.LinearGradient` 渐变填充**，顶部/起点高亮发光、底部/终点平滑衰减，**严禁平涂纯实色块**。

#### 3. 超淡网格与低噪坐标轴 (Low-Noise Grid)
- **Top / Right 轴线**：强制隐藏顶部与右侧轴线及刻度（`show: false`）。
- **Y 轴 / 网格线**：隐藏 Y 轴线，横向网格线透明度压低至 `3% ~ 5%`，禁用纵向网格。

#### 4. 专属调色盘与语义 Token
- 严格遵循选定风格（`qunqing`、`guofeng` 或 `huanzi`）的 6 色语义主调色盘与字体规范（详见 [`rules/styles/index.md`](rules/styles/index.md)）。

#### 5. 字阶与等宽数字 (Typography Hierarchy)
- **关键数值与 KPI**：**强制使用等宽数字字体 `D-DIN` / `DINPro-Medium`**，配置 `font-feature-settings: "tnum"`。

#### 6. 容器动态自适应 (ResizeObserver)
- 所有图表必须配置 `containLabel: true`，并绑定 `ResizeObserver` 防抖监听 DOM 容器变化（详见 [`rules/general/layout-and-responsive.md`](rules/general/layout-and-responsive.md)）。

#### 7. 适度圆角与精细轮廓法则 (Global Corner Radius & Thin-Ring Silhouette Spec - 适用于所有图表)
- **硬朗几何大原则**：在大屏/科技/国风视觉体系中，**严禁使用大圆角或膨胀弧头**，圆角过大会使图形丧失工业几何张力与精细感，显得低龄廉价。
  - **柱状图 (Bar)**：**默认必须设为硬朗直角**（`borderRadius: 0`）；若需极微弱边缘软化，上限**不得超过 `1`**（如 `borderRadius: [1, 1, 0, 0]`）。
  - **饼图/环形图切片 (Pie Sector)**：切片端点仅允许**极微弱倒角（Micro Radius: `1 ~ 3`，推荐 `2`）**。在薄环厚（10%~12%）下，过大圆角（如 $\ge 4$）会导致端点变成圆滚滚的半圆药丸头，必须保持高精度激光切割硬朗感（Laser Cut Edge）。
  - **环形图厚度 (Ring Thickness)**：外径与内径差值（$\Delta R = R_{outer} - R_{inner}$）**不宜过厚**，推荐控制在 **`10% ~ 12%`**（例如 `['60%', '71%']`），保留轻盈精致感与充足的中心空间。
  - **容器卡片与 UI 元素**：容器微圆角统一控制在 `4px ~ 6px`。

#### 8. 饼图 / 环形图高级感生成原则 (Premium Donut/Pie Chart Specs)
- **悬浮切片、极微倒角与间隙 (Pad Angle, Micro Radius & Thin Ring)**：扇区切片之间**强制配置 `padAngle: 5 ~ 8` 物理断开**；切面应用极微倒角（`borderRadius: 1 ~ 3`，推荐 `2`）与轻盈环厚（环厚 $\le 12\%$），呈现高精度激光切割卡块感。
- **内外双极同心轨迹线 (Exposed Double Track Rings)**：避免背景暗轨被主切片遮盖（Bug 1 修复），严禁暗轨与主切片半径重合。配置 `['52%', '52.5%']` 内轨与 `['66.5%', '67%']` 外轨将主切片夹在中间，在扇区缝隙完美透出双同心线。
- **统一坐标与中心偏离防护 (Unified CenterX & Glow Protection)**：在包含右侧 Legend 时（Bug 3 & 4 修复），主圆环中心左移至 `center: ['32%', '50%']`，`radius` 适当收缩（如 `['54%', '65%']`）防止重叠；**关键：`title.left` 与 `graphic.position` 必须强制联动设为相同的 `centerX`（如 `'32%'`）**，严禁留默认 `'50%'` 导致光晕右偏。
- **结构化右侧图例与防污染 (Precision Legend & Filter)**：图例首选右侧纵向排列 (`orient: 'vertical'`)，使用微型正方形 `icon: 'rect'`；利用 `formatter` 实现 `[名称] + [大号等宽百分比]` 列对齐；**必须显式定义 `legend.data`** 仅包含真实业务名称，防止辅助 Ticks / Track 污染图例。
- **工业级刻度盘增强 (Industrial Gauge Ticks)**：内圈刻度加长加粗（`axisTick.length: 8`, `width: 1.5`, `splitNumber: 60`），提升硬朗工控感（详见 [`rules/general/pie-and-donut-spec.md`](rules/general/pie-and-donut-spec.md)）。

---

### ✨ 可选高级增强方案 (Optional High-Texture Enhancements)

#### 8. 斜条纹纹理质感 (Stripe Texture Enhancements)
- **方案定位**：**可选/按需使用的高质感增强技术**，并非所有图表必须叠加。
- **适用场景**：
  1. 用户明确提示需“科技全息”、“斜纹发光质感”、“高级细节”或“赛博朋克”视觉风格。
  2. 大屏核心指示器、单柱/单折线重点 Hero 图表。
- **避免场景**：5 系列以上密集型数据柱图、常规多折线对比图（使用单层 `LinearGradient` 即可，避免画面过度杂乱或产生视觉噪音）。
- **硬性搭配法则**：
  1. **斜条纹必带描边**：使用斜条纹时**必须同时配置 `borderWidth: 1 ~ 1.5` 的显式描边**，防止外轮廓发虚失焦。
  2. **边框渐变与高 Alpha**：若 `itemStyle.color` 为 `LinearGradient` 渐变填充，`borderColor` **也必须同步配置 `LinearGradient` 渐变**，且边框 Alpha 不透明度**必须显著高于填充色**（如边框 Alpha 0.8~1.0 vs 填充 Alpha 0.15~0.65），打造高发光轮廓切面。
  3. **条纹跟随渐变法则**：当 `itemStyle` 为渐变填充时，`createAriaStripeDecal({...})` **严禁显式传递 `color` 参数**（保持 `color: undefined`），使斜条纹自动继承 `itemStyle` 的渐变色；不传 `color` 时 `gap` 默认设为 `[4, 6]`（线宽 4, 间距 6）为最佳视角。
  4. **严禁纯白条纹**：绝对禁止使用纯白色（如 `rgba(255, 255, 255, 0.85)`）作为斜条纹颜色。白色条纹会在暗色大屏中产生刺眼白刺与假网格浮层。单色场景下必须传递与**系列同色调的颜色**（如 `rgba(18, 173, 253, 0.85)`）；渐变场景下保持 `color: undefined` 自动继承渐变。
- **实现方案与优先级**：
  - **优先推荐 (Priority 1 - 单图层原生贴花)**：直接使用 ECharts 5+ 原生 `aria: createAriaStripeDecal(...)`，在单一 `series` 内同时享受 `itemStyle.color` 的渐变发光与贴花纹理（详见 [`references/ariaStripeDecal.ts`](references/ariaStripeDecal.ts)）。
  - **备选方案 (Priority 2 - 双图层 Pattern 重叠)**：使用底层渐变 + 顶层 `barGap: '-100%'` 的 `createStripePattern` 遮罩层（详见 [`rules/general/stripe-texture-and-gradients.md`](rules/general/stripe-texture-and-gradients.md) 与 [`references/stripePattern.ts`](references/stripePattern.ts)）。

---

## 🚨 红线警示与防辩解 (Red Flags & Rationalization)

严禁在压力的诱惑下违反以下规定，违者视为生成质量不合格：

| Agent 常见辩解 (Rationalization) | 事实与铁律 (Reality) |
|---|---|
| "简单图表用单色 `color: '#12adfd'` 填充更快" | 默认必须配置 `LinearGradient` 渐变，单色平涂大面积色块在大屏上显得廉价缺乏质感。 |
| "为了让图表黑白对比更明显，设置 `backgroundColor: '#000'`" | 强制设置 `backgroundColor: 'transparent'`，确保完美融入外部 glassmorphism 卡片。 |
| "环境中没有 `D-DIN` 字体，直接使用默认系统字体" | 关键数字必须配置字体回退栈 `'D-DIN, DINPro-Medium, monospace'` 并设置 `font-feature-settings: "tnum"`。 |
| "边框使用纯单色描边，或没有设置边框" | 斜条纹图表必须配置显式边框，且填充为渐变时边框必须配置同调性 `LinearGradient` 且 Alpha 透明度显著高于填充色。 |
| "为了让柱体顶部更柔和，设置 `borderRadius: [4, 4, 0, 0]` 大圆角" | 柱状图必须保持大屏硬朗几何切割。不建议使用圆角；若需微弱边缘软化，绝对严禁大圆角，`borderRadius` 最大仅允许设为 `1`（推荐设为 `0` 或不设）。 |
| "给斜条纹设置纯白色 `color: 'rgba(255, 255, 255, 0.85)'` 更加醒目" | 纯白条纹会破坏全屏调色盘统一感产生杂乱白刺。渐变场景绝对不传 `color` 继承渐变，单色场景必须传递与系列主色同调的颜色。 |
| "容器尺寸似乎是固定的，不需要绑定 ResizeObserver" | 绝不能假设大屏尺寸不变，所有图表必须开启 `containLabel: true` 并防抖监听 resize。 |
| "所有图表都强制加上斜条纹双图层" | 斜条纹属于高级可选增强方案，优先使用单图层 `aria.decal`，且 5 系列以上密集图表严禁使用，避免画面杂乱。 |
| "为了展现科技感，把单图表入场动画设为 3s~5s 或齐刷刷无 delay 弹出" | 首屏入场必须控制在 `1.5s` 内（推荐 `animationDuration: 800ms`）并带交错 delay，避免全屏拖沓阻塞；常态低频呼吸（3s~6s）仅在入场完成后作用于重点节点。 |
| "饼图/环形图扇区没必要加间隔，直接无缝相连即可" | 环形图切片必须配置 `padAngle: 5~8` 物理间隔与 `itemStyle.borderRadius: 6~8` 胶囊化平滑端点，且叠加底层贯通暗轨，严禁无缝死板粘连。 |
| "环形图中心空着挺好看，不需要额外的底盘或文字" | 环形图中心严禁留空，必须配置半透明渐变底盘（RadialGradient）与大号等宽 KPI 数值及次级标题，形成视觉锚点。 |

---

## 支撑规则与参考目录 Structure

- **Skill 核心入口**：`SKILL.md`
- **项目说明**：`README.md`
- **静态参考与工具函数 (`references/`)**：
  - `ariaStripeDecal.ts` —— **[优先推荐]** ECharts 5+ 原生 ARIA 单图层斜条纹贴花生成器 (TypeScript 导出)
  - `stripePattern.ts` —— 无缝科技斜条纹 Pattern 动态生成工具 (TypeScript 导出)
  - `themes/qunqing-theme.json` —— 「群青」 Theme Builder 文件
  - `themes/guofeng-theme.json` —— 「国风」 Theme Builder 文件
  - `themes/huanzi-theme.json` —— 「幻紫」 Theme Builder 文件
- **细则指南 (`rules/`)**：
  - **通用规范 (`rules/general/`)**：
    - `pie-and-donut-spec.md` —— 饼图/环形图高级感配置规范 (胶囊切片、贯通暗轨、中心玻璃底罩)
    - `stripe-texture-and-gradients.md` —— 斜条纹与渐变质感规范
    - `echarts-spec.md` —— ECharts 5 / 6+ 配置项最佳实践
    - `animation-and-rhythm.md` —— 动画与视觉节奏规范 (入场 $\le$ 1.5s~2s、交错算法与常态微动)
    - `layout-and-responsive.md` —— ResizeObserver 容器自适应与 Vue 3 集成范例
    - `anti-patterns.md` —— 踩坑反模式与自动修复指南
  - **风格细则 (`rules/styles/`)**：
    - `index.md` —— 风格矩阵与路由指引
    - `qunqing.md` —— 「群青」科技暗蓝规范
    - `guofeng.md` —— 「国风」水墨青绿规范
    - `huanzi.md` —— 「幻紫」赛博霓虹规范
- **代码范例 (`examples/`)**：
  - `examples/qunqing/` —— 群青风示例
  - `examples/guofeng/` —— 国风水墨示例
  - `examples/huanzi/` —— 幻紫赛博霓虹示例

---

## 验证检查清单 Validation Checklist

- [ ] **风格匹配**：正确匹配了 `qunqing`、`guofeng` 或 `huanzi` 风格及对应调色盘。
- [ ] **渐变填充与描边**：所有面积图与柱状图均配置了 `LinearGradient` 衰减渐变（禁止平涂实色）；若有描边，描边同步使用高 Alpha 不透明度 `LinearGradient`。
- [ ] **饼图/环形图高级感**：扇区配置了 `padAngle: 5~8` 物理间隔与 `borderRadius: 6~8` 平滑端点；配置了底层半透贯通暗轨（Track Ring）；中心叠加了渐变底罩与等宽 KPI 数值；引导标签使用纵向三层 Rich 格式。
- [ ] **斜条纹与边框搭配**：斜条纹图表显式配置了 `borderWidth: 1 ~ 1.5` 描边；优先配置单图层 `aria: createAriaStripeDecal(...)`。
- [ ] **背景透明**：`backgroundColor` 设置为 `'transparent'`。
- [ ] **轴线降噪**：顶部与右侧坐标轴已关闭（`show: false`），横向网格透明度低于 `5%`。
- [ ] **等宽数字**：关键 KPI 及轴线数字包含 `fontFamily: 'D-DIN, DINPro-Medium, monospace'`。
- [ ] **容器自适应**：图表绑定了 `ResizeObserver` 防抖 resize，且开启 `containLabel: true`。
- [ ] **动画与节奏**：单图表入场控制在 1.5s 内（推荐 `animationDuration: 800ms`，交错 `animationDelay`），数据更新 400~600ms 敏捷响应，常态呼吸维持低频（3s~6s），避免全屏拖沓。

