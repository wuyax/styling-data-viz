# 折柱混合双轴图规范 (Combo Line & Bar Dual Axis Chart Spec)

本文件规定大屏 ECharts 场景下，折柱混合双轴图的核心构建原则与网格防乱规则。

---

## 1. 核心约束与避坑法则

### 1. 单侧网格独占法则 (Single SplitLine Rule)
* **左轴独占网格**：**只有左侧 Y 轴允许开启横向网格线** `splitLine: { show: true, lineStyle: { color: 'rgba(255,255,255,0.05)', type: 'dashed' } }`。
* **右轴强制关闭网格**：**右侧 Y 轴必须强制设为 `splitLine: { show: false }`**。
* **规避双网格交织噩梦**：若左右两轴均开启网格线，由于左右两轴刻度刻度步长不一致，会导致两套网格线交织重叠、严重污染画面。

### 2. 坐标轴与图例绑定 (yAxisIndex Binding)
* 柱状图绑定 `yAxisIndex: 0`（左轴，通常为数值/金额量级）。
* 折线图绑定 `yAxisIndex: 1`（右轴，通常为百分比/同比增长率）。
* 图例显式设置为 `rect` 或 `circle` 微型图标，统一放置于 `top: '2%', right: '4%'`。

---

## 2. 完整无 Bug 配置代码范例

```typescript
import * as echarts from 'echarts';

export function getComboDualAxisOption() {
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(5, 14, 23, 0.85)',
      borderColor: 'rgba(18, 173, 253, 0.4)',
      textStyle: { color: '#f0f0f0' },
      axisPointer: { type: 'cross', crossStyle: { color: '#8299b1' } }
    },
    legend: {
      top: '2%',
      right: '4%',
      icon: 'rect',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: '#cde1f8', fontSize: 12 }
    },
    grid: { top: '18%', left: '4%', right: '4%', bottom: '8%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月'],
      axisLine: { lineStyle: { color: 'rgba(205, 225, 248, 0.15)' } },
      axisTick: { show: false },
      axisLabel: { color: '#8299b1', fontSize: 12 }
    },
    yAxis: [
      {
        type: 'value',
        name: '交易额(万元)',
        nameTextStyle: { color: '#8299b1', fontSize: 11 },
        axisLine: { show: false },
        axisLabel: { color: '#8299b1', fontSize: 12, fontFamily: 'D-DIN' },
        // 关键：左 Y 轴独占网格线
        splitLine: { lineStyle: { color: 'rgba(205, 225, 248, 0.05)', type: 'dashed' } }
      },
      {
        type: 'value',
        name: '同比增长(%)',
        nameTextStyle: { color: '#8299b1', fontSize: 11 },
        axisLine: { show: false },
        axisLabel: { color: '#8299b1', fontSize: 12, fontFamily: 'D-DIN', formatter: '{value}%' },
        // 关键：右 Y 轴绝对禁止开启网格线！
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: '交易额',
        type: 'bar',
        barWidth: '30%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#12adfd' },
            { offset: 1, color: 'rgba(18, 173, 253, 0.2)' }
          ])
        },
        data: [320, 450, 580, 690, 810, 950]
      },
      {
        name: '同比增长',
        type: 'line',
        yAxisIndex: 1, // 绑定右 Y 轴
        smooth: 0.35,
        showSymbol: false,
        lineStyle: { width: 2.5, color: '#18db6c' },
        itemStyle: { color: '#18db6c' },
        data: [12.5, 15.2, 18.9, 22.1, 25.4, 30.1]
      }
    ]
  };
}
```
