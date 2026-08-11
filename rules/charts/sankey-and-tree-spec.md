# 桑基图 / 拓扑流向图防裁切配置规范 (Sankey & Topology Flow Spec)

本文件规定大屏 ECharts 场景下，桑基图 (Sankey)、树图 (Tree) 与关系流向图在非直角坐标系下的弹性布局边距、节点标签防裁切以及流向视觉沉浸感配置准则。

---

## 核心防裁切：从“硬编码 14%”到“弹性自适应模型”

### 1. 为什么不能盲目硬编码 `14%`？
- **超宽容器 (如 > 1200px)**：硬编码 14% 会留出 168px 以上的巨大空白，导致右侧视效“拔秃”、数据墨水比急剧下降。
- **狭窄容器 (如 < 400px)**：硬编码 14% 仅有 56px，长文本标签仍会被截断。
- **文本长度异构**：2 字标签与 8 字标签所需的右侧像素完全不同。

### 2. 三层渐进式防裁切策略 (3-Tier Anti-Clipping Strategy)

#### 策略 A：优先使用固定像素 `right: Px`（静态配置首选）
ECharts `series[0].right` 支持直接传入**数字像素值**（如 `right: 75`）。由于文字在特定字号下的像素宽度是固定的，使用固定像素比百分比更科学：
- **公式**：`right ≈ (字符数 × 单字宽 12px) + 间距 6px + 边缘缓冲 10px`
- **短标签 (2-3字)**：`right: 50`
- **中标签 (4-5字 - 默认推荐)**：`right: 75` 或 `'12%'`
- **长标签 (6字以上)**：`right: 110`，配合 `label.overflow: 'truncate'`

#### 策略 B：末端节点标签向内放置 (Label Position Inversion)
最优雅的解法是改变末端节点的标签方向：
- 对于最右侧（最后一层）节点，通过数据项单独指定 `label.position: 'left'`（将标签置于节点左侧/流向内部），此时 `right` 仅需保留 `3% ~ 5%`（约 `20px`）的节点空间即可。

#### 策略 C：动态计算公式 (Vue/React 运行时推荐)
```typescript
function getSankeyRightMargin(maxLabelLength: number, fontSize: number = 12): number {
  const estimatedTextWidth = maxLabelLength * fontSize;
  return estimatedTextWidth + 20; // 文本宽 + 20px 安全 padding
}
```

---

## 完整防裁切 ECharts 桑基图范例

```javascript
export function getPremiumSankeyOption(data) {
  // 假定最长标签为 5 个字
  const maxLabelLength = 5;
  const rightPadding = maxLabelLength * 12 + 20; // 约 80px 固定像素

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: [
      {
        type: 'sankey',
        left: '6%',
        right: rightPadding, // 使用固定像素值 80px，不随容器宽度变化失真！
        top: '10%',
        bottom: '10%',
        nodeWidth: 14,
        nodeGap: 20,
        draggable: false,
        emphasis: {
          focus: 'adjacency'
        },
        label: {
          color: '#cde1f8',
          fontSize: 12,
          fontFamily: 'D-DIN, DINPro-Medium, sans-serif',
          distance: 6,
          width: 90, // ECharts 官方 API 规约：必须配置 width，overflow 才能在文本超长时生效！
          overflow: 'break',
          ellipsis: '...'
        },

        lineStyle: {
          color: 'gradient',
          curveness: 0.5,
          opacity: 0.35
        },
        itemStyle: {
          borderWidth: 0,
          borderRadius: 2
        },
        data: data.nodes,
        links: data.links
      }
    ]
  };
}
```
