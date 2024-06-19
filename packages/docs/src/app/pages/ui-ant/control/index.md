# {{ NgDocPage.title }}

{{ NgDocActions.demo("ZorroStyleComponent", { container: false }) }}

本节内容涵盖所有适用于表单控件的基本功能选项。这些功能选项可以帮助您更好地控制和管理您的表单控件。

## 控件标签

通过使用 `label` 选项，您可以传入字符串或者一个对象来完全配置标签的样式。

还可以使用 `tooltip` 选项来配置标签旁的提示信息。标签和提示信息可以帮助用户更好地理解控件的用途。

{{ NgDocActions.demo("ControlLabelExampleComponent") }}

## 底部提示

底部提示可以提供额外的信息，帮助用户填写表单。使用 `hint` 选项来配置控件底部的提示信息。

{{ NgDocActions.demo("ControlHintExampleComponent") }}

## 默认值

默认值可以帮助用户节省填写时间。使用 `defaultValue` 选项来配置控件的默认值。

{{ NgDocActions.demo("ControlDefaultValueExampleComponent") }}

## 禁用控件

在某些情况下，您可能需要禁用某些控件。使用 `disabled` 选项来禁用控件，配合 `hidden` 选项可达到禁用控件的同时隐藏控件。

{{ NgDocActions.demo("ControlDisabledExampleComponent") }}

## 更新时机

更新时机可以影响到表单的性能和用户体验。使用 `updateOn` 选项来配置控件值的更新时机，支持三种更新时机，默认为 `change`。

{{ NgDocActions.demo("ControlUpdateOnExampleComponent") }}

## 表单验证

表单验证是保证数据质量的重要手段：

- 使用 `required` 选项来设置控件为必填项。
- 使用 `validators`、`asyncValidators` 选项来添加额外的验证器。
- 使用 `feedback` 选项来开启验证状态图标。
- 使用 `tips` 选项来设置验证提示，支持设置五种提示，分别有：`success` 、`warning`、`error`、`validating`、[`auto`](https://ng.ant.design/components/form/zh#components-form-demo-auto-tips)。
- 使用 `length` 选项来设置 `text()` 和 `textarea()` 控件的输入长度验证。
- 对于 `type` 为 `email` 的 `text()` 控件，会自动添加邮箱验证。
- 如果控件处在 `input-group()` 中，此时只会显示一个控件的验证状态与提示。默认选用组内的第一个控件，可以使用 `primary` 选项指定其他控件。

{{ NgDocActions.demo("ControlValidationExampleComponent") }}

## 格式化与解析

> **NOTE**
> 这是一项高级功能，基于此功能我们可以定制一些简单的业务组件。

格式化与解析可以帮助您处理复杂的数据类型。使用 `mapper` 选项来设置控件的输入解析与格式化输出。

例如 `date()` 控件将输出 `Date` 对象，但我们期望从输出中得到日期字符串：

{{ NgDocActions.demo("ControlMapperExampleComponent") }}

> **WARNING**
> {% include "../../../markdowns/brand.md" %} 默认会将日期控件输出的 `Date` 对象转为时间戳，您可以使用 `mapper` 选项覆盖此行为。

## 多字段控件

多字段控件可以帮助您处理复杂的数据结构。部分控件的控件值为一个数组，例如 `dateRange()`、`cascader()` 控件等。

我们可以将数组里的每一个元素映射到模型（model）的多个**属性**当中，只需将一个字符串数组作为控件的 `key` 即可。

{{ NgDocActions.demo("ControlMultiKeyExampleComponent") }}

## 对象路径键

对象路径键可以帮助您构造包含子对象的表单。
在需要构造包含子对象的表单时，除了使用 `group()` 控件容器图示之外，还可以使用**对象路径键**作为控件图示的 `key`，这是一种更便捷、扁平的方法。

> **NOTE**
> **对象路径键**是一种使用特定规则编写的字符串，它通过 `.` 符号来连接对象的每一层路径。
>
> 例如：`'a.b'` 代表了在对象 `{ a: { b: 1 } }` 中的 `b` 属性。

{{ NgDocActions.demo("ControlPathKeyExampleComponent") }}

## 表单联动

表单联动可以帮助您实现复杂的交互效果。部分组件/控件的选项支持传入一个函数，以实现控件之间的联动。该函数接受一个对象作为输入参数，对象类型为 `{ model, control, schema }`。

并非所有选项都支持联动，我们仅会对必要的选项支持此功能，您可以根据选项的类型判断是否支持该联动。

{{ NgDocActions.demo("ControlLinkageExampleComponent") }}

## 选择器控件

### 远程数据

以下是一个带有远程搜索，节流控制，请求时序控制，加载状态的示例。

{{ NgDocActions.demo("ControlSelectRemoteDataExampleComponent") }}

### 自定义视图

使用 `option` 选项自定义选项视图。

{{ NgDocActions.demo("ControlSelectCustomOptionContentExampleComponent") }}
