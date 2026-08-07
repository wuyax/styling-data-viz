# 「国风」水墨青绿山水大屏设计规范 (Guofeng Specification)

「国风」主题设计规范，融合中式古典美学、水墨丹青与青绿山水意境，专为生态环境、智慧文旅、乡村振兴、数字故宫、传统文化等大屏驾驶舱打造。

---

## 1. 核心视觉概念 (Visual Concept)

- **意境定位**：水墨丹青、青绿山水、典雅沉静。
- **背景底色**：深邃墨青色背景 (`#040a0e` / `#06121a`)，融合暗淡山水轮廓或宣纸墨晕质感。
- **框体装饰**：中式飞檐切角、云纹/双菱形边饰（如 `◆ 二级标题 ◆`）、细金边/翡翠边包框。

---

## 2. 「国风」色彩体系 (Color Palette Architecture)

### 基础中性与文本色
```css
--guofeng-bg: #040a0e;           /* 深墨青背景 */
--guofeng-card-bg: rgba(6, 18, 26, 0.75); /* 暗墨色玻璃卡片 */
--guofeng-card-border: rgba(48, 181, 150, 0.25); /* 翡翠发光细框 */
--guofeng-text-primary: #eef4f0; /* 玉白主标题/核心文本 */
--guofeng-text-sub: #d6c398;     /* 米金/淡金副标题与关键数字 */
--guofeng-text-muted: #76b5a6;   /* 青灰/竹灰坐标轴与辅助文字 */
```

### 图表主色盘 (Primary Series Colors)
按数据列次序依次选用：
1. **黛绿 / 翡翠青绿** (Jade Green): `#30b596` —— 核心趋势/生态指标/第一系列
2. **湖蓝 / 霁蓝** (Lake Blue): `#4892bd` —— 水质/空气/第二系列
3. **藤黄 / 鎏金** (Amber Gold): `#c0b65d` —— 重点对比/TOP 1 标号/第三系列
4. **靛蓝 / 花青** (Indigo Blue): `#4861bd` —— 沉稳序列/第四系列
5. **竹绿 / 嫩绿** (Bamboo Green): `#69bc5e` —— 生态绿化/成功状态/第五系列
6. **香芋紫 / 紫藤** (Lavender Purple): `#c8bce7` —— 辅助/多维对比/第六系列

### 延展配色库 (Extended Colors)
- `#76b5a6` (青灰), `#7ba4bd` (灰蓝), `#d6c398` (米金), `#7e8cbd` (灰紫蓝), `#93bd8e` (灰绿), `#d2d1d4` (银灰)

### 状态色 (Status Colors)
- **正常 / 良好**：碧绿/青绿 (`#6cc7b1`)
- **预警 / 中度**：藤黄/米金 (`#c0b65d`)
- **告警 / 异常**：朱红/丹砂 (`#e77a6c`)

---

## 3. 「国风」字体与排版规范 (Typography System)

### 标题字体 (Title Font Family)
优先选用带典雅韵味的中文字体（如楷体、宋体或方正楷体）：
```javascript
fontFamily: '"KaiTi", "楷体", "STKaiti", "Source Han Serif SC", "思源宋体", serif'
```
- **大标题 (Header 1)**: `40px`，配合卷轴/飞檐 Header 居中放置。
- **二级标题 (Header 2)**: `24px`，格式例：`◆ 二级标题 ◆`，左右附带双菱形或中式云纹角标。
- **三级标题 (Header 3)**: `20px`，卡片内分组说明。

### 阅读与坐标轴字体 (Body Font Family)
```javascript
fontFamily: '"Source Han Sans SC", "思源黑体 SC", "Microsoft YaHei", sans-serif'
```
- **重要阅读文字**: `18px`
- **普通阅读文字**: `14px`
- **次要/坐标轴文字**: `12px`

### 数字与数值展示 (Numeric System)
```javascript
fontFamily: 'D-DIN, "DIN Alternate", "Roboto", monospace',
fontFeatureSettings: '"tnum"'
```
- **标题性能/大数字**: `24px` (米金色 `#d6c398` 或玉白 `#eef4f0`)
- **普通指标数字**: `20px`
- **普通图表数字**: `14px`
- **升降标号展示**: `▼ 78` (翡翠绿), `▲ 65` (朱红)

---

## 4. 特色组件与图表质感 (Guofeng Chart Characteristics)

1. **渐变云雾面积图**：
   - 使用线性渐变 `echarts.graphic.LinearGradient(0, 0, 0, 1)`，顶部为发光翡翠绿 `#30b596`，衰减至 `rgba(48, 181, 150, 0)`。
2. **切口/发光环形图**：
   - 环形带有发光波纹（如水波率 `11%` 圆环）。
3. **水墨 2D/3D 地图**：
   - 地图区块采用深墨绿 `#0a1d1a`，高亮边界采用翡翠绿 `#30b596` 或浅金 `#c0b65d`，云雾风效果搭配流光飞线。
