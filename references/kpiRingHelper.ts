import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

export interface KpiRingDataItem {
  name: string;
  value: number;
}

export interface KpiRingConfig {
  title: string;
  value: string;
  list: KpiRingDataItem[];
  titleColor: string;
  subtextColor: string;
  borderColor: string;
  gradients: echarts.graphic.LinearGradient[];
  fontFamily?: string;
}

/**
 * 通用 KPI 环形图 (Doughnut KPI Ring Chart) 配置生成器
 * 用于提取跨主题 KPI 饼图/环形图模板的共同逻辑，消除重复代码
 */
export const createKpiRingOption = (config: KpiRingConfig): EChartsOption => ({
  backgroundColor: 'transparent',
  title: {
    text: config.value,
    subtext: config.title,
    left: 'center',
    top: '42%',
    textStyle: {
      color: config.titleColor,
      fontSize: 26,
      fontWeight: 'bold',
      fontFamily: config.fontFamily || 'D-DIN Bold'
    },
    subtextStyle: { color: config.subtextColor, fontSize: 13 }
  },
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(5, 14, 23, 0.85)',
    borderColor: 'rgba(18, 173, 253, 0.4)',
    textStyle: { color: '#f0f0f0' }
  },
  legend: {
    bottom: '2%',
    left: 'center',
    icon: 'rect',
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 14,
    textStyle: { color: config.subtextColor, fontSize: 12 }
  },
  series: [{
    type: 'pie',
    radius: ['58%', '76%'],
    center: ['50%', '48%'],
    avoidLabelOverlap: true,
    itemStyle: {
      borderRadius: 4,
      borderColor: config.borderColor,
      borderWidth: 3
    },
    label: { show: false },
    data: config.list.map((item, index) => ({
      name: item.name,
      value: item.value,
      itemStyle: { color: config.gradients[index % config.gradients.length] }
    }))
  }]
});
