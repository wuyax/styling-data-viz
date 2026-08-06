/**
 * 大屏空间地理与数据密集图表模板 (Map & Data-Dense Screen Charts)
 * 包含：2D 地图 + 飞线 (Geo Map Lines)、大屏热力图 (Heatmap)、桑基图 (Sankey)
 */

import * as echarts from 'echarts';

// ============================================================================
// 1. 2D 地图 + 迁徙飞线图 (Geo Map with Migration Lines)
// ============================================================================
export const getGeoMapLinesOption = () => {
  const geoCoordMap = {
    '北京': [116.46, 39.92],
    '上海': [121.48, 31.22],
    '广州': [113.23, 23.16],
    '成都': [104.06, 30.67],
    '西安': [108.95, 34.27]
  };

  const toHub = '北京';
  const routes = [
    { from: '上海', value: 95 },
    { from: '广州', value: 85 },
    { from: '成都', value: 70 },
    { from: '西安', value: 60 }
  ];

  const convertData = (routes) => {
    const res = [];
    for (let i = 0; i < routes.length; i++) {
      const fromCoord = geoCoordMap[routes[i].from];
      const toCoord = geoCoordMap[toHub];
      if (fromCoord && toCoord) {
        res.push({
          fromName: routes[i].from,
          toName: toHub,
          coords: [fromCoord, toCoord],
          value: routes[i].value
        });
      }
    }
    return res;
  };

  return {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item' },
    geo: {
      map: 'china',
      zoom: 1.2,
      label: { show: false },
      roam: true,
      itemStyle: {
        areaColor: 'rgba(15, 23, 42, 0.7)',
        borderColor: 'rgba(56, 189, 248, 0.4)',
        borderWidth: 1,
        shadowColor: 'rgba(0, 242, 254, 0.2)',
        shadowBlur: 10
      },
      emphasis: {
        itemStyle: { areaColor: 'rgba(56, 189, 248, 0.3)' }
      }
    },
    series: [
      // 迁徙飞线轨迹 (静止弧线)
      {
        type: 'lines',
        zlevel: 1,
        effect: {
          show: true,
          period: 4,
          trailLength: 0.7,
          color: '#00f2fe',
          symbolSize: 3
        },
        lineStyle: {
          color: '#00f2fe',
          width: 1,
          opacity: 0.4,
          curveness: 0.2
        },
        data: convertData(routes)
      },
      // 节点涟漪散点
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: { brushType: 'stroke', scale: 4 },
        label: {
          show: true,
          position: 'right',
          color: '#f8fafc',
          fontSize: 11,
          formatter: '{b}'
        },
        itemStyle: { color: '#00f2fe' },
        data: Object.keys(geoCoordMap).map(key => ({
          name: key,
          value: [...geoCoordMap[key], key === toHub ? 100 : 50]
        }))
      }
    ]
  };
};

// ============================================================================
// 2. 大屏热力图 (Screen Heatmap)
// ============================================================================
export const getHeatmapOption = () => {
  const hours = ['12a', '2a', '4a', '6a', '8a', '10a', '12p', '2p', '4p', '6p', '8p', '10p'];
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  
  // 生成示例热力矩阵数据 [x, y, value]
  const data = [];
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 12; j++) {
      data.push([j, i, Math.floor(Math.random() * 100)]);
    }
  }

  return {
    backgroundColor: 'transparent',
    tooltip: { position: 'top' },
    grid: { top: '10%', bottom: '15%', left: '8%', right: '4%' },
    xAxis: {
      type: 'category',
      data: hours,
      axisLine: { show: false },
      axisLabel: { color: '#94a3b8', fontSize: 11 },
      splitArea: { show: true, areaStyle: { color: ['rgba(255,255,255,0.01)', 'rgba(255,255,255,0.03)'] } }
    },
    yAxis: {
      type: 'category',
      data: days,
      axisLine: { show: false },
      axisLabel: { color: '#94a3b8', fontSize: 11 },
      splitArea: { show: true }
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '0%',
      inRange: {
        color: ['rgba(15, 23, 42, 0.8)', '#00f2fe', '#38ef7d', '#ff4d4f']
      },
      textStyle: { color: '#94a3b8', fontSize: 11 }
    },
    series: [{
      type: 'heatmap',
      data: data,
      label: { show: false },
      itemStyle: { borderRadius: 2, borderColor: 'rgba(3, 7, 18, 0.8)', borderWidth: 1 }
    }]
  };
};

// ============================================================================
// 3. 大屏桑基图 (Sankey Flow Chart)
// ============================================================================
export const getSankeyOption = () => ({
  backgroundColor: 'transparent',
  tooltip: { trigger: 'item', triggerOn: 'mousemove' },
  series: [{
    type: 'sankey',
    left: '5%',
    top: '5%',
    right: '5%',
    bottom: '5%',
    nodeGap: 12,
    nodeWidth: 14,
    itemStyle: { color: '#00f2fe', borderColor: 'transparent' },
    lineStyle: { color: 'gradient', curveness: 0.5, opacity: 0.35 },
    label: { color: '#94a3b8', fontSize: 12 },
    data: [
      { name: '流量入口' },
      { name: '移动端 APP' },
      { name: 'PC 网页' },
      { name: '订单服务' },
      { name: '支付成功' },
      { name: '支付失败' }
    ],
    links: [
      { source: '流量入口', target: '移动端 APP', value: 60 },
      { source: '流量入口', target: 'PC 网页', value: 40 },
      { source: '移动端 APP', target: '订单服务', value: 50 },
      { source: 'PC 网页', target: '订单服务', value: 30 },
      { source: '订单服务', target: '支付成功', value: 70 },
      { source: '订单服务', target: '支付失败', value: 10 }
    ]
  }]
});
