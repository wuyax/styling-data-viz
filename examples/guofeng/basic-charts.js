/**
 * 「国风」水墨青绿大屏基础图表模板 (Basic Guofeng Screen Charts)
 * 包含：水墨青绿面积折线图、竹节/翡翠渐变柱图、中式水波环形 KPI 图、青绿多维雷达图
 */

import * as echarts from 'echarts';

// ============================================================================
// 1. 水墨青绿面积折线图 (Guofeng Ink-Green Smooth Area Line Chart)
// ============================================================================
export const getGuofengSmoothLineOption = (data = {
  categories: ['2017', '2018', '2019', '2020', '2021', '2022'],
  seriesData: [120, 230, 450, 540, 780, 920]
}) => ({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(4, 10, 14, 0.88)',
    borderColor: 'rgba(48, 181, 150, 0.4)',
    borderWidth: 1,
    textStyle: { color: '#eef4f0', fontSize: 13 },
    extraCssText: 'backdrop-filter: blur(8px); box-shadow: 0 8px 32px rgba(48, 181, 150, 0.15); border-radius: 4px;',
    axisPointer: { type: 'line', lineStyle: { color: 'rgba(48, 181, 150, 0.5)', type: 'dashed' } }
  },
  grid: { top: '15%', left: '4%', right: '4%', bottom: '8%', containLabel: true },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: data.categories,
    axisLine: { lineStyle: { color: 'rgba(118, 181, 166, 0.2)' } },
    axisTick: { show: false },
    axisLabel: { color: '#76b5a6', fontSize: 12, fontFamily: 'Source Han Sans SC, sans-serif' }
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#76b5a6', fontSize: 12, fontFamily: 'D-DIN, Roboto, monospace' },
    splitLine: { lineStyle: { color: 'rgba(118, 181, 166, 0.06)', type: 'dashed' } }
  },
  series: [{
    name: '生态指数',
    type: 'line',
    smooth: 0.35,
    showSymbol: false,
    symbol: 'circle',
    symbolSize: 6,
    itemStyle: { color: '#30b596', borderColor: '#eef4f0', borderWidth: 2 },
    lineStyle: {
      width: 2.5,
      color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        { offset: 0, color: '#4892bd' },
        { offset: 0.5, color: '#30b596' },
        { offset: 1, color: '#c0b65d' }
      ]),
      shadowColor: 'rgba(48, 181, 150, 0.3)',
      shadowBlur: 10
    },
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: 'rgba(48, 181, 150, 0.25)' },
        { offset: 1, color: 'rgba(48, 181, 150, 0.00)' }
      ])
    },
    data: data.seriesData
  }]
});

// ============================================================================
// 2. 翡翠/鎏金双色胶囊柱图 (Guofeng Jade & Gold Bar Chart)
// ============================================================================
export const getGuofengBarOption = (data = {
  categories: ['产品一', '产品二', '产品三', '产品四'],
  seriesData: [89840, 19848, 9848, 8848]
}) => ({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(4, 10, 14, 0.88)',
    borderColor: 'rgba(48, 181, 150, 0.4)',
    textStyle: { color: '#eef4f0', fontSize: 13 }
  },
  grid: { top: '15%', left: '4%', right: '4%', bottom: '8%', containLabel: true },
  xAxis: {
    type: 'category',
    data: data.categories,
    axisLine: { lineStyle: { color: 'rgba(118, 181, 166, 0.2)' } },
    axisTick: { show: false },
    axisLabel: { color: '#76b5a6', fontSize: 12 }
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#76b5a6', fontSize: 12, fontFamily: 'D-DIN, monospace' },
    splitLine: { lineStyle: { color: 'rgba(118, 181, 166, 0.06)', type: 'dashed' } }
  },
  series: [{
    name: '产值 (万元)',
    type: 'bar',
    barWidth: '24%',
    showBackground: true,
    backgroundStyle: {
      color: 'rgba(118, 181, 166, 0.03)',
      borderRadius: [4, 4, 0, 0]
    },
    itemStyle: {
      borderRadius: [4, 4, 0, 0],
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#30b596' },
        { offset: 1, color: '#4892bd' }
      ])
    },
    label: {
      show: true,
      position: 'top',
      color: '#d6c398',
      fontSize: 12,
      fontFamily: 'D-DIN Bold, monospace'
    },
    data: data.seriesData
  }]
});

// ============================================================================
// 3. 典雅玉环 KPI 饼图 (Guofeng Jade Ring KPI Chart)
// ============================================================================
export const getGuofengKpiRingOption = (title = '发放率', value = '11%', list = [
  { name: '智慧城市', value: 23.4 },
  { name: '工业互联网', value: 20.2 },
  { name: '医疗健康', value: 16.8 },
  { name: '生态环境', value: 15.66 },
  { name: '文化旅游', value: 13.2 }
]) => ({
  backgroundColor: 'transparent',
  title: {
    text: value,
    subtext: title,
    x: 'center',
    y: '42%',
    textStyle: { color: '#eef4f0', fontSize: 28, fontWeight: 'bold', fontFamily: 'D-DIN Bold' },
    subTextStyle: { color: '#76b5a6', fontSize: 13 }
  },
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(4, 10, 14, 0.88)',
    borderColor: 'rgba(48, 181, 150, 0.4)',
    textStyle: { color: '#eef4f0' }
  },
  legend: {
    bottom: '2%',
    left: 'center',
    icon: 'rect',
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 14,
    textStyle: { color: '#76b5a6', fontSize: 12 }
  },
  series: [{
    type: 'pie',
    radius: ['58%', '76%'],
    center: ['50%', '48%'],
    avoidLabelOverlap: true,
    itemStyle: {
      borderRadius: 4,
      borderColor: '#040a0e',
      borderWidth: 3
    },
    label: { show: false },
    data: list.map((item, index) => {
      const guofengGradients = [
        new echarts.graphic.LinearGradient(0, 0, 1, 1, [{ offset: 0, color: '#30b596' }, { offset: 1, color: '#4892bd' }]),
        new echarts.graphic.LinearGradient(0, 0, 1, 1, [{ offset: 0, color: '#c0b65d' }, { offset: 1, color: '#d6c398' }]),
        new echarts.graphic.LinearGradient(0, 0, 1, 1, [{ offset: 0, color: '#4861bd' }, { offset: 1, color: '#7e8cbd' }]),
        new echarts.graphic.LinearGradient(0, 0, 1, 1, [{ offset: 0, color: '#69bc5e' }, { offset: 1, color: '#93bd8e' }]),
        new echarts.graphic.LinearGradient(0, 0, 1, 1, [{ offset: 0, color: '#c8bce7' }, { offset: 1, color: '#d2d1d4' }])
      ];
      return {
        name: item.name,
        value: item.value,
        itemStyle: { color: guofengGradients[index % guofengGradients.length] }
      };
    })
  }]
});
