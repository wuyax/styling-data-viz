# ECharts 动画与视觉节奏规范 (Universal Animation & Rhythm Spec)

本文件规定大屏 ECharts 5 / 6+ 图表渲染动画的时长控制、物理缓动曲线、交错序列算法与常态微动呼吸规则。

---

## 1. 核心原则：明确区分【入场动画】与【常态巡航微动】

在多图表大屏（单屏 6 - 8 个面板）中，动画必须遵循**“入场干练利落，常态低频不夺目”**的原则：

| 动画类型 | 作用阶段 | 时长/周期规范 | 核心配置项 | 推荐值 |
|---|---|---|---|---|
| **首屏/加载入场动画** | 图表初始化渲染 | **800ms ~ 1200ms** (全屏严格 $\le 1.5\text{s}$) | `animationDuration`<br>`animationDelay` | `800ms`<br>`(idx) => idx * 35` |
| **数据动态更新** | 数据轮询 / 用户筛选 | **400ms ~ 600ms** (响应即时敏捷) | `animationDurationUpdate`<br>`animationEasingUpdate` | `500ms`<br>`'cubicInOut'` |
| **常态低频巡航/呼吸** | 入场完成后持续背景 | **3s ~ 6s** (低频低感，维持画面活性) | `rippleEffect.period`<br>`lines.effect.period`<br>`keyframeAnimation` | `3s ~ 4s`<br>`4s ~ 6s` |

---

## 2. 入场交错与物理缓动 (Staggered Entrance & Easing)

严禁所有数据柱或折线点无延时齐刷刷弹起。必须配置非线性缓动与基于索引的交错延时。

### 柱状图 / 散点图交错入场
```javascript
animation: true,
animationDuration: 800,        // 主入场时长 800ms
animationEasing: 'cubicOut',   // 减速缓降曲线，收尾干练
animationDelay: function (idx) {
  return idx * 35;             // 紧凑型微交错，10项仅增加 350ms
}
```

### 推荐物理缓动曲线
* **`cubicOut`**：默认推荐，极度平滑的减速曲线，稳重不张扬。
* **`backOut`**：带微弱冲过回弹效果，适用于机械柱图、仪表盘指针。
* **`elasticOut`**：带有阻尼弹性，适用于环形图/气泡图的高亮节点。

---

## 3. 常态低频巡航与呼吸微动 (Ambient Micro-Animations)

入场动画（< 1.5s）收尾后，通过特效图层赋予 Hero/重点图表低频呼吸感。

### 脉冲呼吸散点 (Effect Scatter)
```javascript
{
  type: 'effectScatter',
  coordinateSystem: 'cartesian2d',
  data: dataPoints,
  symbolSize: 8,
  rippleEffect: {
    brushType: 'stroke',
    scale: 3.5,
    period: 4                   // 4 秒低频扩散周期，不抢视线
  },
  itemStyle: { color: '#00f0ff', shadowBlur: 10, shadowColor: '#00f0ff' }
}
```
