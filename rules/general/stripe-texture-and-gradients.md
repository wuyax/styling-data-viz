# 大屏斜条纹与双图层复合渐变规范 (Stripe Texture & Compound Gradients)

本规范总结了在高质感暗色大屏中，如何实现**“色彩渐变 + 科技斜条纹”**双重叠加的像素级微调法则。

---

## 1. 核心设计痛点与解决方案

### ❌ 痛点：单图层 `color` 互相排斥
在 ECharts 中，直接在 `itemStyle.color` 或 `areaStyle.color` 赋给 Canvas Pattern 时，原有的 `LinearGradient` 颜色渐变会被取代；而如果使用纯色 Pattern，底色过浓会把斜线掩盖。

### ✅ 解决方案：双图层复合叠加 (Compound Dual-Layer Overlay)
通过叠加两个属性相同或互补的 Series：
- **底层 (Base Series)**：配置 **低透明度的 `LinearGradient` 颜色渐变**，提供柔和发光衬底。
- **顶层 (Stripe Series)**：配置 **100% 背景透明 (`bgColor: 'transparent'`) 的斜条纹 Pattern**，呈现出精细发光的斜纹。

工具函数位置：[`references/stripePattern.ts`](../../references/stripePattern.ts)

---

## 2. 柱状图双层叠加范例 (Bar Chart Layering)

使用 `barGap: '-100%'` 将斜纹层精准重叠于渐变层之上：

```typescript
import { createStripePattern } from '../../references/stripePattern';

series: [
  // 1. 底层：适当降低 Alpha 透明度的色彩渐变层
  {
    name: '数据值',
    type: 'bar',
    barWidth: '40%',
    showBackground: true,
    backgroundStyle: {
      color: 'rgba(205, 225, 248, 0.03)',
      borderColor: 'rgba(18, 173, 253, 0.15)',
      borderWidth: 1,
      borderRadius: [0, 4, 4, 0]
    },
    itemStyle: {
      borderRadius: [0, 4, 4, 0],
      borderWidth: 1.5,
      borderColor: '#12adfd',
      color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        { offset: 0, color: 'rgba(18, 173, 253, 0.45)' },  // 调低透明度，凸显斜条纹
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
    showBackground: false,
    tooltip: { show: false },
    legendHoverLink: false,
    itemStyle: {
      borderRadius: [0, 4, 4, 0],
      color: createStripePattern({
        mainColor: 'rgba(255, 255, 255, 0.35)', // 清晰发光细线条
        bgColor: 'transparent',                // 100% 透明背景
        angle: 45,                             // 默认 45°
        lineWidth: 2                           // 默认 2px
      })
    },
    data: scores
  }
]
```

---

## 3. 折线图双层全息面积范例 (Line Chart Layering)

使用双折线面积层打造 **全息投影网格 (Holographic Grid)**：

```typescript
series: [
  // 1. 主折线：发光线 + 垂直衰减渐变面积
  {
    name: '流量趋势',
    type: 'line',
    smooth: 0.35,
    showSymbol: true,
    symbol: 'circle',
    symbolSize: 6,
    itemStyle: { color: '#12adfd', borderColor: '#ffffff', borderWidth: 2 },
    lineStyle: {
      width: 3,
      color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        { offset: 0, color: '#11c3dd' },
        { offset: 1, color: '#12adfd' }
      ]),
      shadowColor: 'rgba(18, 173, 253, 0.65)',
      shadowBlur: 14
    },
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: 'rgba(18, 173, 253, 0.40)' },
        { offset: 1, color: 'rgba(18, 173, 253, 0.00)' }
      ])
    },
    data: lineData
  },
  // 2. 叠加层：透明背景的无缝斜条纹 Pattern
  {
    name: '流量趋势',
    type: 'line',
    smooth: 0.35,
    showSymbol: false,
    tooltip: { show: false },
    lineStyle: { opacity: 0 },
    areaStyle: {
      color: createStripePattern({
        mainColor: 'rgba(255, 255, 255, 0.15)',
        bgColor: 'transparent',
        angle: 45
      })
    },
    data: lineData
  }
]
```

---

## 4. 几何无缝平铺推导公式 (Seamless Pattern Geometry)

为了防止 Canvas Tile 在平铺时产生一节一节的接缝断层：
1. **宽高约束**：单元格宽高必须严格满足 $\tan(\theta) = H / W$。
2. **三线补缝**：在 Tile 内必须包含：
   - 主斜线：`(0, H) ➔ (W, 0)`
   - 左上角补线：`(-W/2, H/2) ➔ (W/2, -H/2)`
   - 右下角补线：`(W/2, 3H/2) ➔ (3W/2, H/2)`

如此绘制可在 2D 网格重复时形成 **100% 无缝无限延伸斜线**。
