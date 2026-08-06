# ECharts 5 / 6+ 大屏配置项最佳实践 (ECharts Spec)

本文件规定大屏 ECharts 5 及 ECharts 6+ 各核心配置项（Grid, XAxis, YAxis, Tooltip, Legend, Series）的具体属性写法与兼容规范。

---

## 1. 容器与 Grid 布局 (`grid`)

大屏空间宝贵，`grid` 边距必须精确设置，避免默认值导致的超大白边：

```javascript
grid: {
  top: '15%',
  right: '4%',
  bottom: '8%',
  left: '4%',
  containLabel: true // 自动计算坐标轴标签防止溢出
}
```

---

## 2. 坐标轴配置 (`xAxis` & `yAxis`)

### X 轴 (分类/时间轴)
```javascript
xAxis: {
  type: 'category', // 或 'time'
  boundaryGap: true, // 柱状图为 true，折线面积图视情况可设为 false
  axisLine: {
    show: true,
    lineStyle: {
      color: 'rgba(205, 225, 248, 0.15)', // 暗色微亮轴线
      width: 1
    }
  },
  axisTick: {
    show: false // 大屏推荐隐藏笨重的刻度短线
  },
  axisLabel: {
    color: '#8299b1', // 柔和中灰色
    fontSize: 12,
    fontFamily: 'Source Han Sans SC, PingFang SC, sans-serif',
    margin: 12
  },
  splitLine: {
    show: false // 禁用 X 轴纵向网格线！
  }
}
```

### Y 轴 (数值轴)
```javascript
yAxis: {
  type: 'value',
  axisLine: {
    show: false // 隐藏 Y 轴纵向边界线
  },
  axisTick: {
    show: false
  },
  axisLabel: {
    color: '#8299b1',
    fontSize: 12,
    fontFamily: 'D-DIN, Roboto, monospace',
    formatter: (val) => {
      if (val >= 10000) return (val / 10000).toFixed(1) + 'w';
      return val;
    }
  },
  splitLine: {
    show: true,
    lineStyle: {
      color: 'rgba(205, 225, 248, 0.05)', // 超淡横向辅助网格
      type: 'dashed'
    }
  }
}
```

---

## 3. 图例配置 (`legend`)

```javascript
legend: {
  show: true, // 单系列设为 false
  icon: 'rect', // 'circle' | 'rect' | 'roundRect'
  itemWidth: 10,
  itemHeight: 10,
  itemGap: 16,
  top: '2%',
  right: '4%',
  textStyle: {
    color: '#8299b1',
    fontSize: 12,
    fontFamily: 'Source Han Sans SC, sans-serif'
  }
}
```

---

## 4. 提示框配置 (`tooltip`)

大屏 Tooltip 应采用暗色高透科技卡片风格：

```javascript
tooltip: {
  trigger: 'axis', // 'axis' | 'item'
  backgroundColor: 'rgba(5, 14, 23, 0.85)', // 深色半透明背景
  borderColor: 'rgba(18, 173, 253, 0.4)', // 微弱科技蓝边框
  borderWidth: 1,
  padding: [10, 14],
  textStyle: {
    color: '#f0f0f0',
    fontSize: 13
  },
  extraCssText: 'backdrop-filter: blur(8px); box-shadow: 0 8px 32px rgba(0,0,0,0.5); border-radius: 6px;',
  axisPointer: {
    type: 'line',
    lineStyle: {
      color: 'rgba(18, 173, 253, 0.5)',
      type: 'dashed'
    }
  }
}
```

---

## 5. 系列数据配置 (`series`)

### A. 折线图 / 渐变面积图 (Line / Area)
```javascript
series: [{
  name: '实时流量',
  type: 'line',
  smooth: 0.35, // 适当平滑
  symbol: 'circle',
  symbolSize: 6,
  showSymbol: false, // 默认隐藏节点，hover 时显示
  itemStyle: {
    color: '#12adfd',
    borderColor: '#ffffff',
    borderWidth: 2
  },
  lineStyle: {
    width: 2.5,
    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      { offset: 0, color: '#11c3dd' },
      { offset: 1, color: '#12adfd' }
    ]),
    shadowColor: 'rgba(18, 173, 253, 0.4)',
    shadowBlur: 10
  },
  areaStyle: {
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: 'rgba(18, 173, 253, 0.22)' },
      { offset: 1, color: 'rgba(18, 173, 253, 0.00)' }
    ])
  }
}]
```

### B. 胶囊柱状图 (Bar)
```javascript
series: [{
  name: '销售额',
  type: 'bar',
  barWidth: '28%',
  showBackground: true,
  backgroundStyle: {
    color: 'rgba(205, 225, 248, 0.03)', // 底槽背景
    borderRadius: [4, 4, 0, 0]
  },
  itemStyle: {
    borderRadius: [4, 4, 0, 0], // 圆角顶部
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#12adfd' },
      { offset: 1, color: '#11c3dd' }
    ])
  },
  label: {
    show: true,
    position: 'top',
    color: '#cde1f8',
    fontSize: 12,
    fontFamily: 'D-DIN Bold, monospace'
  }
}]
```

### C. 切口环形 KPI 图 (Doughnut)
```javascript
series: [{
  name: '占比分析',
  type: 'pie',
  radius: ['58%', '76%'],
  center: ['50%', '48%'],
  avoidLabelOverlap: true,
  itemStyle: {
    borderRadius: 4,
    borderColor: '#050e17', // 切口缝隙
    borderWidth: 3
  },
  label: { show: false },
  data: [
    { value: 35.8, name: 'IT 服务', itemStyle: { color: '#12adfd' } },
    { value: 28.8, name: '云计算', itemStyle: { color: '#11c3dd' } },
    { value: 26.8, name: '大数据', itemStyle: { color: '#e68513' } },
    { value: 15.8, name: '物联网', itemStyle: { color: '#5592f7' } }
  ]
}]
```
