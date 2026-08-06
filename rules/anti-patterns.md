# 大屏图表踩坑清单与反模式 (Anti-Patterns Heuristics)

编写大屏 ECharts 配置时，务必警惕并自动修正以下常见“视觉垃圾”与错误实践：

---

## 1. 常见错误与修正对览

| 踩坑/反模式 (Anti-Pattern) | 产生后果 | 正确规范写法 (Fix) |
|---|---|---|
| **黑硬底背景** `backgroundColor: '#000000'` | 产生突兀黑块，无法融合大屏卡片 | 统一设为 `backgroundColor: 'transparent'` |
| **强网格杂线** 默认白/灰色粗网格线 | 视觉极其混乱，干扰数据本身 | 隐藏 Y 轴线，网格线设为 `rgba(255, 255, 255, 0.05)` |
| **四周边框全显** 包含 Top/Right 边框 | 极其落后老套的传统报表样式 | 关闭顶部与右侧轴线及刻度：`show: false` |
| **刺眼霓虹高频流光** | 极易引起视觉疲劳，显得廉价 | 使用平滑低饱和渐变（15% → 0.5% 透明度） |
| **纯白/纯黑色文字** `#ffffff` / `#000000` | 对比度过猛，刺眼或看不清 | 辅助字用高雅中灰 `#94a3b8`，主高亮用 `#f8fafc` |
| **巨大的 Legend 遮挡** 位于图表正中 | 占据极大部分可视空间 | 移至 `top: '2%', right: '4%'`，字号 `12px` |
| **3D 饼图 / 饼图切片过多** (> 5 块) | 视角失真，数据难以精确读出 | 替换为极简环形图 `radius: ['55%', '75%']` 或条形图 |
| **硬编码固定 PX 布局** 缺乏 containLabel | 大屏缩放时文本切断被遮挡 | 设置 `containLabel: true` 并使用动态 fitPx |
| **双 Y 轴网格线交织** 左右 Y 轴均开启 splitLine | 两套网格线错位网格线叠加 | **只保留左 Y 轴**的 `splitLine`，右 Y 轴设为 `show: false` |
| **无数据/空数据崩溃** 未设置默认空状态 | 页面显示空白框或报错 | 配置 `noData` 占位或设置默认初始 `[]` 数据 |

---

## 2. 代码级别反模式自动检测规约

在审查或生成代码时，如检测到以下代码模式，必须按一键修复规则重构：

### 反模式 1: 缺少 `containLabel`
```javascript
// ❌ 错误代码
grid: { left: 10, top: 20 }

// ✅ 修正后代码
grid: { left: '4%', right: '4%', top: '15%', bottom: '5%', containLabel: true }
```

### 反模式 2: 双 Y 轴导致网格乱交织
```javascript
// ❌ 错误代码
yAxis: [
  { type: 'value', splitLine: { show: true } },
  { type: 'value', splitLine: { show: true } } // 导致双网格线重叠错乱！
]

// ✅ 修正后代码
yAxis: [
  { type: 'value', splitLine: { show: true, lineStyle: { color: 'rgba(255,255,255,0.05)' } } },
  { type: 'value', splitLine: { show: false } } // 右轴绝对关闭网格
]
```

### 反模式 3: 默认硬线条折线图
```javascript
// ❌ 错误代码
series: [{ type: 'line', data: [...] }] // 笨重硬折线 + 突出节点

// ✅ 修正后代码
series: [{
  type: 'line',
  smooth: 0.35,
  showSymbol: false,
  lineStyle: { width: 2.5, color: '#00f2fe' },
  areaStyle: {
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: 'rgba(0, 242, 254, 0.25)' },
      { offset: 1, color: 'rgba(0, 242, 254, 0.00)' }
    ])
  }
}]
```
