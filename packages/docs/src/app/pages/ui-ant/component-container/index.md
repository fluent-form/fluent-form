# {{ NgDocPage.title }}

{{ NgDocActions.demo("ZorroStyleComponent", { container: false }) }}

在本章节中，我们将展示一些组件容器的基本使用示例。

## Steps

当表单包含大量控件时，为了提升用户体验，我们可以将表单分解为多个步骤。这时，我们可以结合使用 `steps()` 和 `step()` 组件来构建分步表单。


```ts
import { useStepsWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("StepByStepFormExampleComponent") }}

## Tabs

标签页表单是一种在同一区域内切换不同表单的有效方式。通过结合使用 `tabs()` 和 `tab()` 组件，您可以轻松地构建出这种类型的表单界面。

```ts
import { useTabsWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("TabsFormExampleComponent") }}
