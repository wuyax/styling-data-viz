# 饼图 / 环形图高级感配置规范 (Premium Donut / Pie Chart Spec)

本文件规定大屏 ECharts 场景下，高级感科技/国风/赛博环形图与饼图的核心构建原则、几何防碰撞算法与标准配置模版。

---

## 八大高级感与避坑原则

### 1. 布局与坐标联动原则 (Unified CenterX & Responsive Layout)
- **避免光晕与标题偏离**：
  - 当图表右侧包含纵向图例 (Legend) 时，主饼图中心必须向左偏移至 **`center: ['32%', '50%']`**。
  - **关键：`title.left` 与 `graphic.position` 必须强制联动设为相同的 `centerX`（如 `'32%'`）**，绝对不能留默认的 Canvas 中心 `'50%'`，否则光晕和标题会严重右偏错位。
- **动态防重叠与标签安全半径 (Radius & Label Safety Budget)**：
  - **启用外侧标签 (`label.position: 'outer'` 或 `'outside'`) 时**：外径上限必须强制限制在 **`radius: ['35%', '52%']`** 以内！
  - **官方 `alignTo` 与 `labelLayout` 防重叠机制**：配置 `label: { alignTo: 'edge', minMargin: 5 }` 对齐画布边缘，配合 `labelLayout: { hideOverlap: true, moveOverlap: 'shiftY' }` 自动做 Y 轴错位偏移，防止密集扇区标签相互盖叠！
  - 无图例且关闭外侧标签时：`radius: ['60%', '71%']`, `center: ['50%', '50%']`；
  - **有右侧图例且关闭外侧标签时**：`radius` 必须等比收缩至 **`['44%', '55%']`** 或 **`['54%', '65%']`**，`center: ['32%', '50%']`，确保右侧留出 35%~40% 的安全宽度防止碰撞。



### 2. 双同心轨迹线与无遮挡透出 (Exposed Double Track Rings)
- **物理开裂与底线透出**：
  - 底层暗轨外延配置，推荐使用**“内外双极微同心线”**：
    * **内同心轨迹线**：`radius: ['52%', '52.5%']`，`color: 'rgba(18, 173, 253, 0.25)'`；
    * **外同心轨迹线**：`radius: ['66.5%', '67%']`，`color: 'rgba(18, 173, 253, 0.25)'`；
  - 主切片位于 `['54%', '65%']` 中间，切片物理断开处完美露出内外双同心线，立体空间感极强。

### 3. 工业级密集刻度盘 (Industrial Gauge Ticks Ring)
- **增加刻度硬朗感**：
  - 刻度线长度设为 **`axisTick.length: 7 ~ 9`**，线宽 `width: 1.5`，分段 `splitNumber: 60 ~ 80`；
  - **图例防污染**：`legend.data` 显式声明业务系列名称列表，保持辅助图层独立。

### 4. 极微倒角与精细环厚 (Micro Radius & Thin Ring)
- **物理断开 (Pad Angle)**：扇区切片配置 **`padAngle: 5 ~ 8`**。
- **极微倒角 (Micro Radius)**：切面控制为 **`borderRadius: 1 ~ 3`（推荐 `2`）**，保持精细几何倒角。
- **精致环厚 (Ring Thickness)**：外径与内径差值控制在 **`10% ~ 12%`**。

### 5. 中心玻璃质感底罩 (Glassmorphic Center Base)
- 中心叠加 `RadialGradient` 半透明发光底罩与大号 `D-DIN` 等宽数值（如 `88.4%`）。

### 6. 三层结构化引导标签 (3-Tier Rich Format Labels)
- 引导线采用极简 L 型/折线；标签配置 `{title|指标名称}\n{percent|百分比%} {val|绝对数值}`。

### 7. 动态交互与悬停高亮
- 配置 `hoverAnimation: true` 与 `hoverOffset: 6`，悬停时微弱外扩提升交互感。

### 8. 左右布局绝对防重叠通用计算器 (computePieLegendLayout)
- 容器宽度 $< 360\text{px}$ 时降级为上下布局或仅保留 Center Title。

---

## 完整无 Bug 终极 ECharts 配置范例

```javascript
import * as echarts from 'echarts';

export function getPremiumDonutOption(data) {
  const businessData = data || [
    { value: 42.5, name: 'GPU 算力池' },
    { value: 26.3, name: 'NVMe 存储网' },
    { value: 18.2, name: '云边计算节点' },
    { value: 13.0, name: '异构加速卡' }
  ];

  const hasLegend = true;
  const centerX = hasLegend ? '32%' : '50%';
  const legendNames = businessData.map(d => d.name);

  return {
    backgroundColor: 'transparent',
    
    legend: {
      show: hasLegend,
      data: legendNames, // 只过滤真实业务名称
      orient: 'vertical',
      right: '6%',
      top: 'center',
      icon: 'rect',
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 16,
      textStyle: {
        color: 'rgba(205, 225, 248, 0.85)',
        fontSize: 13,
        rich: {
          name: { width: 85, fontSize: 13, color: 'rgba(205, 225, 248, 0.75)' },
          percent: {
            width: 55,
            fontSize: 15,
            fontWeight: 'bold',
            color: '#ffffff',
            fontFamily: 'D-DIN, DINPro-Medium, monospace',
            align: 'right'
          }
        }
      },
      formatter: name => {
        const item = businessData.find(d => d.name === name) || { value: 0 };
        const total = businessData.reduce((sum, d) => sum + d.value, 0);
        const percent = total > 0 ? ((item.value / total) * 100).toFixed(1) + '%' : '0%';
        return `{name|${name}} {percent|${percent}}`;
      }
    },

    title: {
      text: '88.4%\n{sub|集群负载}',
      left: centerX,
      top: '44%',
      textAlign: 'center',
      textStyle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: 'D-DIN, DINPro-Medium, monospace',
        lineHeight: 28,
        rich: {
          sub: {
            fontSize: 12,
            color: 'rgba(205, 225, 248, 0.65)',
            fontWeight: 'normal',
            padding: [6, 0, 0, 0]
          }
        }
      }
    },

    graphic: {
      elements: [
        {
          type: 'circle',
          shape: { cx: 0, cy: 0, r: 56 },
          position: [centerX, '50%'],
          style: {
            fill: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
              { offset: 0, color: 'rgba(18, 173, 253, 0.28)' },
              { offset: 0.75, color: 'rgba(18, 173, 253, 0.06)' },
              { offset: 1, color: 'rgba(18, 173, 253, 0.0)' }
            ])
          }
        }
      ]
    },

    series: [
      {
        name: 'InnerTrack',
        type: 'pie',
        radius: ['52%', '52.5%'],
        center: [centerX, '50%'],
        silent: true,
        label: { show: false },
        data: [{ value: 1, itemStyle: { color: 'rgba(18, 173, 253, 0.25)' } }]
      },
      {
        name: 'OuterTrack',
        type: 'pie',
        radius: ['66.5%', '67%'],
        center: [centerX, '50%'],
        silent: true,
        label: { show: false },
        data: [{ value: 1, itemStyle: { color: 'rgba(18, 173, 253, 0.25)' } }]
      },
      {
        name: 'GaugeTicks',
        type: 'gauge',
        radius: '49%',
        center: [centerX, '50%'],
        startAngle: 0,
        endAngle: 360,
        splitNumber: 60,
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        axisTick: {
          show: true,
          length: 8,
          lineStyle: { color: 'rgba(18, 173, 253, 0.45)', width: 1.5 }
        },
        pointer: { show: false },
        detail: { show: false }
      },
      {
        name: 'MainPie',
        type: 'pie',
        radius: ['54%', '65%'],
        center: [centerX, '50%'],
        padAngle: 6,
        itemStyle: { borderRadius: 2 },
        label: { show: false },
        data: businessData.map((d, index) => {
          const colors = [
            ['#00f0ff', '#0072ff'],
            ['#2b86ff', '#0c3cb7'],
            ['#ffb400', '#ff5500'],
            ['#00e676', '#00897b']
          ];
          const colorPair = colors[index % colors.length];
          return {
            ...d,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                { offset: 0, color: colorPair[0] },
                { offset: 1, color: colorPair[1] }
              ]),
              shadowBlur: 10,
              shadowColor: `${colorPair[0]}66`
            }
          };
        })
      }
    ]
  };
}
```
