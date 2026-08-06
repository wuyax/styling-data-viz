/**
 * 「国风」水墨大屏空间地理图表模板 (Guofeng Ink Map & Geo Screen Charts)
 * 包含：2D 水墨地图 + 青绿/鎏金迁徙飞线 (Guofeng Ink Geo Map Lines)、大屏青绿热力图
 */

import * as echarts from 'echarts';

// ============================================================================
// 1. 水墨地图 + 青绿/鎏金迁徙飞线图 (Guofeng Ink Map with Flylines)
// ============================================================================
export const getGuofengGeoMapLinesOption = () => {
  const geoCoordMap = {
    '北京': [116.46, 39.92],
    '密云区': [116.85, 40.37],
    '怀柔区': [116.63, 40.32],
    '延庆区': [115.97, 40.45],
    '昌平区': [116.23, 40.22],
    '门头沟区': [116.10, 39.94]
  };

  const toHub = '北京';
  const routes = [
    { from: '密云区', value: 95 },
    { from: '怀柔区', value: 88 },
    { from: '延庆区', value: 76 },
    { from: '昌平区', value: 82 },
    { from: '门头沟区', value: 65 }
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
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(4, 10, 14, 0.88)',
      borderColor: 'rgba(48, 181, 150, 0.4)',
      textStyle: { color: '#eef4f0' }
    },
    geo: {
      map: 'beijing',
      zoom: 1.2,
      label: { show: false },
      roam: true,
      itemStyle: {
        areaColor: '#0a1d1a', // 墨青浅底
        borderColor: 'rgba(48, 181, 150, 0.4)', // 翡翠发光界线
        borderWidth: 1.2,
        shadowColor: 'rgba(48, 181, 150, 0.25)',
        shadowBlur: 12
      },
      emphasis: {
        itemStyle: { areaColor: 'rgba(48, 181, 150, 0.3)' }
      }
    },
    series: [
      // 迁徙飞线轨迹 (静止弧线与发光点)
      {
        type: 'lines',
        zlevel: 1,
        effect: {
          show: true,
          period: 4,
          trailLength: 0.7,
          color: '#c0b65d', // 鎏金发光光纤
          symbolSize: 4
        },
        lineStyle: {
          color: '#30b596', // 翡翠青绿轨迹线
          width: 1.2,
          opacity: 0.45,
          curveness: 0.2
        },
        data: convertData(routes)
      },
      // 节点涟漪散点
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: { brushType: 'stroke', scale: 4.5 },
        label: {
          show: true,
          position: 'right',
          color: '#eef4f0',
          fontSize: 11,
          fontFamily: 'KaiTi, Source Han Serif SC, serif',
          formatter: '{b}'
        },
        itemStyle: { color: '#30b596' },
        data: Object.keys(geoCoordMap).map(key => ({
          name: key,
          value: [...geoCoordMap[key], key === toHub ? 100 : 50]
        }))
      }
    ]
  };
};
