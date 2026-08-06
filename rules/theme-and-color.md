# 「群青」可视化大屏设计系统与排版规范 (Ultranavy Specification)

「群青」主题设计规范，涵盖色彩系统、字阶体系与大屏组件视觉规范。

---

## 1. 「群青」色彩体系 (Color Palette Architecture)

### 基础中性与文本色
```css
--qunqing-bg: #050e17;        /* 群青极暗科技底色 */
--qunqing-card-bg: rgba(10, 25, 47, 0.65); /* 玻璃卡片背景 */
--qunqing-card-border: rgba(18, 173, 253, 0.2); /* 科技发光边框 */
--qunqing-text-primary: #f0f0f0;  /* 核心标题/纯白文本 */
--qunqing-text-sub: #cde1f8;      /* 副标题/浅冰蓝关键数字 */
--qunqing-text-muted: #8299b1;    /* 坐标轴/辅助灰蓝说明 */
```

### 图表主色盘 (Primary Series Colors)
按数据列次序依次选用：
1. **天蓝发光色** (Cyan Glow): `#12adfd` —— 核心趋势/第一系列
2. **群青电光青** (Ultra Cyan): `#11c3dd` —— 占比高亮/第二系列
3. **沉稳橙金** (Amber Gold): `#e68513` —— 重点对比/TOP 1 标号
4. **靛蓝宝蓝** (Indigo Blue): `#5592f7` —— 平稳序列/第四系列
5. **翡翠生机绿** (Emerald Green): `#18db6c` —— 成功/正常/第五系列
6. **柔和钛灰蓝** (Slate Blue): `#83aad8` —— 辅助/基准线

### 状态色 (Status Colors)
- 正常/已解决：`#18db6c`
- 解决中/警示：`#e68513`
- 处理中/待解决：`#12adfd`
- 已失效/中性：`#8299b1`
- 错误/危险：`#db3418`

---

## 2. 「群青」字体与排版规范 (Typography System)

### 标题字体 (Title Font Family)
优先加载 `抖音美好体` 或系统高对比度黑体：
```javascript
// Header / Section Titles
fontFamily: '抖音美好体, "PingFang SC", "Microsoft YaHei", sans-serif'
```
- **一级标题 (HEADER)**: `40px`, 居中/切角标题栏
- **二级标题 (TITLE)**: `24px`, 卡片头部
- **三级标题 (SUBTITLE)**: `20px`, 组名/次级标题

### 阅读与坐标轴字体 (Body & Label Font Family)
使用 `思源黑体 SC`：
```javascript
fontFamily: '"Source Han Sans SC", "思源黑体 SC", "PingFang SC", sans-serif'
```
- **重要标签**: `W20` 字重, `16px`
- **正常说明**: `W16` 字重, `14px`
- **次要/坐标轴刻度**: `W16` 字重, `12px`

### 关键数字与 KPI 字体 (Metrics & Tabular Numbers)
数值指标强强制使用等宽数字字体 `D-DIN`：
```javascript
fontFamily: 'D-DIN, "DIN Alternate", Roboto, monospace',
fontFeatureSettings: '"tnum"'
```
- **核心重点 KPI**: `D-DIN Bold` | `24px`
- **常规图表数值**: `D-DIN Bold/Regular` | `20px`
- **辅助小数字**: `D-DIN Regular` | `14px`
- **涨跌幅指示徽章**: `D-DIN Bold` | `14px - 16px`
