# 折线图与渐变面积图规范 (Line & Area Chart Spec)

本文件规定大屏 ECharts 场景下，折线图与渐变云雾面积图的核心构建原则与排版约束。

---

## 1. 核心约束与避坑法则

### 1. 曲线平滑度 (Smooth Curve Spec)
* **平滑系数**：大屏折线图建议配置 `smooth: 0.35` 柔和曲线，赋予数据平滑流动的科技质感。
* **避免笨重硬折角**：避免使用默认的锯齿硬硬尖角折线（除非极特殊的阶梯折线图需求）。

### 2. 节点标记隐藏 (Symbol Hiding Spec)
* **默认隐藏数据点**：为了保持高数据墨水比 (Data-Ink Ratio)，折线序列默认必须配置 **`showSymbol: false`**。
* **悬停聚焦显示**：仅在鼠标 Hover 悬停时通过 Tooltip 和高亮状态触发节点 Marker，严禁全图铺满密密麻麻的硬圆点。

### 3. 渐变云雾面积填充 (Gradient Cloud Area Spec)
* **云雾衰减渐变**：面积图必须使用 `areaStyle` 叠加 `LinearGradient` 线性渐变（顶部发光高亮透明度 25%~40%，向下平滑衰减至 `0%` 完全透明）。
* **严禁纯实色填充**：坚决禁止使用平涂实色面积填充，防止遮挡背景卡片与坐标网格。

---

## 2. 完整无 Bug 配置代码范例

```typescript
import * as echarts from 'echarts';

export function getTechAreaLineOption() {
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(5, 14, 23, 0.85)',
      borderColor: 'rgba(18, 173, 253, 0.4)',
      textStyle: { color: '#f0f0f0' }
    },
    grid: {
      top: '15%',
      right: '4%',
      bottom: '8%',
      left: '4%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false, // 面积图靠边紧贴
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
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
        name: '实时流量',
        type: 'line',
        smooth: 0.35,
        showSymbol: false,
        lineStyle: { width: 2.5, color: '#12adfd' },
        itemStyle: { color: '#12adfd' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(18, 173, 253, 0.35)' },
            { offset: 1, color: 'rgba(18, 173, 253, 0.00)' }
          ])
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      }
    ]
  };
}
```
