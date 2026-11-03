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

## Collapse

折叠面板适合将较长的表单划分为多个可展开、收起的区域。通过结合使用 `collapse()` 和 `collapsePanel()`，您可以构建按主题分组的表单。

```ts
import { useCollapseWidget } from '@fluent-form/ui-zorro';
```

### Basic Usage

使用 `header` 设置面板标题，使用 `active(true)` 让面板默认展开。默认情况下，多个面板可以同时展开，面板内的控件支持栅格布局。

`collapse()` 和 `collapsePanel()` 仅用于组织表单的展示结构。需要在模型中创建嵌套对象时，可以在面板内使用 `group()`，如下例中的 `contact`。

{{ NgDocActions.demo("CollapseFormExampleComponent") }}

### Accordion

设置 `accordion(true)` 后，同一时间只能展开一个面板。

{{ NgDocActions.demo("CollapseAccordionExampleComponent") }}
