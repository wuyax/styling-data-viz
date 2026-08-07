# 大屏数据可视化 Skill (Multi-Style Screen Data Viz)

> **基于多风格模块化设计架构（「群青」科技暗蓝、「国风」水墨青绿 & 「幻紫」赛博霓虹）、双图层斜条纹复合渐变与 Edward Tufte 高数据墨水比 (Data-Ink Ratio) 理念打造的 ECharts 大屏数据可视化 AI Skill / 指南仓库。**

---

## 📖 简介 (Overview)

本仓库提供了一套完整的大屏数据可视化设计规范、ECharts (v5 & v6+) 多风格暗色高质感配置指南与可复用范例。旨在帮助 AI Agent (如 Antigravity, Claude, Cursor 等) 或人类开发者快速构建具备 **顶级视觉质感**、**双图层斜条纹发光**、**高对比度沉浸**、**响应式自适应** 的科技驾驶舱、国风水墨与赛博霓虹主题数据大屏。

---

## ✨ 核心特性 (Key Features)

- 🎨 **多风格设计路由 (Multi-Style System)**：
  - **「群青」 (Ultranavy)**：钛空暗蓝、高发光电光青，专为科技驾驶舱、IT/数据中心监控打造。
  - **「国风」 (Guofeng)**：水墨丹青、青绿山水与藤黄金边，专为生态环境、智慧文旅、数字故宫、农业大屏打造。
  - **「幻紫」 (Huanzi)**：赛博朋克霓虹、电光蓝紫、极光高亮、三维三角柱图与玉珏图，专为 AI 算力中心、元宇宙、机器人驾驶舱打造。
- 🏁 **斜条纹与渐变质感 (Stripe Texture & Gradients)**：
  - **[优先推荐]** 内置 `ariaStripeDecal.ts`，基于 ECharts 5+ 原生 ARIA Decal 特性，无需双图层重叠即可在单图层中同时享受渐变色与矢量斜条纹。
  - **[备选方案]** 内置 `stripePattern.ts` 动态无缝斜条纹 Canvas 生成器，支持 Canvas Pattern 遮罩。
- 📊 **ECharts 5 / 6+ 深度适配**：涵盖折线渐变、斜纹胶囊柱图、三维三角柱图、中式玉环饼图、双轴图、无针仪表盘与水墨/电光迁徙飞线地图等大屏组件。
- 📐 **动态容器自适应 (Responsive Math)**：基于 `ResizeObserver` 与动态 `fitPx` 计算，完美解决大屏拉伸、高分屏字号错位问题。
- 🚫 **避坑反模式库 (Anti-Patterns)**：系统总结“廉价塑料感”常见错误（平涂实色、硬边框、过度描边、噪点网格），并提供对比优化对策。

## 🚀 Skill 安装方式 (Installation)

推荐使用 `skills` CLI 工具直接一键安装本 Skill（Git 仓库形式）：

```bash
npx skills add https://github.com/wuyax/styling-data-viz.git
```

---

## 📂 目录结构 (Directory Structure)

```text
styling-data-viz/
├── SKILL.md                         # Skill 入口指令与多风格 Agent 核心调度规则
├── README.md                        # 项目说明文档
├── skills-lock.json                 # Skill 依赖与锁定配置
├── references/                      # 静态资源与工具函数
│   ├── ariaStripeDecal.ts           # [优先推荐] ECharts 5+ ARIA 单图层斜纹贴画生成器
│   ├── stripePattern.ts             # [备选方案] 无缝斜条纹 Pattern 生成器
│   └── themes/                      # 多风格 Theme 目录
│       ├── qunqing-theme.json       # 「群青」 Theme Builder 文件
│       ├── guofeng-theme.json       # 「国风」 Theme Builder 文件
│       └── huanzi-theme.json       # 「幻紫」 Theme Builder 文件
├── rules/                           # 详细细则指南
│   ├── general/                     # 通用规范 (通用 ECharts 配置、斜纹渐变规范、响应式、避坑)
│   │   ├── stripe-texture-and-gradients.md
│   │   ├── echarts-spec.md
│   │   ├── layout-and-responsive.md
│   │   └── anti-patterns.md
│   └── styles/                      # 各设计风格专属细则
│       ├── index.md                 # 风格矩阵与路由指引
│       ├── qunqing.md               # 「群青」科技暗蓝色彩与字体规范
│       ├── guofeng.md               # 「国风」水墨青绿色彩与字体规范
│       └── huanzi.md                # 「幻紫」赛博霓虹色彩与字体规范
└── examples/                        # 可直接调用的 TypeScript 图表代码范例
    ├── qunqing/                     # 群青风格示例 (basic-charts, effect-charts, map-geo-charts)
    ├── guofeng/                     # 国风风格示例 (basic-charts, map-geo-charts)
    └── huanzi/                      # 幻紫风格示例 (basic-charts, effect-charts)
```

---

## 🛠️ 斜条纹与渐变使用示例 (Usage Example)

### 方案一：单图层 ARIA Decal 斜纹渐变 (优先推荐 ⭐⭐⭐⭐⭐)

```typescript
import * as echarts from 'echarts';
import { createAriaStripeDecal } from './references/ariaStripeDecal';

const option = {
  // 开启 ARIA 原生斜纹贴花
  aria: createAriaStripeDecal({
    color: 'rgba(18, 173, 253, 0.9)',
    gap: [2, 6],
    rotation: -45
  }),

  // 单图层直接渐变填充
  series: [
    {
      name: '数据量',
      type: 'bar',
      barWidth: '40%',
      itemStyle: {
        borderWidth: 1.5,
        borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(18, 173, 253, 1)' },
          { offset: 1, color: 'rgba(85, 146, 247, 0.3)' }
        ]),
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(18, 173, 253, 0.85)' },
          { offset: 1, color: 'rgba(85, 146, 247, 0.15)' }
        ])
      },
      data: [120, 200, 150, 80]
    }
  ]
};
```


---

## 👥 作者 (Authors)

- **小狼阿亮**
- **wuyax**

---

## 📄 许可协议 (License)

[MIT License](LICENSE)
