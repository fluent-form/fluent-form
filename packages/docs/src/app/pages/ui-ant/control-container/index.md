{{ NgDocActions.demo("ZorroStyleComponent", { container: false }) }}

在本章节中，我们将展示一些控件容器的基本使用示例。

{% include "../../../markdowns/brand.md" %} 目前支持 `FormGroup` 与 `FormArray` 两种控件容器。

## FormGroup

`FormGroup` 是包含一组命名的 `FormControl` 的表单组合，子控件可以通过名称进行访问和操作。

使用 `group()` 函数，您可以创建支持嵌套的表单组。

```ts
import { useFormGroupWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("FormGroupExampleComponent") }}

### 顶层表单

顶层表单实际上也是一个 `FormGroup`，是通过 `form()` 函数自动创建的。

如果您需要配置顶层表单的行为，例如验证器和更新时机，可以使用 `applyGroup()` 函数。

{{ NgDocActions.demo("RootFormExampleComponent") }}

您还可以使用 `layout` 选项来配置表单项目的布局行为，默认为 `vertical`。

{{ NgDocActions.demo("FormLayoutExampleComponent") }}

## FormArray

`FormArray` 是包含一组有序 `FormControl` 的表达数组，子控件可以通过索引进行访问和操作。

### 列表型

使用 `array()` 函数，您可以轻松地配置列表型的数组表单。这种类型的表单支持增减元素、嵌套、**拖拽排序**以及长度限制：

- 使用 `length` 选项配置数组元素长度限制，支持传入一个数字或一个配置对象。
- 使用 `addable` / `removable` 选项配置是否启用增删元素。
- 使用 `orderable` 选项配置是否启用拖拽排序（目前仅支持一维拖拽，参见 [#13372](https://github.com/angular/components/issues/13372)）。

```ts
import { useFormArrayWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("FormArrayExampleComponent") }}

### 标签页型

使用 `tabsArray()` 函数，您可以轻松地配置标签页样式的数组表单。这种类型的表单支持增减元素、嵌套以及长度限制。

- 使用 `length` 选项配置数组元素长度限制，支持传入一个数字或一个配置对象。
- 使用 `addable` / `removable` 选项配置是否启用增删元素。

```ts
import { useTabsArrayWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("TabsArrayExampleComponent") }}

### 卡片型

使用 `cardsArray()` 函数，您可以轻松地配置卡片样式的数组表单。这种类型的表单支持增减元素、嵌套、**拖拽排序**以及长度限制。

- 必须搭配 `card()` 组件使用。
- 使用 `length` 选项配置数组元素长度限制，支持传入一个数字或一个配置对象。
- 使用 `addable` / `removable` 选项配置是否启用增删元素。
- 使用 `orderable` 选项配置是否启用拖拽排序（目前仅支持一维拖拽，参见 [#13372](https://github.com/angular/components/issues/13372)）。

```ts
import { useCardsArrayWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("CardsArrayExampleComponent") }}
