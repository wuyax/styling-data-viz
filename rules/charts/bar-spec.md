# 柱状图与象形柱图规范 (Bar & Pictorial Bar Chart Spec)

本文件规定大屏 ECharts 场景下，柱状图、渐变斜纹柱图、象形柱图与 3D 三角柱图的核心构建原则与排版约束。

---

## 1. 核心约束与避坑法则

### 1. 硬朗直角切面法则 (Strict Zero-Radius Spec)
* **硬朗几何切面**：大屏柱状图默认必须保持硬朗直角（`borderRadius: 0`），以此呈现科技驾驶舱与机甲切面的硬朗质感。
* **微边缘过渡上限**：若极端情况下需要微弱边缘软化，圆角上限**不得超过 `1`**（如 `borderRadius: [1, 1, 0, 0]`）。
* **禁用大圆角**：**严禁使用 `borderRadius: [4, 4, 0, 0]`** 或更高弧度的胶囊/泡泡圆角，防止产生低龄塑料感。

### 2. 斜纹贴画与双图层适用判定
* **单图层 ARIA 斜纹 (优先推荐)**：单柱/双柱重点图表推荐配置 `aria: createAriaStripeDecal({ rotation: -45 })`。不传 `color`，自动继承 `itemStyle` 的渐变填充。
* **5 系列以上密集柱图显式禁用**：当 X 轴分类密集或系列数 $\ge 5$ 时，**禁止添加斜条纹**，防止视觉过载与杂乱干扰。
* **描边搭配铁律**：配置斜条纹时必须同时配置 `borderWidth: 1 ~ 1.5` 的显式描边，且 `borderColor` 的渐变 Alpha 不透明度须显著高于填充色。

### 3. 象形柱图与 3D 三角柱图 (Pictorial Bar Spec)
* **「幻紫」三维三角柱**：在赛博/AI 风格大屏中，使用 `pictorialBar` 锥形/三角形路径：
  ```javascript
  symbol: 'path://M0,10 L5,0 L10,10 Z',
  symbolClip: true
  ```
* **科技方块点阵柱图**：使用 `symbol: 'rect'` 叠加重复方块，设置 `symbolRepeat: true`, `symbolSize: [18, 4]`, `symbolMargin: 2`，呈现服务器 CPU 负载点阵质感。

---

## 2. 完整无 Bug 配置代码范例

```typescript
import * as echarts from 'echarts';
import { createAriaStripeDecal } from '../../references/ariaStripeDecal';

export function getTechBarOption() {
  return {
    backgroundColor: 'transparent',
    aria: createAriaStripeDecal({ rotation: -45 }),
    grid: {
      top: '15%',
      right: '4%',
      bottom: '8%',
      left: '4%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['数据中心 A', '数据中心 B', '数据中心 C', '数据中心 D', '数据中心 E'],
      axisLine: { lineStyle: { color: 'rgba(205, 225, 248, 0.15)' } },
      axisTick: { show: false },
      axisLabel: { color: '#8299b1', fontSize: 12 },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#8299b1',
        fontSize: 12,
        fontFamily: 'D-DIN, DINPro-Medium, monospace'
      },
      splitLine: {
        show: true,
        lineStyle: { color: 'rgba(205, 225, 248, 0.05)', type: 'dashed' }
      }
    },
    series: [
      {
        name: '算力负载',
        type: 'bar',
        barWidth: '35%',
        itemStyle: {
          borderRadius: 0, // 坚决保持硬朗直角
          borderWidth: 1.5,
          borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(18, 173, 253, 1.0)' },
            { offset: 1, color: 'rgba(85, 146, 247, 0.6)' }
          ]),
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(18, 173, 253, 0.65)' },
            { offset: 1, color: 'rgba(85, 146, 247, 0.15)' }
          ])
        },
        data: [120, 200, 150, 80, 170]
      }
    ]
  };
}
```
