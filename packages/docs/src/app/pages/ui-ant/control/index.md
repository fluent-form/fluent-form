{{ NgDocActions.demo("ZorroStyleComponent", { container: false }) }}

在本章节中，我们将展示一些控件的基本使用示例。

## Text Field

文本框允许用户通过鼠标或键盘输入内容，是最基础的表单域。

```ts
import { useTextFieldWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("TextFieldExampleComponent") }}

### Variants

文本框支持多种样式变体：`outlined`、`filled`、`borderless`、`underlined`。您可以通过 `variant` 选项来设置文本框的样式变体。

{{ NgDocActions.demo("TextFieldVariantExampleComponent") }}

## Text Area

文本域允许用户通过鼠标或键盘输入内容，是最基础的表单域。

```ts
import { useTextAreaWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("TextAreaExampleComponent") }}

## Number Field

数字输入框允许用户通过鼠标或键盘输入范围内的数值。

```ts
import { useNumberFieldWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("NumberFieldExampleComponent") }}

## Date Picker

日期选择器允许用户输入或选择日期。

```ts
import { useDatePickerWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("DatePickerExampleComponent") }}

## Date Range Picker

日期区间选择器允许用户输入或选择日期区间。

```ts
import { useDateRangePickerWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("DateRangePickerExampleComponent") }}

## Time Picker

时间选择器允许用户输入或选择时间。

```ts
import { useTimePickerWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("TimePickerExampleComponent") }}

## Toggle

开关选择器允许用户进行开关选择。

```ts
import { useToggleWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("ToggleExampleComponent") }}

## Select

下拉选择器允许用户从下拉列表中选择一个选项。

```ts
import { useSelectWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("SelectExampleComponent") }}

#### Async Options

此示例展示了一个带有远程搜索、节流控制、请求时序控制和加载状态的下拉选择器，使用 `fetchOptions` 选项加载异步数据。

{{ NgDocActions.demo("SelectAsyncOptionsExampleComponent") }}

#### Custom Option View

此示例展示了如何使用 `option` 选项自定义选项视图。

{{ NgDocActions.demo("SelectCustomOptionContentExampleComponent") }}

## Cascader

级联选择框允许用户进行多级选择。

```ts
import { useCascaderWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("CascaderExampleComponent") }}

#### Async Options

此示例展示了如何使用 `fetchOptions` 选项加载异步数据，支持 Promise 与 Observable。

{{ NgDocActions.demo("CascaderAsyncOptionsExampleComponent") }}

## Tree Select

树型选择控件允许用户从树状结构中选择。

```ts
import { useTreeSelectWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("TreeSelectExampleComponent") }}

## Slider

滑动输入器展示当前值和可选范围，允许用户通过滑动选择值。

```ts
import { useSliderWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("SliderExampleComponent") }}

## Radio Group

单选框组允许用户从多个选项中选择一个。

```ts
import { useRadioGroupWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("RadioGroupExampleComponent") }}

## Checkbox

复选框允许用户进行勾选操作。

```ts
import { useCheckboxWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("CheckboxExampleComponent") }}

## Checkbox Group

复选框组合允许用户进行多选。

```ts
import { useCheckboxGroupWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("CheckboxGroupExampleComponent") }}

## Rate

评分组件允许用户进行评分操作。

```ts
import { useRateWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("RateExampleComponent") }}

## Transfer

穿梭选择框用直观的方式在两栏中移动元素，完成选择行为。

```ts
import { useTransferWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("TransferExampleComponent") }}

## Segmented

分段控制器用于展示多个选项并允许用户选择其中单个选项。

```ts
import { useSegmentedWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("SegmentedExampleComponent") }}

## ColorPicker

颜色选择器允许用户选择或自定义颜色。

```ts
import { useColorPickerWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("ColorPickerExampleComponent") }}
