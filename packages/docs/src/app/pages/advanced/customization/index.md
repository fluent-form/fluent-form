{{ NgDocActions.demo("ZorroStyleComponent", { container: false }) }}

{% include "../../../markdowns/brand.md" %} 提供了强大的自定义视图渲染功能，无论是表单元素还是表单布局，都可以根据需要进行定制。

## 自定义模板

如果您需要使用自定义模板，首先需要导入 `FluentFormModule` 模块。然后，在 `<fluent-form>` 组件下使用 `[fluentTemplate]` 结构指令来注册自定义模板。

该指令会在 `<ng-template>` 上导出三个模板变量，分别是：`control`、`schema`、`model`。

您可以选择使用 `headless()` 或 `template()` 来渲染自定义模板。这两者的主要区别在于：

- `headless()` 是一个表单控件，它可以渲染模板并形成表单模型；
- `template()` 是一个组件，它仅用于渲染模板，不会形成表单模型。

{{ NgDocActions.demo("CustomTemplateExampleComponent") }}

## 自定义渲染

{% include "../../../markdowns/developer-preview.md" %}

如果您需要自定义表单布局，例如将表单控件渲染到表格单元格中，您可以使用自定义渲染功能。

要使用自定义渲染功能，您需要导入 `FluentFormRenderModule` 模块。该模块提供了以下指令：

- `[fluentSchema]` 指令：这是顶层表单，用于配置 `schema` 并绑定 `model`。
- `<fluent-outlet>` 指令：这是视图渲染出口，用于渲染表单元素视图。您可以使用参数 `key` 来指定要渲染的部分。

{{ NgDocActions.demo("CustomLayoutExampleComponent") }}

## 自定义部件

即将推出教程...
