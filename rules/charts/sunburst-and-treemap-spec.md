# 旭日图 / 矩形树图空间预算与标签防裁切规范 (Sunburst & Treemap Spec)

本文件规定大屏 ECharts 场景下，旭日图 (Sunburst)、矩形树图 (Treemap) 等多层级空间堆叠图表的半径预算、内/外侧标签排版与边界裁切防护机制。

---

## 核心空间预算与防裁切原则

### 1. 旭日图半径预算法则 (Sunburst Radius Budget)
- **外侧标签模式 (`label.position: 'outside'`)**：
  - 旭日图若在最外层渲染扇形标签且方向为放射状 (`rotate: 'radial'`)，外径必须限制在 **`radius: [0, '55%']`** 以内，给外侧标签留出至少 `45%` 的 Canvas 画布半径空间。
- **内侧标签模式 (`label.position: 'insidedark'` / `'inside'`)**：
  - 若标签居中渲染在扇区内部，外径可拓展至 **`radius: [0, '75%']`**。
  - 扇区角度过小（低于 `minAngle: 4`）时，强制配置 `label.show: false` 防止内侧标签相互挤压重叠。

### 2. 矩形树图边距与深层标签 (Treemap Margin & Level Specs)
- **边界留白**：配置 `leafDepth: 1` 或 `breadcrumb` 时，设置 `left: '6%', right: '6%', top: '10%', bottom: '8%'`。
- **矩形内标签剪裁**：声明 `label.overflow: 'truncate'`，避免文本超出小矩形边界线。

---

## 完整无裁切 ECharts 旭日图配置范例

```javascript
export function getPremiumSunburstOption(data) {
  return {
    backgroundColor: 'transparent',
    series: [
      {
        type: 'sunburst',
        center: ['50%', '50%'],
        radius: [0, '55%'], // 限制半径≤55%，预留45%空间防外侧标签裁切
        sort: undefined,
        emphasis: {
          focus: 'descendant'
        },
        levels: [
          {},
          {
            r0: '0%',
            r: '20%',
            label: { rotate: 'tangential', fontSize: 11 },
            itemStyle: { borderWidth: 1, borderColor: '#050e17' }
          },
          {
            r0: '20%',
            r: '40%',
            label: { rotate: 'tangential', fontSize: 10 },
            itemStyle: { borderWidth: 1, borderColor: '#050e17' }
          },
          {
            r0: '40%',
            r: '55%',
            label: {
              rotate: 'radial',
              fontSize: 10,
              minAngle: 4, // 小角度自动隐藏标签
              width: 60, // 官方 API 规约：必须指定 width，overflow: 'truncate' 才能生效
              overflow: 'truncate'
            },
            itemStyle: { borderWidth: 1, borderColor: '#050e17' }
          }

        ],
        data: data
      }
    ]
  };
}
```
