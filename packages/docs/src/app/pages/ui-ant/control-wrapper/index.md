# {{ NgDocPage.title }}

{{ NgDocActions.demo("ZorroStyleComponent", { container: false }) }}

在本章节中，我们将展示一些控件包装器的基本使用示例。

## InputGroup

`InputGroup` 组件可以帮助您在表单中添加输入框的组合展现。

```ts
import { useInputGroupWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("InputGroupExampleComponent") }}

### InputAddon

将 `inputGroup()` 与 `inputAddon()` 组件组合使用，可以实现在 `addons` 中渲染**控件**。

{{ NgDocActions.demo("InputAddonExampleComponent") }}

## Space

间距布局组件可以帮助您在控件之间添加间距，使表单更加美观。

```ts
import { useSpaceWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("SpaceExampleComponent") }}
