/**
 * 「幻紫」赛博霓虹大屏基础图表模板 (Basic Huanzi Cyber Screen Charts)
 * 包含：电光蓝紫渐变折线图、胶囊粉紫柱状图、多层霓虹 KPI 环形图、幻紫多维雷达图
 */

import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

// ============================================================================
// 1. 电光蓝紫渐变折线图 (Huanzi Cyber Blue-Purple Line Chart)
// ============================================================================
export const getHuanziSmoothLineOption = (data = {
  categories: ['0时', '3时', '6时', '9时', '12时', '15时', '18时'],
  seriesData: [1000, 2000, 1500, 4000, 2800, 3500, 4200]
}): EChartsOption => ({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(3, 6, 17, 0.88)',
    borderColor: 'rgba(97, 164, 255, 0.5)',
    borderWidth: 1,
    textStyle: { color: '#ffffff', fontSize: 13 },
    extraCssText: 'backdrop-filter: blur(8px); box-shadow: 0 0 20px rgba(97, 164, 255, 0.3); border-radius: 4px;',
    axisPointer: { type: 'line', lineStyle: { color: 'rgba(97, 164, 255, 0.6)', type: 'dashed' } }
  },
  grid: { top: '15%', left: '4%', right: '4%', bottom: '8%', containLabel: true },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: data.categories,
    axisLine: { lineStyle: { color: 'rgba(145, 159, 186, 0.2)' } },
    axisTick: { show: false },
    axisLabel: { color: '#919fba', fontSize: 12, fontFamily: 'Source Han Sans SC, sans-serif' }
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#919fba', fontSize: 12, fontFamily: 'DINPro-Medium, Roboto, monospace' },
    splitLine: { lineStyle: { color: 'rgba(145, 159, 186, 0.06)', type: 'dashed' } }
  },
  series: [{
    name: '算力并发',
    type: 'line',
    smooth: 0.35,
    showSymbol: false,
    symbol: 'circle',
    symbolSize: 6,
    itemStyle: { color: '#61a4ff', borderColor: '#ffffff', borderWidth: 2 },
    lineStyle: {
      width: 2.5,
      color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        { offset: 0, color: '#61a4ff' },
        { offset: 0.5, color: '#7c95ff' },
        { offset: 1, color: '#d8a6ff' }
      ]),
      shadowColor: 'rgba(216, 166, 255, 0.4)',
      shadowBlur: 12
    },
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: 'rgba(216, 166, 255, 0.28)' },
        { offset: 1, color: 'rgba(97, 164, 255, 0.00)' }
      ])
    },
    data: data.seriesData
  }]
});

// ============================================================================
// 2. 胶囊粉紫柱状图 (Huanzi Neon Bar Chart)
// ============================================================================
export const getHuanziBarOption = (data = {
  categories: ['咸阳市', '渭南市', '安康市', '汉中市', '榆林市'],
  seriesData: [80, 42, 38, 20, 12]
}) => ({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(3, 6, 17, 0.88)',
    borderColor: 'rgba(97, 164, 255, 0.5)',
    textStyle: { color: '#ffffff', fontSize: 13 }
  },
  grid: { top: '15%', left: '4%', right: '4%', bottom: '8%', containLabel: true },
  xAxis: {
    type: 'category',
    data: data.categories,
    axisLine: { lineStyle: { color: 'rgba(145, 159, 186, 0.2)' } },
    axisTick: { show: false },
    axisLabel: { color: '#919fba', fontSize: 12 }
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#919fba', fontSize: 12, fontFamily: 'DINPro-Medium, monospace' },
    splitLine: { lineStyle: { color: 'rgba(145, 159, 186, 0.06)', type: 'dashed' } }
  },
  series: [{
    name: '完成占比',
    type: 'bar',
    barWidth: '26%',
    showBackground: true,
    backgroundStyle: {
      color: 'rgba(145, 159, 186, 0.04)',
      borderRadius: [4, 4, 0, 0]
    },
    itemStyle: {
      borderRadius: [4, 4, 0, 0],
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#d8a6ff' },
        { offset: 1, color: '#61a4ff' }
      ])
    },
    label: {
      show: true,
      position: 'top',
      color: '#61a4ff',
      fontSize: 12,
      fontFamily: 'DINPro-Medium, monospace',
      formatter: '{c}%'
    },
    data: data.seriesData
  }]
});

// ============================================================================
// 3. 多层发光 KPI 环形图 (Huanzi Multi-ring Doughnut KPI)
// ============================================================================
export const getHuanziRingKpiOption = (title = '计算节点', value = '156,234', list = [
  { name: '1-20mm', value: 35 },
  { name: '10-25mm', value: 25 },
  { name: '25-50mm', value: 20 },
  { name: '50-100mm', value: 15 },
  { name: '100mm以上', value: 5 }
]) => ({
  backgroundColor: 'transparent',
  title: {
    text: value,
    subtext: title,
    x: 'center',
    y: '40%',
    textStyle: { color: '#ffffff', fontSize: 26, fontWeight: 'bold', fontFamily: 'DINPro-Medium' },
    subTextStyle: { color: '#61a4ff', fontSize: 13 }
  },
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(3, 6, 17, 0.88)',
    borderColor: 'rgba(97, 164, 255, 0.5)',
    textStyle: { color: '#ffffff' }
  },
  legend: {
    bottom: '2%',
    left: 'center',
    icon: 'rect',
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 14,
    textStyle: { color: '#919fba', fontSize: 12 }
  },
  series: [{
    type: 'pie',
    radius: ['56%', '74%'],
    center: ['50%', '46%'],
    avoidLabelOverlap: true,
    itemStyle: {
      borderRadius: 4,
      borderColor: '#030611',
      borderWidth: 3
    },
    label: { show: false },
    data: list.map((item, index) => {
      const huanziGradients = [
        new echarts.graphic.LinearGradient(0, 0, 1, 1, [{ offset: 0, color: '#61a4ff' }, { offset: 1, color: '#7ca1ff' }]),
        new echarts.graphic.LinearGradient(0, 0, 1, 1, [{ offset: 0, color: '#d8a6ff' }, { offset: 1, color: '#aaacff' }]),
        new echarts.graphic.LinearGradient(0, 0, 1, 1, [{ offset: 0, color: '#ffde8d' }, { offset: 1, color: '#ffefc8' }]),
        new echarts.graphic.LinearGradient(0, 0, 1, 1, [{ offset: 0, color: '#78dbf0' }, { offset: 1, color: '#61a4ff' }]),
        new echarts.graphic.LinearGradient(0, 0, 1, 1, [{ offset: 0, color: '#dee4ff' }, { offset: 1, color: '#aaacff' }])
      ];
      return {
        name: item.name,
        value: item.value,
        itemStyle: { color: huanziGradients[index % huanziGradients.length] }
      };
    })
  }]
});
