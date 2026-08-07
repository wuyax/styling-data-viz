/**
 * 「群青」大屏基础图表模板 (Basic Ultranavy Screen Charts)
 * 包含：平滑渐变面积折线图、胶囊圆角柱状图、KPI 环形饼图、多维雷达图
 */

import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';
import { createKpiRingOption } from '../../references/kpiRingHelper';

// ============================================================================
// 1. 平滑渐变面积折线图 (Smooth Area Line Chart)
// ============================================================================
export const getSmoothLineOption = (data = {
  categories: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
  seriesData: [120, 230, 700, 540, 890, 1200, 980]
}): EChartsOption => ({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(5, 14, 23, 0.85)',
    borderColor: 'rgba(18, 173, 253, 0.4)',
    textStyle: { color: '#f0f0f0', fontSize: 13 },
    extraCssText: 'backdrop-filter: blur(8px); box-shadow: 0 8px 32px rgba(0,0,0,0.5);',
    axisPointer: { type: 'line', lineStyle: { color: 'rgba(18, 173, 253, 0.5)', type: 'dashed' } }
  },
  grid: { top: '15%', left: '4%', right: '4%', bottom: '8%', containLabel: true },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: data.categories,
    axisLine: { lineStyle: { color: 'rgba(205, 225, 248, 0.15)' } },
    axisTick: { show: false },
    axisLabel: { color: '#8299b1', fontSize: 12, fontFamily: 'Source Han Sans SC, sans-serif' }
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#8299b1', fontSize: 12, fontFamily: 'D-DIN, Roboto, monospace' },
    splitLine: { lineStyle: { color: 'rgba(205, 225, 248, 0.05)', type: 'dashed' } }
  },
  series: [{
    name: '实时并发数',
    type: 'line',
    smooth: 0.35,
    showSymbol: false,
    symbol: 'circle',
    symbolSize: 6,
    itemStyle: { color: '#12adfd', borderColor: '#ffffff', borderWidth: 2 },
    lineStyle: {
      width: 2.5,
      color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        { offset: 0, color: '#11c3dd' },
        { offset: 1, color: '#12adfd' }
      ]),
      shadowColor: 'rgba(18, 173, 253, 0.4)',
      shadowBlur: 10
    },
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: 'rgba(18, 173, 253, 0.22)' },
        { offset: 1, color: 'rgba(18, 173, 253, 0.00)' }
      ])
    },
    data: data.seriesData
  }]
});

// ============================================================================
// 2. 胶囊圆角柱状图 (Capsule Rounded Bar Chart with Background)
// ============================================================================
export const getCapsuleBarOption = (data = {
  categories: ['全华东', '华南区', '华北区', '西南区', '西北区'],
  seriesData: [850, 720, 560, 430, 310]
}): EChartsOption => ({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(5, 14, 23, 0.85)',
    borderColor: 'rgba(18, 173, 253, 0.4)',
    textStyle: { color: '#f0f0f0', fontSize: 13 }
  },
  grid: { top: '15%', left: '4%', right: '4%', bottom: '8%', containLabel: true },
  xAxis: {
    type: 'category',
    data: data.categories,
    axisLine: { lineStyle: { color: 'rgba(205, 225, 248, 0.15)' } },
    axisTick: { show: false },
    axisLabel: { color: '#8299b1', fontSize: 12 }
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#8299b1', fontSize: 12, fontFamily: 'D-DIN, monospace' },
    splitLine: { lineStyle: { color: 'rgba(205, 225, 248, 0.05)', type: 'dashed' } }
  },
  series: [{
    name: '区域销售额',
    type: 'bar',
    barWidth: '28%',
    showBackground: true,
    backgroundStyle: {
      color: 'rgba(205, 225, 248, 0.03)'
    },
    itemStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#12adfd' },
        { offset: 1, color: '#11c3dd' }
      ])
    },
    label: {
      show: true,
      position: 'top',
      color: '#cde1f8',
      fontSize: 12,
      fontFamily: 'D-DIN Bold, monospace'
    },
    data: data.seriesData
  }]
});

// ============================================================================
// 3. KPI 切口环形图 (Doughnut KPI Ring Chart with Gap & Meter Outer Ring)
// ============================================================================
export const getDoughnutKpiOption = (title = '核心负载', value = '78.5%', list = [
  { name: 'IT 服务', value: 35.8 },
  { name: '云计算', value: 28.8 },
  { name: '大数据', value: 26.8 },
  { name: '物联网', value: 15.8 }
]): EChartsOption => createKpiRingOption({
  title,
  value,
  list,
  titleColor: '#f0f0f0',
  subtextColor: '#8299b1',
  borderColor: '#050e17',
  gradients: [
    new echarts.graphic.LinearGradient(0, 0, 1, 1, [{ offset: 0, color: '#12adfd' }, { offset: 1, color: '#11c3dd' }]),
    new echarts.graphic.LinearGradient(0, 0, 1, 1, [{ offset: 0, color: '#e68513' }, { offset: 1, color: '#b26132' }]),
    new echarts.graphic.LinearGradient(0, 0, 1, 1, [{ offset: 0, color: '#5592f7' }, { offset: 1, color: '#6a9cc4' }]),
    new echarts.graphic.LinearGradient(0, 0, 1, 1, [{ offset: 0, color: '#18db6c' }, { offset: 1, color: '#34a853' }])
  ]
});

// ============================================================================
// 4. 多维雷达图 (Multi-dimensional Radar Chart)
// ============================================================================
export const getRadarOption = (): EChartsOption => ({
  backgroundColor: 'transparent',
  animationDuration: 1000,
  animationEasing: 'cubicOut',
  tooltip: { trigger: 'item' },
  legend: {
    top: '2%',
    right: '4%',
    icon: 'circle',
    textStyle: { color: '#8299b1', fontSize: 12 }
  },
  radar: {
    shape: 'polygon',
    center: ['50%', '55%'],
    radius: '65%',
    indicator: [
      { name: '安全防护', max: 100 },
      { name: '响应速度', max: 100 },
      { name: '并发支撑', max: 100 },
      { name: '稳定可用', max: 100 },
      { name: '资源利用', max: 100 }
    ],
    axisName: { color: '#8299b1', fontSize: 12 },
    splitLine: { lineStyle: { color: 'rgba(205, 225, 248, 0.1)' } },
    splitArea: { show: false },
    axisLine: { lineStyle: { color: 'rgba(205, 225, 248, 0.15)' } }
  },
  series: [{
    type: 'radar',
    animationDelay: (idx: number) => idx * 150,
    data: [
      {
        value: [90, 85, 95, 88, 75],
        name: '本月综合指标',
        symbol: 'none',
        itemStyle: { color: '#12adfd' },
        lineStyle: { width: 2, color: '#12adfd' },
        areaStyle: { color: 'rgba(18, 173, 253, 0.25)' }
      },
      {
        value: [70, 75, 80, 70, 65],
        name: '上月基准',
        symbol: 'none',
        itemStyle: { color: '#83aad8' },
        lineStyle: { width: 1.5, type: 'dashed', color: '#83aad8' },
        areaStyle: { color: 'rgba(131, 170, 216, 0.1)' }
      }
    ]
  }]
});

