/**
 * 「群青」无缝科技斜条纹 Pattern 生成器 (Seamless Stripe Pattern Generator)
 * 支持纯透明背景，可完美与 LinearGradient 渐变层叠加组合！
 */

export interface StripePatternOptions {
  /** 条纹线条颜色 (支持 rgba, hex) */
  mainColor: string;
  /** 背景填充颜色 (支持 rgba, hex 或 'transparent') */
  bgColor?: string;
  /** 倾斜角度 (度数, 默认 45°, 常用 30, 45, 60) */
  angle?: number;
  /** 密疏程度: 'dense'(密) | 'medium'(中等) | 'sparse'(疏) 或自定义间距数值 (像素px) */
  density?: 'dense' | 'medium' | 'sparse' | number;
  /** 条纹线宽 (像素px, 默认 2) */
  lineWidth?: number;
}

/**
 * 创建无缝 ECharts 图表 Pattern 对象
 */
export const createStripePattern = (options: StripePatternOptions) => {
  const {
    mainColor = 'rgba(255, 255, 255, 0.35)',
    bgColor = 'transparent',
    angle = 45,
    density = 'medium',
    lineWidth = 2
  } = options;

  // 1. 映射间距 Pitch (法向距离)
  let pitch = 12;
  if (typeof density === 'number') {
    pitch = density;
  } else if (density === 'dense') {
    pitch = 7;
  } else if (density === 'sparse') {
    pitch = 18;
  }

  // 2. 角度换算与三角函数推导
  const clampedAngle = Math.max(5, Math.min(85, angle));
  const rad = (clampedAngle * Math.PI) / 180;

  // 3. 自动推导无缝平铺的整数 Width 和 Height
  const width = Math.max(4, Math.round(pitch / Math.sin(rad)));
  const height = Math.max(4, Math.round(width * Math.tan(rad)));

  // SSR 环境安全防护
  if (typeof document === 'undefined') {
    return {
      image: null,
      repeat: 'repeat' as const
    };
  }

  // 4. 离屏 Canvas 无缝绘制
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.clearRect(0, 0, width, height);
    if (bgColor !== 'transparent') {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
    }

    // 斜线条纹
    ctx.strokeStyle = mainColor;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();

    ctx.moveTo(0, height);
    ctx.lineTo(width, 0);

    ctx.moveTo(-width / 2, height / 2);
    ctx.lineTo(width / 2, -height / 2);

    ctx.moveTo(width / 2, (3 * height) / 2);
    ctx.lineTo((3 * width) / 2, height / 2);

    ctx.stroke();
  }

  return {
    image: canvas,
    repeat: 'repeat' as const
  };
};
