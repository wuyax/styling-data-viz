# 「幻紫」赛博霓虹大屏设计规范 (Huanzi Specification)

「幻紫」主题设计规范，融合赛博朋克霓虹美学、电光蓝紫发光体与科幻机甲质感，专为智能算力中心、元宇宙、赛博极客、高精尖科技、AI / 机器人驾驶舱打造。

---

## 1. 核心视觉概念 (Visual Concept)

- **意境定位**：赛博霓虹、电光幻紫、极光高亮、科技机甲。
- **背景底色**：深极紫黑背景 (`#030611` / `#090b1e`)，带有星空点阵、极光暗纹与激光网格线。
- **框体装饰**：斜角切角机甲边框、双向折线角标、电光蓝发光卡槽线。

---

## 2. 「幻紫」色彩体系 (Color Palette Architecture)

### 基础中性与文本色
```css
--huanzi-bg: #030611;            /* 深极紫黑背景 */
--huanzi-card-bg: rgba(10, 15, 36, 0.75); /* 暗紫蓝玻璃卡片 */
--huanzi-card-border: rgba(97, 164, 255, 0.3); /* 电光蓝发光细边框 */
--huanzi-text-primary: #ffffff;  /* 纯白主标题 */
--huanzi-text-sub: #61a4ff;      /* 电光海蓝副标题与关键说明 */
--huanzi-text-muted: #919fba;    /* 灰蓝坐标轴与辅助说明 */
```

### 图表主色盘 (Primary Series Colors)
按数据列次序依次选用：
1. **电光海蓝** (Cyber Blue): `#61a4ff` —— 核心趋势/第一系列/主力焦点
2. **柔紫蓝 / 薰衣草蓝** (Lavender Blue): `#7c95ff` —— 第二系列/渐变折线
3. **霓虹粉紫** (Neon Pink Purple): `#d8a6ff` —— 第三系列/TOP 1 标号/强调序列
4. **暖亮金黄** (Warm Amber Gold): `#ffde8d` —— 第四系列/预警高亮
5. **极光浅蓝白** (Aurora White): `#dee4ff` —— 第五系列/对比基准
6. **幻紫** (Phantom Purple): `#aaacff` —— 第六序列/辅助序列

### 状态色 (Status Colors)
- **正常 / 成功 / 上升**：电光青蓝 (`#78dbf0`) | 指示: `▲ 61.59%`
- **告警 / 危险 / 下降**：霓虹粉红 (`#f86185`) | 指示: `▼ 14.14%`

---

## 3. 「幻紫」字体与排版规范 (Typography System)

### 标题字体 (Title Font Family)
优先选用无衬线高对比度科技标题字（如优设标题黑或方正正黑）：
```javascript
fontFamily: '"优设标题黑", "YouSheTitleBlack", "PingFang SC", "Microsoft YaHei", sans-serif'
```
- **大标题 (Header 1)**: `44px`，配合斜角机甲 Header 框架。
- **二级标题 (Header 2)**: `24px`，左侧带有电光蓝双向折线标示。
- **三级标题 (Header 3)**: `20px`，卡片组名。

### 阅读与坐标轴字体 (Body Font Family)
```javascript
fontFamily: '"Source Han Sans SC", "思源黑体 SC", "Microsoft YaHei", sans-serif'
```
- **重要正文**: `18px`
- **普通正文**: `14px`
- **次要/坐标轴**: `12px`

### 数字与指标数据字体 (Metrics & Tabular Numbers)
```javascript
fontFamily: '"DINPro-Medium", "D-DIN", Roboto, monospace',
fontFeatureSettings: '"tnum"'
```
- **一级指标数据**: `28px` (`#ffffff` 纯白或 `#61a4ff` 电光蓝)
- **二级指标数据**: `24px`
- **三级指标数据**: `20px`
- **图表数字与坐标**: `14px`

---

## 4. 特色组件与图表质感 (Huanzi Chart Characteristics)

1. **三维三角柱图 (Pictorial Triangle Bar Chart)**：
   - 柱体采用 `pictorialBar` 锥形/三角形 (`path://M0,10 L5,0 L10,10 Z`)，填充 `#d8a6ff` (霓虹粉紫) 到 `#61a4ff` (电光蓝) 的渐变色。
2. **玉珏图 / 嵌套多层发光环形图 (Multi-ring Gauge Chart)**：
   - 多层色彩渐变发光圆弧层叠（亮蓝、幻紫、霓虹粉、金黄），展示占比或多维维度。
3. **电光连线与气泡散点 (Neon Bubble Scatter)**：
   - 发光空心圆环气泡，高光节点带 `shadowBlur: 15` 发光晕。
