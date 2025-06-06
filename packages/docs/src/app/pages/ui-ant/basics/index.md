{{ NgDocActions.demo("ZorroStyleComponent", { container: false }) }}

本节内容涵盖所有适用于表单控件的基本功能选项。这些功能选项可以帮助您更好地控制和管理您的表单控件。

## Label

通过使用 `label` 选项，您可以传入字符串或者一个对象来完全配置标签的样式，通过命名模板功能可以渲染自定义模板。

还可以使用 `tooltip` 选项来配置标签旁的提示信息。标签和提示信息可以帮助用户更好地理解控件的用途。

{{ NgDocActions.demo("LabelExampleComponent") }}

## Hint

底部提示可以提供额外的信息，帮助用户填写表单。使用 `hint` 选项来配置控件底部的提示信息。

{{ NgDocActions.demo("HintExampleComponent") }}

## Default Value

默认值可以帮助用户节省填写时间。使用 `defaultValue` 选项来配置控件的默认值。

{{ NgDocActions.demo("DefaultValueExampleComponent") }}

## Disabled

在某些情况下，您可能需要禁用某些控件。使用 `disabled` 选项来禁用控件，配合 `hidden` 选项可达到禁用控件的同时隐藏控件。

{{ NgDocActions.demo("DisabledExampleComponent") }}

## Update Timing

更新时机可以影响到表单的性能和用户体验。使用 `updateOn` 选项来配置控件值的更新时机，支持三种更新时机，默认为 `change`。

{{ NgDocActions.demo("UpdateOnExampleComponent") }}

## Form Validation

表单验证是保证数据质量的重要手段：

- 使用 `required` 选项来设置控件为必填项。
- 使用 `validators`、`asyncValidators` 选项来添加额外的验证器。
- 使用 `feedback` 选项来开启验证状态图标。
- 使用 `tips` 选项来设置验证提示，支持设置五种提示，分别有：`success` 、`warning`、`error`、`validating`、[`auto`](https://ng.ant.design/components/form/zh#components-form-demo-auto-tips)。
- 使用 `length` 选项来设置 `text-field` 和 `text-area` 控件的输入长度验证。
- 对于 `type` 为 `email` 的 `text-field` 控件，会自动添加邮箱验证。
- 如果控件处在 `input-group()` 中，此时只会显示一个控件的验证状态与提示。默认选用组内的第一个控件。

{{ NgDocActions.demo("ValidationExampleComponent") }}

## Format & Parse

> **NOTE**
> 这是一项高级功能，基于此功能我们可以定制一些简单的业务组件。

格式化与解析可以帮助您处理复杂的数据类型。使用 `mapper` 选项来设置控件的输入解析与格式化输出。

例如 `datePicker()` 控件将输出 `Date` 对象，但我们期望从输出中得到日期字符串：

{{ NgDocActions.demo("MapperExampleComponent") }}

> **WARNING**
> {% include "../../../markdowns/brand.md" %} 默认会将日期控件输出的 `Date` 对象转为时间戳，您可以使用 `mapper` 选项覆盖此行为。

## Multi keys

多字段控件可以帮助您处理复杂的数据结构。部分控件的控件值为一个数组，例如 `dateRangePicker()`、`cascader()` 控件等。

我们可以将数组里的每一个元素映射到模型（model）的多个**属性**当中，只需将一个字符串数组作为控件的 `key` 即可。

{{ NgDocActions.demo("MultiKeyExampleComponent") }}

## Object Path Keys

对象路径键可以帮助您构造包含子对象的表单。
在需要构造包含子对象的表单时，除了使用 `group()` 控件容器图示之外，还可以使用**对象路径键**作为控件图示的 `key`，这是一种更便捷、扁平的方法。

> **NOTE**
> **对象路径键**是一种使用特定规则编写的字符串，它通过 `.` 符号来连接对象的每一层路径。
>
> 例如：`'a.b'` 代表了在对象 `{ a: { b: 1 } }` 中的 `b` 属性。

{{ NgDocActions.demo("PathKeyExampleComponent") }}

## Lifecycle Hooks

使用 `hooks` 选项来设置组件生命周期钩子。`hooks` 选项接受一个对象，对象的键为钩子名称，值为一个钩子函数。

目前支持的钩子有：
- `onInit`：初始化时调用。
- `onDestroy`：销毁时调用。

{{ NgDocActions.demo("LifecycleHooksExampleComponent") }}

## Event Listener

{% include "../../../markdowns/brand.md" %} 目前提供了两种方式来侦听控件/组件的事件：

### Callback

使用 `listeners` 选项来侦听控件的事件。`listeners` 选项接受一个对象，对象的键为事件名，值为一个事件回调函数。

{{ NgDocActions.demo("EventListenerExampleComponent") }}

### Observable

如果您想要使用 RxJS 来处理事件，可以使用 `observers` 选项。`observers` 选项接受一个对象，对象的键为事件名，值为一个函数，函数的第一个参数为 `Observable`。

{{ NgDocActions.demo("EventObserverExampleComponent") }}

> **NOTE**
> 所有控件均支持 `valueChanges` 和 `statusChanges` 事件。除此之外，每个控件组件/元素还支持侦听其自身提供的特定事件。

## Form Linkage

表单联动可以帮助您实现复杂的交互效果。部分组件/控件的选项支持传入一个**函数**，以实现控件之间的联动。该函数接受一个对象作为输入参数，对象类型为 `{ model, control, schema }`。

> **WARNING**
> 并非所有选项都支持联动，我们仅会对必要的选项支持此功能，您可以根据选项的类型判断是否支持该联动。如有需要，请随时向我们[提出](https://github.com/fluent-form/fluent-form/issues)需求。

{{ NgDocActions.demo("LinkageExampleComponent") }}

值得注意的是，如果使用了 `value` 选项来联动控件值，此时控件的值将**完全**由 `value` 选项提供的函数逻辑控制，因此该控件应对用户来说是**只读**的（readonly）。
如果仍然需要允许用户输入，可以通过侦听控件的 `valueChange` 事件，并在事件回调函数中手动设置目标控件的值。

{{ NgDocActions.demo("LinkageByValueChangesExampleComponent") }}
