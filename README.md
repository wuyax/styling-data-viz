# 大屏数据可视化 Skill (Screen Data Viz)

> **基于「群青」官方设计规范与 Edward Tufte 高数据墨水比 (Data-Ink Ratio) 理念打造的 ECharts 大屏数据可视化 AI Skill / 指南仓库。**

---

## 📖 简介 (Overview)

本仓库提供了一套完整的 **大屏数据可视化 (Screen Data Viz)** 设计规范、ECharts (v5 & v6+) 暗色高质感配置指南与可复用范例。旨在帮助 AI Agent (如 Antigravity, Claude, Cursor 等) 或人类开发者快速构建具备 **顶级视觉质感**、**高对比度冷感沉浸**、**响应式自适应** 的科技驾驶舱与暗色大屏图表。

---

## ✨ 核心特性 (Key Features)

- 🎨 **「群青」标准调色盘 (Ultranavy Palette)**：收录符合科技感与暗色沉浸效果的 6 色语义主调色盘与高对比字阶色阶。
- 📊 **ECharts 5 / 6+ 深度适配**：涵盖折线渐变、胶囊柱图、切口环形图、双轴图、无针仪表盘、象形柱图与 2D/3D 地图迁徙飞线等主流大屏组件。
- 📐 **动态容器自适应 (Responsive Math)**：基于 `ResizeObserver` 与动态 `fitPx` 计算，完美解决大屏拉伸、高分屏字号错位问题。
- 🚫 **避坑反模式库 (Anti-Patterns)**：系统总结“廉价塑料感”常见错误（平涂实色、硬边框、过度描边、噪点网格），并提供对比优化对策。
- 📁 **即插即用 Theme 文件**：内置标准 `qunqing-theme.json` 主题构建文件，可直接导入 ECharts Theme Builder 或前端工程。

---

## 📂 目录结构 (Directory Structure)

```text
data-vis-skill/
├── SKILL.md                         # Skill 入口指令与 Agent 核心调度规则
├── README.md                        # 项目说明文档
├── skills-lock.json                 # Skill 依赖与锁定配置
├── references/                      # 静态资源与主题配置文件
│   └── qunqing-theme.json           # 「群青」官方 ECharts 5/6 主题配置文件
├── rules/                           # 详细细则指南
│   ├── theme-and-color.md           # 色彩系统、调色盘、字阶与语义 Token
│   ├── echarts-spec.md              # ECharts 大屏配置项最佳实践 (Grid, Axis, Legend, Tooltip)
│   ├── layout-and-responsive.md     # ResizeObserver 响应式自适应与 Vue 3 / JS 集成范例
│   └── anti-patterns.md             # 常用质感踩坑反模式与自动修复指南
└── examples/                        # 可直接调用的 JavaScript 图表代码范例
    ├── basic-charts.js              # 基础图表：渐变折线、胶囊柱图、切口环形图、雷达图
    ├── effect-charts.js             # 特效图表：折柱双轴、象形柱 (PictorialBar)、无针仪表盘
    └── map-geo-charts.js            # 地图图表：2D/3D 地图迁徙飞线、热力图、桑基图
```

---

## 🎨 「群青」核心设计规范速查 (Ultranavy Specs)

| 顺序 | 语义 Token | Hex 色值 | 示例/适用场景 |
| :--- | :--- | :--- | :--- |
| **01** | 天蓝发光色 | `#12adfd` | 核心趋势 / 第一序列 / 焦点高亮 |
| **02** | 群青电光青 | `#11c3dd` | 第二序列 / 渐变面积 / 次要焦点 |
| **03** | 沉稳橙金 | `#e68513` | 第三序列 / 强调对比 / TOP 1 标号 |
| **04** | 靛蓝宝蓝 | `#5592f7` | 第四序列 / 平稳序列 |
| **05** | 翡翠生机绿 | `#18db6c` | 第五序列 / 正常与成功状态 |
| **06** | 柔和钛灰蓝 | `#83aad8` | 第六序列 / 辅助线与历史基准 |

### 文字与文本规范
- **主标题/核心文本**：`#f0f0f0`（亮白）
- **副标题/关键说明**：`#cde1f8`（浅冰蓝）
- **坐标轴刻度/辅助**：`#8299b1`（灰蓝降噪）
- **数字/KPI**：强制使用等宽数字字体 `D-DIN, Roboto, monospace`，并指定 `font-feature-settings: "tnum"`。

---

## 🛠️ 如何使用 (Usage)

### 1. Agent / AI 助手集成
在 Agent 环境（如 Antigravity / Cursor / Claude Code）中引入本 Skill 目录后，Agent 在处理 ECharts 相关的可视化需求时，会自动读取 `SKILL.md` 并匹配 `rules/` 与 `examples/` 中的最佳实践代码。

### 2. 人类开发者使用指南
- **参考代码**：可以直接从 `examples/` 目录中复制代码片段至 Vue / React / Vanilla JS 项目。
- **主题载入**：
  ```javascript
  import * as echarts from 'echarts';
  import qunqingTheme from './references/qunqing-theme.json';

  // 注册主题
  echarts.registerTheme('qunqing', qunqingTheme);
  
  // 初始化图表
  const chart = echarts.init(dom, 'qunqing');
  ```
- **容器自适应**：
  参照 [`rules/layout-and-responsive.md`](rules/layout-and-responsive.md) 使用 `ResizeObserver` 防抖触发 `chart.resize()`。

---

## ✅ 验收检查清单 (Checklist)

开发完大屏图表后，可依照以下标准逐项检查：

- [ ] **透明融入**：`backgroundColor` 显式设为 `'transparent'`。
- [ ] **光晕渐变**：面积图与柱图填充均使用 `echarts.graphic.LinearGradient` 渐变。
- [ ] **坐标轴降噪**：隐藏 Top / Right 坐标轴线，Y 轴网格线透明度低于 `5%`。
- [ ] **等宽数字**：关键 KPI 及轴线数字包含 `fontFamily: 'D-DIN, Roboto, monospace'`。
- [ ] **响应式调整**：DOM 尺寸变动时触发自适应 resize。

---

## 👥 作者 (Authors)

- **小狼阿亮**
- **wuyax**

---

## 📄 许可协议 (License)

[MIT License](LICENSE)
