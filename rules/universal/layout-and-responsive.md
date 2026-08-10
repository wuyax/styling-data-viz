# 容器自适应与响应式排版规范 (Universal Layout & Responsive Spec)

本文件规定大屏 ECharts 容器尺寸监听、动态字号 fitPx 计算与 Vue/React 响应式集成最佳实践。

---

## 1. ResizeObserver 动态防抖监听

坚决禁止硬编码固定 PX 布局，必须使用 `ResizeObserver` 防抖监听 DOM 容器变化：

```typescript
import { onMounted, onUnmounted, ref } from 'vue';
import * as echarts from 'echarts';

export function useEChartsResize(chartRef: any, getOption: () => any) {
  let chartInstance: echarts.ECharts | null = null;
  let resizeObserver: ResizeObserver | null = null;

  onMounted(() => {
    if (!chartRef.value) return;
    chartInstance = echarts.init(chartRef.value);
    chartInstance.setOption(getOption());

    // 绑定 ResizeObserver
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

---

## 2. 动态 fitPx 相对计算公式

对于基础分辨率 $1920 \times 1080$ 的设计稿，在缩放至 $4\text{K}$ 或小屏时，字号与图标尺寸应使用基准缩放比例：

```javascript
function fitPx(sizeIn1920, currentContainerWidth) {
  const scale = currentContainerWidth / 1920;
  return Math.round(sizeIn1920 * scale);
}
```
