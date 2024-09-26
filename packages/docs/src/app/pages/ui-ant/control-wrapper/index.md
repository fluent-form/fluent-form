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

`InputGroup` 的 `addons` 选项仅支持渲染**非控件**组件，若需在输入框的 `addons` 中渲染**控件**，请结合使用 `InputAddon` 组件。

{{ NgDocActions.demo("InputAddonExampleComponent") }}

## NumberGroup

`NumberGroup` 组件可以帮助您在表单中添加输入框的组合展现。

```ts
import { useNumberGroupWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("NumberGroupExampleComponent") }}

## Space

间距布局组件可以帮助您在控件之间添加间距，使表单更加美观。

```ts
import { useSpaceWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("SpaceExampleComponent") }}
