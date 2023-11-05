---
title: 自定义视图
order: 6
---

无论是表单元素还是表单布局，`ngx-fluent-form` 都提供了渲染自定义视图的功能。

## 自定义模板

要使用自定义模板功能，您需要导入 `FluentFormModule` 模块，然后在 `<fluent-form>` 组件下使用 `[fluentTemplate]` 结构指令来注册自定义模板。

该指令会在 `<ng-template>` 上导出三个模板变量，分别是：`control`、`schema`、`model`。

您可以选择使用 `headless()` 或 `template()` 来渲染自定义模板，两者的区别在于：

- `headless()` 是一个表单控件，可以渲染模板并形成表单模型；
- `template()` 是一个组件，仅用于渲染模板，不会形成表单模型。

<example name="fluent-form-custom-template-example" />

## 自定义布局 <label type="danger">Developer Preview</label>

`<fluent-form>` 组件的布局是基于栅格布局构建的，但有时候我们希望能够将表单渲染在其他布局当中，例如表格布局。

要使用自定义布局功能，您需要导入 `FluentFormLayoutModule` 模块，该模块提供了以下指令：

- `[fluent-form]` 指令：表示顶层表单，用于配置 `schema` 与绑定 `model`。
- `<fluent-outlet>` 指令：表示视图渲染出口，用于渲染表单元素视图，使用参数 `key` 指定要渲染的部分。

<example name="fluent-form-custom-layout-example" />

## 自定义部件

即将推出...
