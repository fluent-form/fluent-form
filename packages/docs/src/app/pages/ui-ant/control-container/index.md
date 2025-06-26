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

### Root Form

顶层表单实际上也是一个 `FormGroup`，是通过 `form()` 函数自动创建的。

如果您需要配置顶层表单的行为，例如验证器和更新时机，可以使用 `applyGroup()` 函数。

{{ NgDocActions.demo("RootFormExampleComponent") }}

您还可以使用 `layout` 选项来配置表单项目的布局行为，默认为 `vertical`。

{{ NgDocActions.demo("FormLayoutExampleComponent") }}

## FormArray

`FormArray` 是包含一组有序 `FormControl` 的表达数组，子控件可以通过索引进行访问和操作。

### List Type

列表型数组表单是最常见的数组表单类型，适用于需要以列表形式展示数据的场景。

使用 `array()` 函数，您可以轻松地配置列表型的数组表单。这种类型的表单支持丰富的交互功能，包括：

- **增删操作**：使用 `addable` / `removable` 选项控制是否允许增删行数据
- **拖拽排序**：使用 `orderable` 选项控制是否启用拖拽排序功能
- **长度限制**：可通过 `length` 选项设置最大/最小行数（支持数字或配置对象）

```ts
import { useFormArrayWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("FormArrayExampleComponent") }}

### Tabs Type

标签页型数组表单是以标签页的形式展示一组相关数据的表单类型，适用于需要在多个视图之间切换的场景。

使用 `tabsArray()` 函数，您可以轻松地配置标签页样式的数组表单。这种类型的表单支持丰富的交互功能，包括：

- **增删操作**：使用 `addable` / `removable` 选项控制是否允许增删行数据
- **拖拽排序**：使用 `orderable` 选项控制是否启用拖拽排序功能
- **长度限制**：可通过 `length` 选项设置最大/最小行数（支持数字或配置对象）

```ts
import { useTabsArrayWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("TabsArrayExampleComponent") }}

### Cards Type

卡片型数组表单是以卡片的形式展示一组相关数据的表单类型，适用于需要以分块展示数据的场景。

使用 `cardsArray()` 与 `card()` 函数，您可以轻松地配置卡片样式的数组表单。这种类型的表单支持丰富的交互功能，包括：

- **增删操作**：使用 `addable` / `removable` 选项控制是否允许增删行数据
- **拖拽排序**：使用 `orderable` 选项控制是否启用拖拽排序功能
- **长度限制**：可通过 `length` 选项设置最大/最小行数（支持数字或配置对象）

```ts
import { useCardsArrayWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("CardsArrayExampleComponent") }}

### Table Type

表格表单是一种特殊的数组表单类型，适用于需要以表格形式展示数据的场景。

由于表格布局的特殊性，您需要使用以下图示函数来构建表格数组表单：

- `tableArray()` - 创建表格数组容器，对应 `ControlArray` 类型，数据结构为 `Array` 类型
- `tableRowGroup()` - 定义表格行的结构，对应 `ControlGroup` 类型，数据结构为 `Object` 类型
- `tableColumn()` - 配置表格列，包括列标题和列内容

通过这些函数的组合使用，您可以轻松构建功能完整的表格表单。表格表单支持丰富的交互功能，包括：

- **增删操作**：使用 `addable` / `removable` 选项控制是否允许增删行数据
- **拖拽排序**：使用 `orderable` 选项控制是否启用拖拽排序功能
- **长度限制**：可通过 `length` 选项设置最大/最小行数（支持数字或配置对象）

```ts
import { useTableArrayWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("TableArrayExampleComponent") }}
