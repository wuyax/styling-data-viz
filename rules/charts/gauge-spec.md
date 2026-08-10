# 仪表盘、水球图与玉珏图规范 (Gauge, Liquid & Multi-Ring Spec)

本文件规定大屏 ECharts 场景下，科技大屏仪表盘、水球图与赛博玉珏图的核心构建原则与排版约束。

---

## 1. 核心约束与避坑法则

### 1. 现代化无针仪表盘 (Needleless Tech Gauge)
* **隐藏传统粗指针**：传统仪表盘粗大指针极其占用空间且审美陈旧。大屏仪表盘必须配置 **`pointer: { show: false }`**。
* **渐变圆弧进度条**：使用 `progress` 开启圆弧进度填充（`width: 10 ~ 12`），配置 `LinearGradient` 渐变发光色。
* **居中 KPI 数字与标题**：在仪表盘正中心（`detail` / `title`）展示 `D-DIN` 32px 大号百分比数值与次级说明文字。

### 2. 刻度盘图层独立 (Gauge Ticks Sub-layer)
* 可将 `GaugeTicks` 作为独立系列放置于环形图/仪表盘下方，配置 `splitNumber: 60`, `axisTick.length: 8`, `width: 1.5` 增强科技机械刻度质感。
* **防图例污染**：任何使用 `gauge` 作为辅助刻度盘的场景，必须在 `legend.data` 中显式剔除 `GaugeTicks`。

### 3. 玉珏图 / 多层嵌套发光环形图 (Multi-Ring Gauge)
* 在「幻紫」赛博风格中，使用多层渐变发光圆弧层叠（电光蓝 `#61a4ff`、霓虹粉 `#d8a6ff`、暖亮金 `#ffde8d`），通过不同半径（`radius: ['80%', '85%']`, `['65%', '70%']`）呈现多维占比。

---

## 2. 完整无 Bug 配置代码范例

```typescript
import * as echarts from 'echarts';

export function getTechGaugeOption(title = '系统健康度', value = 92.4) {
  return {
    backgroundColor: 'transparent',
    series: [
      {
        type: 'gauge',
        center: ['50%', '55%'],
        radius: '80%',
        startAngle: 210,
        endAngle: -30,
        min: 0,
        max: 100,
        splitNumber: 10,
        progress: {
          show: true,
          width: 10,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#18db6c' },
              { offset: 0.7, color: '#12adfd' },
              { offset: 1, color: '#a855f7' }
            ])
          }
        },
        pointer: { show: false }, // 隐藏粗指针
        axisLine: {
          lineStyle: { width: 10, color: [[1, 'rgba(255, 255, 255, 0.08)']] }
        },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        anchor: { show: false },
        title: {
          offsetCenter: [0, '30%'],
          color: '#8299b1',
          fontSize: 13
        },
        detail: {
          valueAnimation: true,
          offsetCenter: [0, '-5%'],
          fontSize: 32,
          fontWeight: 'bold',
          fontFamily: 'D-DIN, DINPro-Medium, monospace',
          color: '#f0f0f0',
          formatter: '{value}%'
        },
        data: [{ value: value, name: title }]
      }
    ]
  };
}
```
