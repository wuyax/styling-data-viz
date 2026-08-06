# 大屏容器适配与自适应响应式规范 (Layout & Responsive)

数据可视化大屏经常在不同的屏幕分辨率（如 1920x1080, 2560x1440, 3840x2160 4K 甚至拼接超宽屏）下展示。ECharts 必须与 DOM 容器完美绑定，实现高精度的动态缩放。

---

## 1. 大屏自适应通用逻辑 (ResizeObserver)

仅使用 `window.addEventListener('resize')` 无法捕获由于网格布局、侧边栏展开或缩放导致的 DOM 容器尺寸变更。大屏开发推荐采用 `ResizeObserver`：

```javascript
/**
 * 绑定 ECharts 实例与容器 ResizeObserver
 * @param {HTMLElement} domContainer 
 * @param {EChartsInstance} chartInstance 
 */
function bindChartResize(domContainer, chartInstance) {
  if (!domContainer || !chartInstance) return;

  // 使用 ResizeObserver 监听 DOM 容器实际尺寸变化
  const resizeObserver = new ResizeObserver(() => {
    // 延迟或直接调用 chart.resize()
    chartInstance.resize({
      animation: {
        duration: 300,
        easing: 'cubicOut'
      }
    });
  });

  resizeObserver.observe(domContainer);

  // 返回销毁监听的回调
  return () => {
    resizeObserver.disconnect();
  };
}
```

---

## 2. 动态 Rem / 视角比例适配 (Dynamic Font & Dimensions)

当大屏使用 `scale` 缩放方案（如 `transform: scale(x, y)`）或 `rem` 适配方案时，ECharts 中的像素值（如字号 `fontSize`、间距 `margin`、柱体宽度 `barWidth`）也应当跟随容器动态调整。

推荐封装动态字号计算函数：

```javascript
/**
 * 根据大屏设计稿基准宽度 (默认 1920) 动态计算图表像素值
 * @param {number} res - 设计稿下的标准 PX 值
 * @param {number} targetWidth - 当前屏幕或容器宽度 (默认从 window 获取)
 * @returns {number} 适应后的 PX 值
 */
function fitPx(res, targetWidth = document.documentElement.clientWidth) {
  const designWidth = 1920; // 设计稿宽度
  const scale = targetWidth / designWidth;
  return Math.max(10, Math.round(res * scale)); // 保证最小字号不小于 10px
}

// 示例用法：
const chartOption = {
  xAxis: {
    axisLabel: {
      fontSize: fitPx(12),
      margin: fitPx(10)
    }
  },
  series: [{
    type: 'bar',
    barWidth: fitPx(16)
  }]
};
```

---

## 3. 大屏 Grid 边距响应式控制

在宽屏与高分屏下，可采用百分比 + `containLabel: true` 控制，确保图表文本不越界：

```javascript
grid: {
  top: '16%',
  left: '3%',
  right: '4%',
  bottom: '6%',
  containLabel: true // 极其重要！自动防止刻度标签溢出容器
}
```

---

## 4. Vue 3 组合式 API (Composition API) 集成标准范例

```vue
<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref(null);
let chartInstance = null;
let cleanupObserver = null;

const initChart = () => {
  if (!chartRef.value) return;
  chartInstance = echarts.init(chartRef.value);

  const option = {
    backgroundColor: 'transparent',
    // ... 大屏图表 Option 属性 ...
  };

  chartInstance.setOption(option);
  
  // 绑定 ResizeObserver
  cleanupObserver = bindChartResize(chartRef.value, chartInstance);
};

onMounted(() => {
  initChart();
});

onBeforeUnmount(() => {
  if (cleanupObserver) cleanupObserver();
  if (chartInstance) chartInstance.dispose();
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  min-height: 240px;
  position: relative;
}
</style>
```
