# 仪表盘、玉珏图与水球图规范 (Gauge, Multi-Ring & LiquidFill Spec)

本文件规定大屏 ECharts 场景下无针科技仪表盘 (Needleless Tech Gauge)、极坐标赛博玉珏图 (Polar Multi-Ring) 与水球图 (LiquidFill) 的核心构建原则、空间半径预算与完整配置代码。

---

## 1. 核心构建原则与空间预算 (Core Rules & Spatial Budget)

### 1.1 无针弧形进度仪表盘 (Needleless Arc Progress)
- **无针化视觉**：设置 `pointer: { show: false }`，彻底摒弃传统粗大指针，采用 `progress` 发光渐变圆弧表现进度。
- **居中 KPI 数值栈 (Center KPI Stack)**：
  - 数值 `detail` 使用 `D-DIN` 大号字体（28~34px），居中微调 `offsetCenter: [0, '-8%']`；
  - 标题 `title` 位于数值下方 `offsetCenter: [0, '28%']`。
- **空间半径与刻度防裁切预算 (Radius Budget)**：
  - **关闭刻度文字 (`axisLabel: { show: false }`)**：`center: ['50%', '55%']`, `radius: '78%'`；
  - **开启刻度文字 (`axisLabel: { show: true }`)**：刻度文字向外延伸 15px，`radius` 必须显式收缩至 **`68% ~ 70%`**，防止 0 与 100 刻度超出 Canvas 画布底部与侧边。

### 1.2 极坐标赛博玉珏图 (Polar Multi-Ring Gauge)
- 使用 `type: 'bar'` 配合 `coordinateSystem: 'polar'`（极坐标柱状图）或多 `series` 差异化 `radius` 实现多轨发光圆弧层叠。
- 物理开裂：设置 `roundCap: true` 实现端点精致圆润。

### 1.3 纯净化图例白名单 (Legend Whitelist)
- 任何使用 `gauge` 辅助刻度盘（如 `GaugeTicks`）的场景，必须在 `legend.data` 中显式指定业务系列名称，隔离辅助刻度层。

---

## 2. 完整无 Bug 终极配置范例

### 模式 A：科技无针弧形仪表盘 (Needleless Tech Gauge)

```javascript
import * as echarts from 'echarts';

export function getNeedlelessGaugeOption(title = '系统健康度', value = 92.4, showLabels = false) {
  // 开启刻度文字时，半径必须压缩至 68% 防裁切
  const radius = showLabels ? '68%' : '78%';

  return {
    backgroundColor: 'transparent',
    series: [
      {
        type: 'gauge',
        center: ['50%', '55%'],
        radius: radius,
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
              { offset: 0, color: '#38ef7d' },
              { offset: 0.7, color: '#00f2fe' },
              { offset: 1, color: '#a855f7' }
            ])
          }
        },
        pointer: { show: false }, // 无针化进度环
        axisLine: {
          lineStyle: {
            width: 10,
            color: [[1, 'rgba(205, 225, 248, 0.08)']]
          }
        },
        axisTick: {
          show: true,
          splitNumber: 5,
          length: 4,
          lineStyle: { color: 'rgba(205, 225, 248, 0.25)', width: 1 }
        },
        splitLine: {
          show: true,
          length: 8,
          lineStyle: { color: 'rgba(205, 225, 248, 0.45)', width: 1.5 }
        },
        axisLabel: {
          show: showLabels,
          distance: 14,
          color: '#8299b1',
          fontSize: 11,
          fontFamily: 'D-DIN, DINPro-Medium, monospace'
        },
        title: {
          show: true,
          offsetCenter: [0, '28%'],
          color: '#8299b1',
          fontSize: 13
        },
        detail: {
          valueAnimation: true,
          offsetCenter: [0, '-8%'],
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

### 模式 B：极坐标赛博玉珏图 (Polar Multi-Ring Arc Bar)

```javascript
export function getCyberMultiRingGaugeOption(data = [
  { name: 'GPU 负载', value: 85, color: '#00f2fe' },
  { name: '内存占用', value: 62, color: '#38ef7d' },
  { name: '磁盘 I/O', value: 45, color: '#ffb400' }
]) {
  return {
    backgroundColor: 'transparent',
    angleAxis: {
      max: 100,
      startAngle: 225,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false }
    },
    radiusAxis: {
      type: 'category',
      data: data.map(d => d.name),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false }
    },
    polar: {
      center: ['50%', '50%'],
      radius: ['30%', '80%']
    },
    series: [
      {
        type: 'bar',
        data: data.map(d => ({
          value: d.value,
          itemStyle: { color: d.color }
        })),
        coordinateSystem: 'polar',
        roundCap: true,
        barWidth: 10
      }
    ]
  };
}
```

### 模式 C：科技感水球图 (ECharts LiquidFill Spec)

> [!NOTE]
> 水球图需依赖 `echarts-liquidfill` 插件 (`type: 'liquidFill'`)。

```javascript
export function getTechLiquidFillOption(title = '水库蓄水量', value = 0.68) {
  return {
    backgroundColor: 'transparent',
    title: {
      text: title,
      left: 'center',
      bottom: '8%',
      textStyle: {
        color: '#8299b1',
        fontSize: 13,
        fontWeight: 'normal'
      }
    },
    series: [
      {
        type: 'liquidFill',
        radius: '72%',
        center: ['50%', '45%'],
        data: [value, value - 0.15], // 双重水波起伏
        color: ['rgba(18, 173, 253, 0.85)', 'rgba(0, 242, 254, 0.45)'],
        backgroundStyle: {
          color: 'rgba(5, 14, 23, 0.6)',
          borderWidth: 1,
          borderColor: 'rgba(18, 173, 253, 0.25)'
        },
        outline: {
          borderDistance: 4,
          itemStyle: {
            borderWidth: 2,
            borderColor: '#00f2fe',
            shadowBlur: 10,
            shadowColor: 'rgba(0, 242, 254, 0.5)'
          }
        },
        label: {
          fontSize: 30,
          fontFamily: 'D-DIN, DINPro-Medium, monospace',
          fontWeight: 'bold',
          color: '#ffffff',
          insideColor: '#ffffff'
        }
      }
    ]
  };
}
```

---

## 3. Agent 规则自检清单 (Completion Criteria)

编写或生成仪表盘配置前，必须完成以下核对：
1. [ ] 仪表盘是否配置了 `pointer: { show: false }` 实现现代化无针进度环？
2. [ ] 是否已核查 `axisLabel` 开启状态？若开启刻度文字，`radius` 是否已收缩至 `≤ 70%`？
3. [ ] 居中 `detail` 与 `title` 的 `offsetCenter` 是否配置了适当的 Y 轴相对位移，防止与底端弧线错位？
4. [ ] 若使用 `liquidFill` 水球图，`radius` 是否控制在 `72%` 以内并包含背景轨底座？
