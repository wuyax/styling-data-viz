/**
 * ECharts ARIA 斜条纹/纹理 (Decal) 配置生成器
 * 用于开启 ECharts 5+ 原生 ARIA Decal 贴花特性，在单图层下无缝叠加科技斜条纹与渐变色。
 */

export interface AriaStripeDecalOptions {
  /** 是否开启 ARIA 无障碍特性 (默认 true) */
  enabled?: boolean;
  /** 是否显示贴花纹理 (默认 true) */
  show?: boolean;
  /** 条纹/纹理线条颜色，如果 itemStyle 建议保持该参数为 undefined，以实现条纹的渐变效果 */
  color?: string;
  /** 背景填充颜色 (默认 'none'，背景透明以透出底层渐变) */
  backgroundColor?: string;
  /** 纹理基本图形 (默认 'rect'，可选 'line', 'circle', 'square', 'triangle', 'diamond' 等) */
  symbol?: string;
  /** 纹理符号缩放比例 (默认 1) */
  symbolSize?: number;
  /** 条纹线条间距与宽度配置：可传入数值(间距)或 [线宽, 间距] (默认 [2, 6])，如果 color === undefined，设置为 [4, 6] 为宜 */
  gap?: number | [number, number];
  /** X 轴方向 dash 阵列 (默认 [1, 0]) */
  dashArrayX?: (number | [number, number])[];
  /** Y 轴方向 dash 阵列 (若未指定则自动根据 gap 参数生成，默认 [2, 6]) */
  dashArrayY?: (number | [number, number])[];
  /** 旋转角度 (支持角度 deg 如 -45，或弧度 rad，默认 -45°) */
  rotation?: number;
  /** 旋转角度单位 ('deg' | 'rad'，默认 'deg') */
  rotationUnit?: 'deg' | 'rad';
}

/**
 * 生成 ECharts ARIA Decal 贴花配置对象
 *
 * @param options 可调节的条纹/纹理参数
 * @returns ECharts 的 option.aria 配置对象
 *
 * @example
 * ```typescript
 * import { createAriaStripeDecal } from './references/ariaStripeDecal';
 *
 * option = {
 *   aria: createAriaStripeDecal({
 *     color: 'rgba(255, 255, 255, 0.8)',
 *     gap: [2, 8],
 *     rotation: -45
 *   }),
 *   series: [{
 *     type: 'bar',
 *     itemStyle: {
 *       color: new echarts.graphic.LinearGradient(...)
 *     },
 *     data: [120, 200, 150]
 *   }]
 * };
 * ```
 */
export const createAriaStripeDecal = (options: AriaStripeDecalOptions = {}) => {
  const {
    enabled = true,
    show = true,
    color,
    backgroundColor = 'none',
    symbol = 'rect',
    symbolSize = 1,
    gap = [2, 6],
    dashArrayX = [1, 0],
    dashArrayY,
    rotation = -45,
    rotationUnit = 'deg'
  } = options;

  // 1. 处理 dashArrayY 参数
  let finalDashArrayY: (number | [number, number])[];
  if (dashArrayY) {
    finalDashArrayY = dashArrayY;
  } else if (Array.isArray(gap)) {
    finalDashArrayY = gap;
  } else {
    finalDashArrayY = [2, gap];
  }

  // 2. 处理 rotation 参数 (兼容角度 deg 和弧度 rad)
  let finalRotation = rotation;
  if (rotationUnit === 'rad') {
    finalRotation = rotation;
  } else if (rotationUnit === 'deg') {
    finalRotation = (rotation * Math.PI) / 180;
  } else {
    // 默认转换为弧度
    finalRotation = (rotation * Math.PI) / 180;
  }

  return {
    enabled,
    decal: {
      show,
      decals: {
        symbol,
        symbolSize,
        color,
        backgroundColor,
        dashArrayX,
        dashArrayY: finalDashArrayY,
        rotation: finalRotation
      }
    }
  };
};
