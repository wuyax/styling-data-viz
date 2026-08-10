# 地图与迁徙飞线图规范 (Map & Migration Flyline Spec)

本文件规定大屏 ECharts 场景下，2D/3D 地图与流光迁徙飞线图的核心构建原则与排版约束。

---

## 1. 核心约束与避坑法则

### 1. 暗色高发光陆块 (Dark Luminescent Geo Region Spec)
* **深色背景**：地图陆块背景统一使用深色半透明（如群青暗蓝 `rgba(10, 25, 47, 0.8)`，国风深墨绿 `#0a1d1a`）。
* **高发光描边**：边界必须配置清晰发光高亮描边 `borderColor`（如 `#12adfd` 或 `#30b596`），线宽 `borderWidth: 1 ~ 1.5`。
* **悬停高亮**：`emphasis.itemStyle.areaColor` 必须设为更高饱和度的亮色（如 `rgba(18, 173, 253, 0.6)`），并附带 `shadowBlur: 15` 外发光。

### 2. 迁徙流光飞线 (Flyline Trails Spec)
* **低频平滑穿梭**：飞线动画周期控制在 `lines.effect.period: 4 ~ 6s`，尾迹占比 `trailLength: 0.5 ~ 0.6`。
* **低饱和轨迹**：基础连线 `lineStyle.color` 保持极淡透明度（`rgba(18, 173, 253, 0.15)`），靠飞线头部点亮轨迹，严禁整条线刺眼死白。

### 3. 脉冲呼吸散点 (Effect Scatter Spec)
* 地图关键节点采用 `effectScatter` 叠加，`rippleEffect.period: 4` 低频扩散，散点大小控制在 `6 ~ 10px`。

---

## 2. 完整无 Bug 配置代码范例

```typescript
import * as echarts from 'echarts';

export function getTechMapFlylineOption(geoJsonName = 'china') {
  return {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item' },
    geo: {
      map: geoJsonName,
      roam: true,
      zoom: 1.1,
      label: { show: false },
      itemStyle: {
        areaColor: 'rgba(10, 25, 47, 0.8)',
        borderColor: 'rgba(18, 173, 253, 0.6)',
        borderWidth: 1.5,
        shadowColor: 'rgba(18, 173, 253, 0.3)',
        shadowBlur: 10
      },
      emphasis: {
        itemStyle: {
          areaColor: 'rgba(18, 173, 253, 0.4)',
          borderColor: '#00f0ff'
        }
      }
    },
    series: [
      {
        type: 'lines',
        coordinateSystem: 'geo',
        zlevel: 2,
        effect: {
          show: true,
          period: 5, // 5s 低频流光穿梭
          trailLength: 0.6,
          symbol: 'arrow',
          symbolSize: 5
        },
        lineStyle: {
          color: '#00f0ff',
          width: 1,
          opacity: 0.2,
          curveness: 0.2
        },
        data: [
          { coords: [[116.4074, 39.9042], [121.4737, 31.2304]] }, // 北京 -> 上海
          { coords: [[116.4074, 39.9042], [113.2644, 23.1291]] }  // 北京 -> 广州
        ]
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 3,
        rippleEffect: { brushType: 'stroke', scale: 3.5, period: 4 },
        itemStyle: { color: '#00f0ff', shadowBlur: 10, shadowColor: '#00f0ff' },
        data: [
          { name: '北京', value: [116.4074, 39.9042, 100] },
          { name: '上海', value: [121.4737, 31.2304, 85] }
        ]
      }
    ]
  };
}
```
