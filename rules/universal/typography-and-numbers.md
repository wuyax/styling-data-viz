# 图表数字与排版规范 (Universal Typography & Numbers Spec)

本文件规定大屏 ECharts 所有图表中数值、KPI、坐标轴标签与标题的字体族、字阶与等宽数字对齐规范。

---

## 1. 等宽数字铁律 (Tabular Numbers Spec)

在大屏动态更新或多列图例/Tooltip 对齐场景中，变宽数字会导致字宽频繁跳动与错位。

* **强制等宽数字字体**：所有 KPI 大字、Y 轴刻度、图例百分比、Tooltip 绝对数值必须统一配置：
  ```javascript
  fontFamily: 'D-DIN, DINPro-Medium, Roboto, monospace',
  fontFeatureSettings: '"tnum"'
  ```
* **百分比与小数精度**：大屏百分比保留 1 位小数（如 `88.4%`）；金额大字配置万/亿单位缩写格式化。

---

## 2. 三大风格标题字体映射 (Title Typography Mapping)

根据当前匹配的视觉风格使用对应的标题字体栈：

| 风格 Token | 风格名称 | 标题字体栈 (Title Font Family) | 风格意境 |
|---|---|---|---|
| `qunqing` | **「群青」科技暗蓝** | `抖音美好体, "PingFang SC", "Microsoft YaHei", sans-serif` | 现代科技黑体/硬朗高对比 |
| `guofeng` | **「国风」水墨青绿** | `"KaiTi", "楷体", "STKaiti", "Source Han Serif SC", "思源宋体", serif` | 古典楷体/宋体韵味 |
| `huanzi` | **「幻紫」赛博霓虹** | `"优设标题黑", "YouSheTitleBlack", "PingFang SC", sans-serif` | 赛博机甲/未来沉浸 |

---

## 3. 字阶与字重体系 (Font Hierarchy)

```css
/* 字阶规范 */
--font-size-kpi: 32px ~ 40px;   /* 核心 KPI 大数字 */
--font-size-title-1: 24px;       /* 卡片主标题 */
--font-size-title-2: 18px ~ 20px;/* 分组次标题 */
--font-size-body: 14px;          /* 正文与重要 Tooltip */
--font-size-caption: 12px;       /* 坐标轴刻度与图例说明 */
```
