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

## Grid Column

在表单中，每个组件/控件都是行（row）内的一列（column）。您可以使用 `col` 选项来配置列的 `flex`、`offset`、`span` 等属性。
`flex` 属性用于设置列的弹性布局，`offset` 属性用于设置列的偏移量，而 `span` 属性用于设置列的宽度。

{{ NgDocActions.demo("GridColExampleComponent") }}

## Grid Row

可以使用 `row()` 组件来创建新的栅格行，栅格行内的列会自动换行，您可以使用：

- `justify` 选项设置栅格的水平对齐方式。
- `align` 选项设置栅格的垂直对齐方式。

{{ NgDocActions.demo("GridRowExampleComponent") }}

## Root Grid

在表单中，顶层栅格行是由 `group()` 组件创建的，您可以使用 `it` 参数配置顶层表单，进而配置顶层栅格。

> **NOTE**
> `group()` 在功能上**继承**了 `row()` 组件，因此您可以在 `group()` 上使用 `row()` 组件的 `justify` 和 `align` 选项来配置栅格行为。

{{ NgDocActions.demo("GridLayoutExampleComponent") }}

## Grid Gap

使用 `gap` 选项可以为栅格列（column）之间添加间距。在表单中，`gap` 的默认值为一组响应式配置：`{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }`，您可以根据需要自定义间距。

{{ NgDocActions.demo("GridGapExampleComponent") }}

## Grid Offset

使用 `offset` 选项可以为栅格列（column）添加水平偏移量。

{{ NgDocActions.demo("GridOffsetExampleComponent") }}

## Grid Responsive

`gap` 与 `col` 选项都支持响应式配置，您可以根据需要为每个断点设置不同的值。共支持六个屏幕响应断点（xs、sm、md、lg、xl、xxl）。

{{ NgDocActions.demo("GridResponsiveExampleComponent") }}

在实际项目中，我们建议您根据内容的复杂性和屏幕尺寸的变化来灵活使用这个栅格系统。记住，一个好的布局应该在所有屏幕尺寸上都能提供良好的用户体验。
