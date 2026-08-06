/**
 * 「幻紫」特效图表模板 (Huanzi Effect Screen Charts)
 * 包含：三维三角柱图 (Triangle PictorialBar)、玉珏多层发光柱/环、赛博仪表盘
 */

import * as echarts from 'echarts';

// ============================================================================
// 1. 三维渐变三角柱图 (Huanzi Triangle Pictorial Bar Chart)
// ============================================================================
export const getHuanziTriangleBarOption = (data = {
  categories: ['2019', '2020', '2021', '2022', '2023'],
  seriesData: [110, 140, 160, 200, 180]
}) => ({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(3, 6, 17, 0.88)',
    borderColor: 'rgba(97, 164, 255, 0.5)',
    textStyle: { color: '#ffffff' }
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
    name: '数值',
    type: 'pictorialBar',
    symbol: 'path://M0,10 L5,0 L10,10 Z', // 经典三维三角锥体路径
    barWidth: '35%',
    itemStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#d8a6ff' },
        { offset: 0.6, color: '#7c95ff' },
        { offset: 1, color: '#61a4ff' }
      ]),
      shadowColor: 'rgba(216, 166, 255, 0.4)',
      shadowBlur: 10
    },
    label: {
      show: true,
      position: 'top',
      color: '#d8a6ff',
      fontSize: 12,
      fontFamily: 'DINPro-Medium, monospace'
    },
    data: data.seriesData
  }]
});

// ============================================================================
// 2. 玉珏图 / 多环发光雷达占比 (Huanzi Multi-ring Radial Gauge)
// ============================================================================
export const getHuanziMultiRingOption = (data = [
  { name: '50%以上', value: 380, percent: 29.9 },
  { name: '40-49', value: 290, percent: 22.8 },
  { name: '30-39', value: 240, percent: 18.9 },
  { name: '20-29', value: 200, percent: 15.8 },
  { name: '20以下', value: 160, percent: 12.6 }
]) => ({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(3, 6, 17, 0.88)',
    borderColor: 'rgba(97, 164, 255, 0.5)',
    textStyle: { color: '#ffffff' }
  },
  legend: {
    orient: 'vertical',
    right: '5%',
    top: 'center',
    icon: 'rect',
    itemWidth: 10,
    itemHeight: 10,
    textStyle: { color: '#919fba', fontSize: 12 }
  },
  series: [{
    type: 'pie',
    radius: ['30%', '75%'],
    center: ['40%', '50%'],
    roseType: 'radius',
    label: { show: false },
    itemStyle: {
      borderRadius: 5,
      shadowBlur: 8,
      shadowColor: 'rgba(97, 164, 255, 0.3)'
    },
    data: data.map((item, index) => {
      const colors = ['#61a4ff', '#7c95ff', '#d8a6ff', '#ffde8d', '#aaacff'];
      return {
        name: `${item.name} (${item.percent}%)`,
        value: item.value,
        itemStyle: { color: colors[index % colors.length] }
      };
    })
  }]
});
