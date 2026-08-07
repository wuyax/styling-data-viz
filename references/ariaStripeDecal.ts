/**
 * ECharts ARIA 斜条纹/纹理 (Decal) 配置生成器
 * 用于开启 ECharts 5+ 原生 ARIA Decal 贴花特性，在单图层下无缝叠加科技斜条纹与渐变色。
 */

export interface AriaStripeDecalOptions {
  /** 是否开启 ARIA 无障碍特性 (默认 true) */
  enabled?: boolean;
  /** 是否显示贴花纹理 (默认 true) */
  show?: boolean;
  /** 
   * 条纹/纹理线条颜色。
   * 💡【最佳实践】：
   * 1. 若 itemStyle 设置了 LinearGradient 渐变，强烈建议保持 color 为 undefined (不传该参数)，
   *    ECharts 将自动继承 itemStyle 的渐变色，实现斜条纹跟随柱体/面积一起渐变的高质感效果。
   * 2. 若 itemStyle 为单色场景，必须传递与【系列同色调】的颜色 (如 'rgba(18, 173, 253, 0.85)')。
   * ⚠️【严禁】：绝对禁止使用纯白色 (如 'rgba(255, 255, 255, 0.85)') 作为条纹颜色，否则会产生突兀刺眼的纯白网格切割感。
   */
  color?: string;
  /** 背景填充颜色 (默认 'none'，背景透明以透出底层渐变) */
  backgroundColor?: string;
  /** 纹理基本图形 (默认 'rect'，可选 'line', 'circle', 'square', 'triangle', 'diamond' 等) */
  symbol?: string;
  /** 纹理符号缩放比例 (默认 1) */
  symbolSize?: number;
  /** 
   * 条纹线条间距与宽度配置：可传入数值(间距)或 [线宽, 间距]。
   * 💡 当 color 未设置 (使用默认继承渐变色) 时，默认最佳间距为 [4, 6]；若显式指定了 color，默认间距为 [2, 6]。
   */
  gap?: number | [number, number];
  /** X 轴方向 dash 阵列 (默认 [1, 0]) */
  dashArrayX?: (number | [number, number])[];
  /** Y 轴方向 dash 阵列 (若未指定则自动根据 gap 参数生成) */
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
 * // 1. itemStyle 为渐变色时：不传 color，条纹自动跟随 itemStyle 渐变色，gap 默认为 [4, 6]
 * option = {
 *   aria: createAriaStripeDecal({
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
 *
 * // 2. itemStyle 为单色时：必须传递与系列同色调的颜色，严禁使用纯白色
 * option = {
 *   aria: createAriaStripeDecal({
 *     color: 'rgba(18, 173, 253, 0.85)', // 传递与系列主色同调的颜色
 *     gap: [2, 6]
 *   })
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
    gap = color === undefined ? [4, 6] : [2, 6],
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
