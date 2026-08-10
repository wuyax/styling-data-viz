# 通用图表基线配置规范 (Universal Baseline Spec)

本文件规定所有类型大屏 ECharts 图表通用的容器、坐标轴、网格、图例与提示框的工业级基线配置准则。任何图表应用本规范均可实现统一的高质感提升。

---

## 1. 容器与透明底 (`backgroundColor` & `grid`)

大屏空间宝贵，必须消除所有边框留白，且**强制背景透明**：

```javascript
backgroundColor: 'transparent', // 必须设为透明，融入大屏毛玻璃卡片
grid: {
  top: '15%',
  right: '4%',
  bottom: '8%',
  left: '4%',
  containLabel: true // 自动计算标签防止溢出
}
```

---

## 2. 轴线降噪与低噪网格 (`xAxis` & `yAxis`)

### X 轴 (分类/时间轴)
```javascript
xAxis: {
  type: 'category',
  boundaryGap: true, // 柱状图为 true，面积图为 false
  axisLine: {
    show: true,
    lineStyle: {
      color: 'rgba(205, 225, 248, 0.15)', // 暗色微亮轴线
      width: 1
    }
  },
  axisTick: { show: false }, // 隐藏短刻度线
  axisLabel: {
    color: '#8299b1',
    fontSize: 12,
    margin: 12
  },
  splitLine: { show: false } // 禁用 X 轴纵向网格线！
}
```

### Y 轴 (数值轴)
```javascript
yAxis: {
  type: 'value',
  axisLine: { show: false }, // 隐藏 Y 轴纵向边界线
  axisTick: { show: false },
  axisLabel: {
    color: '#8299b1',
    fontSize: 12,
    fontFamily: 'D-DIN, DINPro-Medium, monospace',
    formatter: (val) => {
      if (val >= 10000) return (val / 10000).toFixed(1) + 'w';
      return val;
    }
  },
  splitLine: {
    show: true,
    lineStyle: {
      color: 'rgba(205, 225, 248, 0.05)', // 超淡 5% 透明度横向辅助网格
      type: 'dashed'
    }
  }
}
```

---

## 3. 结构化图例 (`legend`)

微型精细化图标，避免传统巨大图例遮挡图表主体：

```javascript
legend: {
  show: true,
  icon: 'rect', // 首选 'rect' 或 'circle'
  itemWidth: 10,
  itemHeight: 10,
  itemGap: 16,
  top: '2%',
  right: '4%',
  textStyle: {
    color: '#cde1f8',
    fontSize: 12
  }
}
```

---

## 4. 毛玻璃提示框 (`tooltip`)

暗色高透卡片风格：

```javascript
tooltip: {
  trigger: 'axis',
  backgroundColor: 'rgba(5, 14, 23, 0.85)',
  borderColor: 'rgba(18, 173, 253, 0.4)',
  borderWidth: 1,
  padding: [10, 14],
  textStyle: {
    color: '#f0f0f0',
    fontSize: 13
  },
  extraCssText: 'backdrop-filter: blur(8px); box-shadow: 0 8px 32px rgba(0,0,0,0.5); border-radius: 6px;'
}
```
