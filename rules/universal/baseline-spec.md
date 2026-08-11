# 通用图表基线配置规范 (Universal Baseline Spec)

本文件规定所有类型大屏 ECharts 图表通用的容器、坐标轴、网格、排版、响应式与图例提示框的工业级基线配置准则。任何图表应用本规范均可实现统一的高质感提升。

---

## 1. 容器与透明底 (`backgroundColor` & `grid`)

大屏空间宝贵，必须消除所有边框留白，且**强制背景透明**：

### 1.1 直角坐标系图表 (Cartesian Grid: 柱图/折线/散点/双轴)
```javascript
backgroundColor: 'transparent', // 透明融入大屏毛玻璃卡片
grid: {
  top: '15%',
  right: '4%',
  bottom: '8%',
  left: '4%',
  containLabel: true // 自动计算标签防止溢出（仅对直角坐标系生效！）
}
```

### 1.2 非直角坐标系图表 (Non-Grid: 桑基/饼图/旭日图/树图/漏斗)
> [!IMPORTANT]
> **1. ECharts 的 `grid.containLabel` 对非直角坐标系完全无效**：非直角图表必须依靠 `series` 的空间预算法则与边界留白：
> - **流向/拓扑图 (Sankey / Tree)**：使用固定像素 `series[0].right: (字数 × 12px) + 20px`（约 `60~80px`），或将末端节点标签向内对齐 (`position: 'left'`)。
> - **空间/极坐标图 (Pie / Sunburst)**：外侧 label 模式下外径上限 `radius ≤ 55%`；开启 `alignTo: 'edge'` 或 `labelLayout: { hideOverlap: true, moveOverlap: 'shiftY' }` 防撞。
> 
> **2. 官方 `label.overflow` 防裁切先决条件**：
> - 根据 ECharts 官方 API 手册，开启 `overflow: 'truncate'` 或 `'break'` 时，**必须同时显示指定 `width` 属性**（如 `width: 90`），否则 ECharts 无法确定裁切边界而直接忽略 `overflow`！

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
  splitLine: { show: false } // 降噪：X 轴纵向网格线设为 false
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

## 3. 数字与排版规范 (Universal Typography & Numbers Spec)

### 3.1 等宽数字规范 (Tabular Numbers Spec)
在大屏动态更新或多列图例/Tooltip 对齐场景中，推荐配置等宽字体防对齐错位：

* **等宽数字字体**：所有 KPI 大字、Y 轴刻度、图例百分比、Tooltip 绝对数值统一配置：
  ```javascript
  fontFamily: 'D-DIN, DINPro-Medium, Roboto, monospace',
  fontFeatureSettings: '"tnum"'
  ```
* **百分比与小数精度**：大屏百分比保留 1 位小数（如 `88.4%`）；金额大字配置万/亿单位缩写格式化。

### 3.2 三大风格标题字体映射 (Title Typography Mapping)
根据当前匹配的视觉风格使用对应的标题字体栈：

| 风格 Token | 风格名称 | 标题字体栈 (Title Font Family) | 风格意境 |
|---|---|---|---|
| `qunqing` | **「群青」科技暗蓝** | `抖音美好体, "PingFang SC", "Microsoft YaHei", sans-serif` | 现代科技黑体/硬朗高对比 |
| `guofeng` | **「国风」水墨青绿** | `"KaiTi", "楷体", "STKaiti", "Source Han Serif SC", "思源宋体", serif` | 古典楷体/宋体韵味 |
| `huanzi` | **「幻紫」赛博霓虹** | `"优设标题黑", "YouSheTitleBlack", "PingFang SC", sans-serif` | 赛博机甲/未来沉浸 |

### 3.3 字阶与字重体系 (Font Hierarchy)
```css
--font-size-kpi: 32px ~ 40px;   /* 核心 KPI 大数字 */
--font-size-title-1: 24px;       /* 卡片主标题 */
--font-size-title-2: 18px ~ 20px;/* 分组次标题 */
--font-size-body: 14px;          /* 正文与重要 Tooltip */
--font-size-caption: 12px;       /* 坐标轴刻度与图例说明 */
```

---

## 4. 结构化图例 (`legend`)

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

## 5. 毛玻璃提示框 (`tooltip`)

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

---

## 6. 容器自适应与响应式排版 (Layout & Responsive Spec)

### 6.1 ResizeObserver 动态防抖监听
使用 `ResizeObserver` 防抖监听 DOM 容器变化：

```typescript
import { onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

export function useEChartsResize(chartRef: any, getOption: () => any) {
  let chartInstance: echarts.ECharts | null = null;
  let resizeObserver: ResizeObserver | null = null;

  onMounted(() => {
    if (!chartRef.value) return;
    chartInstance = echarts.init(chartRef.value);
    chartInstance.setOption(getOption());

    let timer: any = null;
    resizeObserver = new ResizeObserver(() => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        chartInstance?.resize();
      }, 100);
    });
    resizeObserver.observe(chartRef.value);
  });

  onUnmounted(() => {
    resizeObserver?.disconnect();
    chartInstance?.dispose();
  });
}
```

### 6.2 动态 fitPx 相对计算公式
对于基础分辨率 $1920 \times 1080$ 的设计稿，在缩放至 $4\text{K}$ 或小屏时，字号与图标尺寸应使用基准缩放比例：

```javascript
function fitPx(sizeIn1920, currentContainerWidth) {
  const scale = currentContainerWidth / 1920;
  return Math.round(sizeIn1920 * scale);
}
```

---

## 7. 通用正向基线自检对照表 (Universal Baseline Checklist)

编写或审查大屏 ECharts 配置时，务必对照下表进行正向基线自检：

| 检查维度 | 视觉目标 | 正向 Leading 规范与标准写法 (Fix) |
|---|---|---|
| **容器融合度** | 融入玻璃卡片 | **透明融入容器**：统一设置 `backgroundColor: 'transparent'` |
| **轴线与网格** | 界面降噪 | **低噪降噪轴线**：隐藏 Y 轴线，横向网格设为 `rgba(205, 225, 248, 0.05)` 超淡虚线，`xAxis.splitLine.show: false` |
| **图例占用** | 不遮挡主体 | **精细图例布局**：移至 `top: '2%', right: '4%'`，图标设为 `10px`，字号 `12px` |
| **柱体切面几何** | 科技切面质感 | **直角切面法则**：默认保持 `borderRadius: 0`，若需要微弱软化，上限为 `borderRadius ≤ 1` |
| **扇区与倒角** | 物理开裂立体感 | **物理开裂与极微倒角**：配置 `padAngle: 5 ~ 8` 物理开裂与极微倒角 `borderRadius: 1 ~ 3` |
| **双 Y 轴网格** | 避免网格错位 | **单侧网格独占**：只保留左 Y 轴 `splitLine`，右 Y 轴 `splitLine: { show: false }` |
| **色彩质感** | 渐变发光 | **渐变衰减质感**：配置 `LinearGradient` 顶部高亮与底部衰减 |
| **直角坐标自适应** | 标签不溢出 | **直角容器约束**：直角坐标系声明 `grid.containLabel = true` |
| **非直角坐标标签** | 标签防裁切碰撞 | **空间预算与弹性留白**：非直角坐标系 `containLabel` 失效；桑基图按 `(字数×12px)+20px` 显式设置固定像素 `right`（约 75px）或反转末端标签；开启外侧 label 时饼/旭日图外径上限 `radius ≤ 55%` |
