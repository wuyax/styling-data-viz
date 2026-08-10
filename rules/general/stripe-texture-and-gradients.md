# 大屏斜条纹与渐变质感规范 (Stripe Texture & Gradients)

本规范总结了在高质感暗色大屏中，如何实现“色彩渐变 + 科技斜条纹”视觉叠加的最佳实践。

---

## 1. 核心搭配法则 (Core Pairing Rules)

在大屏中应用斜条纹与渐变质感时，必须严格遵守以下两条视觉法则：

### 法则一：斜条纹必带硬朗描边 (Stripe + Outline Pairing)
斜条纹纹理会打散图形边缘的实色视觉感知。为了防止图表在暗色大屏中失焦发虚，**配置斜条纹时必须同时配置 `borderWidth: 1 ~ 1.5` 的显式描边**，用清晰的切面勾勒几何结构。

### 法则二：边框同步渐变 & 高不透明度 (Gradient Border with Higher Alpha)
- **边框渐变同构**：当 `itemStyle.color` 使用 `LinearGradient` 渐变填充时，`borderColor` **也必须同步配置同方向/同色调的 `LinearGradient` 渐变**。
- **不透明度阶梯**：`borderColor` 各 Stop 点的 Alpha 不透明度**必须显著高于**填充色 `color`（如边框 0.8~1.0 vs 填充 0.15~0.65）。通过“高亮度硬朗边框 + 半透明底色填充”，让斜条纹在透光填充中清晰呈现，同时强化科技轮廓线。

---

## 2. 方案选型指南 (Solution Matrix)

在大屏中为图表添加斜条纹质感时，有两种实现路径：

| 方案维度 | **方案一：单图层 ARIA Decal 原生纹理 (优先推荐)** | **方案二：双图层 Canvas Pattern 复合重叠 (备选/旧版本兼容)** |
|---|---|---|
| **技术原理** | 开启 ECharts 5+ 原生 `aria.decal` 矢量贴花，单图层直接同时设置渐变 `itemStyle.color` 和 `aria.decal` | 叠加两个重叠的 `series`（底层做渐变，顶层用 `barGap: '-100%'` + Canvas Pattern） |
| **系列层级** | **单图层 (`1 series`)** | **双图层 (`2 series`)** |
| **代码量/维护** | 极简，无需重复定义系列数据 | 较繁琐，需数据同步和关闭顶层 Tooltip |
| **交互与性能** | Tooltip/Legend 响应完美，无重叠层碰撞 | 需处理顶层 `tooltip: { show: false }` |
| **工具函数** | [`references/ariaStripeDecal.ts`](../../references/ariaStripeDecal.ts) | [`references/stripePattern.ts`](../../references/stripePattern.ts) |

---

## 3. 方案一：单图层 ARIA Decal 原生纹理 (优先推荐)

### 核心原理
在 ECharts 5+ 中，开启 `aria.decal` 后，图表可以在保持 `itemStyle.color` 为 `LinearGradient` 渐变填充的同时，原生叠加矢量贴图（Decal）。只要将贴花的 `backgroundColor` 设为 `'none'` 并使用半透明/高亮线条，纹理即可无缝叠加于渐变之上。

### 工具函数与范例

```typescript
import * as echarts from 'echarts';
import { createAriaStripeDecal } from '../../references/ariaStripeDecal';

const option = {
  // 1. 全局开启 ARIA 斜条纹贴画（当 itemStyle 为渐变时，不传 color，条纹自动跟随柱体/面积渐变，gap 默认为 [4, 6]）
  aria: createAriaStripeDecal({
    rotation: -45                       // -45 度斜条纹
  }),

  // 2. 单图层柱状图：填充渐变 + 高 Alpha 渐变边框
  series: [
    {
      name: '数据值',
      type: 'bar',
      barWidth: '40%',
      itemStyle: {
        borderWidth: 1.5,
        // 规则二：borderColor 也使用渐变，且 Alpha 透明度显著高于填充色
        borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(18, 173, 253, 1.0)' },  // 顶部高亮边框 100%
          { offset: 1, color: 'rgba(85, 146, 247, 0.6)' }   // 底部边框 60%
        ]),
        // 填充色：Alpha 透明度较低，衬托斜条纹与高亮边框
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(18, 173, 253, 0.65)' }, // 顶部填充 65%
          { offset: 1, color: 'rgba(85, 146, 247, 0.15)' }  // 底部填充 15%
        ])
      },
      data: [120, 200, 150, 80]
    }
  ]
};
```

---

## 4. 方案二：双图层 Canvas Pattern 复合重叠 (备选/兼容方案)

### 适用场景
当需要使用复杂自定义 Canvas 绘制图形（非标准矢量线条）或兼容旧版 ECharts 时使用。

### 柱状图双层重叠范例

```typescript
import { createStripePattern } from '../../references/stripePattern';

series: [
  // 1. 底层：发光渐变填充 + 高 Alpha 渐变边框
  {
    name: '数据值',
    type: 'bar',
    barWidth: '40%',
    itemStyle: {
      borderWidth: 1.5,
      borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: 'rgba(18, 173, 253, 0.9)' },
        { offset: 1, color: 'rgba(85, 146, 247, 0.5)' }
      ]),
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: 'rgba(18, 173, 253, 0.45)' },
        { offset: 1, color: 'rgba(85, 146, 247, 0.15)' }
      ])
    },
    data: scores
  },
  // 2. 顶层：100% 重叠的透明斜条纹遮罩层
  {
    name: '数据值',
    type: 'bar',
    barWidth: '40%',
    barGap: '-100%',
    tooltip: { show: false },
    legendHoverLink: false,
    itemStyle: {
      color: createStripePattern({
        mainColor: 'rgba(255, 255, 255, 0.35)',
        bgColor: 'transparent',
        angle: 45,
        lineWidth: 2
      })
    },
    data: scores
  }
]
```

---

## 5. 几何无缝平铺推导公式 (Seamless Pattern Geometry)

为了防止 Canvas Pattern / ARIA Tile 在平铺时产生一节一节的接缝断层：
1. **宽高约束**：单元格宽高必须严格满足 $\tan(\theta) = H / W$。
2. **三线补缝**：在 Canvas Tile 内需包含：
   - 主斜线：`(0, H) ➔ (W, 0)`
   - 左上角补线：`(-W/2, H/2) ➔ (W/2, -H/2)`
   - 右下角补线：`(W/2, 3H/2) ➔ (3W/2, H/2)`

如此绘制可在 2D 网格重复时形成 **100% 无缝无限延伸斜线**。
