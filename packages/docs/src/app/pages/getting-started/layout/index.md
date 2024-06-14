# {{ NgDocPage.title }}

{{ NgDocActions.demo("ZorroStyleComponent", { container: false }) }}

{% include "../../../markdowns/brand.md" %} 内置了一个包含 12 列的栅格系统（Grid System），支持六个屏幕响应断点（xs、sm、md、lg、xl、xxl）。

该系统由 `<fluent-row>` 和 `<fluent-col>` 组件构成，整个表单布局是建立在该栅格系统之上的。`<fluent-row>` 组件代表一个栅格行，而 `<fluent-col>` 组件代表栅格行内的一列。例如：

```html
<fluent-row>
  <fluent-col span="4">...</fluent-col>
  <fluent-col span="4">...</fluent-col>
  <fluent-col span="4">...</fluent-col>
</fluent-row>
```
> **Note**
> 您通常**不会**直接使用这两个组件，只需简单地配置您的表单图示，`<fluent-form>` 组件就会自动为您生成相应的栅格行和列。

## 栅格列

在表单中，每个组件/控件都是行（row）内的一列（column）。你可以使用 `col` 选项来配置列的 `flex`、`offset`、`span` 等属性。
`flex` 属性用于设置列的弹性布局，`offset` 属性用于设置列的偏移量，而 `span` 属性用于设置列的宽度。

{{ NgDocActions.demo("GridColExampleComponent") }}

## 栅格行

可以使用 `row()` 组件来创建新的栅格行，栅格行内的列会自动换行。

{{ NgDocActions.demo("GridRowExampleComponent") }}

## 顶层栅格

你可以使用 `group()` 的 `justify` 和 `align` 选项来配置顶层栅格的行为。`justify` 选项用于设置栅格的水平对齐方式，而 `align` 选项用于设置栅格的垂直对齐方式。

{{ NgDocActions.demo("GridLayoutExampleComponent") }}

在实际项目中，我们建议你根据内容的复杂性和屏幕尺寸的变化来灵活使用这个栅格系统。记住，一个好的布局应该在所有屏幕尺寸上都能提供良好的用户体验。
