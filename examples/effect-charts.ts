/**
 * 大屏特效图表模板 (Effect Screen Charts)
 * 包含：折柱混合双轴图、象形柱图 (PictorialBar)、仪表盘与水球图
 */

import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

// ============================================================================
// 1. 折柱混合双轴图 (Combo Line & Bar Dual Axis)
// ============================================================================
export const getComboDualAxisOption = (): EChartsOption => ({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    textStyle: { color: '#f8fafc' },
    axisPointer: { type: 'cross', crossStyle: { color: '#94a3b8' } }
  },
  legend: {
    top: '2%',
    right: '4%',
    icon: 'circle',
    textStyle: { color: '#94a3b8', fontSize: 12 }
  },
  grid: { top: '18%', left: '3%', right: '4%', bottom: '5%', containLabel: true },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月'],
    axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.15)' } },
    axisLabel: { color: '#94a3b8', fontSize: 12 }
  },
  yAxis: [
    {
      type: 'value',
      name: '交易额(万元)',
      nameTextStyle: { color: '#94a3b8', fontSize: 11 },
      axisLine: { show: false },
      axisLabel: { color: '#94a3b8', fontSize: 12 },
      splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)', type: 'dashed' } }
    },
    {
      type: 'value',
      name: '同比增长(%)',
      nameTextStyle: { color: '#94a3b8', fontSize: 11 },
      axisLine: { show: false },
      axisLabel: { color: '#94a3b8', fontSize: 12, formatter: '{value}%' },
      splitLine: { show: false } // 右 Y 轴绝对不重复绘制网格线！
    }
  ],
  series: [
    {
      name: '交易额',
      type: 'bar',
      barWidth: '30%',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#00f2fe' },
          { offset: 1, color: '#4facfe' }
        ])
      },
      data: [320, 450, 580, 690, 810, 950]
    },
    {
      name: '同比增长',
      type: 'line',
      yAxisIndex: 1, // 绑定右 Y 轴
      smooth: 0.35,
      showSymbol: false,
      lineStyle: { width: 2.5, color: '#38ef7d' },
      itemStyle: { color: '#38ef7d' },
      data: [12.5, 15.2, 18.9, 22.1, 25.4, 30.1]
    }
  ]
});

// ============================================================================
// 2. 象形柱图 (PictorialBar - 层叠科技方块)
// ============================================================================
export const getPictorialBarOption = (data = {
  categories: ['服务器 A', '服务器 B', '服务器 C', '服务器 D', '服务器 E'],
  seriesData: [82, 65, 94, 78, 56]
}): EChartsOption => ({
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis' },
  grid: { top: '15%', left: '3%', right: '4%', bottom: '5%', containLabel: true },
  xAxis: {
    type: 'category',
    data: data.categories,
    axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.15)' } },
    axisLabel: { color: '#94a3b8', fontSize: 12 }
  },
  yAxis: {
    type: 'value',
    max: 100,
    axisLine: { show: false },
    axisLabel: { color: '#94a3b8', fontSize: 12, formatter: '{value}%' },
    splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)', type: 'dashed' } }
  },
  series: [
    {
      name: 'CPU 使用率',
      type: 'pictorialBar',
      symbol: 'rect', // 方块点阵风格
      symbolRepeat: true,
      symbolSize: [18, 4],
      symbolMargin: 2,
      symbolClip: true,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#ff4d4f' }, // 顶部偏红色告警感
          { offset: 0.5, color: '#00f2fe' },
          { offset: 1, color: '#4facfe' }
        ])
      },
      label: {
        show: true,
        position: 'top',
        color: '#00f2fe',
        fontSize: 12,
        fontFamily: 'DIN Alternate',
        formatter: '{c}%'
      },
      data: data.seriesData
    }
  ]
});

// ============================================================================
// 3. 科技大屏仪表盘 (Tech Gauge Chart)
// ============================================================================
export const getGaugeOption = (title = '系统健康度', value = 92.4): EChartsOption => ({
  backgroundColor: 'transparent',
  series: [{
    type: 'gauge',
    center: ['50%', '55%'],
    radius: '80%',
    startAngle: 210,
    endAngle: -30,
    min: 0,
    max: 100,
    splitNumber: 10,
    itemStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        { offset: 0, color: '#38ef7d' },
        { offset: 0.7, color: '#00f2fe' },
        { offset: 1, color: '#a855f7' }
      ])
    },
    progress: { show: true, width: 10 },
    pointer: { show: false }, // 隐藏传统粗针，使用现代化无针环形进度
    axisLine: {
      lineStyle: {
        width: 10,
        color: [[1, 'rgba(255, 255, 255, 0.08)']]
      }
    },
    axisTick: { show: false },
    splitLine: { show: false },
    axisLabel: { show: false },
    anchor: { show: false },
    title: {
      offsetCenter: [0, '30%'],
      color: '#94a3b8',
      fontSize: 13
    },
    detail: {
      valueAnimation: true,
      offsetCenter: [0, '-5%'],
      fontSize: 32,
      fontWeight: 'bold',
      fontFamily: 'DIN Alternate',
      color: '#f8fafc',
      formatter: '{value}%'
    },
    data: [{ value: value, name: title }]
  }]
});
