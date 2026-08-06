# ECharts 5 / 6+ 大屏配置项最佳实践 (General ECharts Spec)

本文件规定大屏 ECharts 5 及 ECharts 6+ 各核心配置项（Grid, XAxis, YAxis, Tooltip, Legend, Series）的通用属性写法与跨风格最佳实践。

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
    show: false // 大屏推荐隐藏刻度短线
  },
  axisLabel: {
    color: 'inherit', // 继承 Theme 文本色
    fontSize: 12,
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
    color: 'inherit',
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
    fontSize: 12
  }
}
```

---

## 4. 提示框配置 (`tooltip`)

大屏 Tooltip 应采用暗色高透卡片风格：

```javascript
tooltip: {
  trigger: 'axis', // 'axis' | 'item'
  backgroundColor: 'rgba(5, 14, 23, 0.85)', // 深色半透明背景
  borderColor: 'rgba(18, 173, 253, 0.4)', // 微弱发光边框
  borderWidth: 1,
  padding: [10, 14],
  textStyle: {
    color: '#f0f0f0',
    fontSize: 13
  },
  extraCssText: 'backdrop-filter: blur(8px); box-shadow: 0 8px 32px rgba(0,0,0,0.5); border-radius: 6px;'
}
```

---

## 5. 系列数据配置 (`series`)

详细的特定风格填充 Gradient、Color 以及特效样式请参照 [`rules/styles/index.md`](../styles/index.md)。
