# {{ NgDocPage.title }}

{{ NgDocActions.demo("ZorroStyleComponent", { container: false }) }}

在本章节中，我们将展示一些控件的基本使用示例。

## Text

文本框允许用户通过鼠标或键盘输入内容，是最基础的表单域。

```ts
import { useTextWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("TextExampleComponent") }}

## Textarea

文本域允许用户通过鼠标或键盘输入内容，是最基础的表单域。

```ts
import { useTextareaWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("TextareaExampleComponent") }}

## Number

数字输入框允许用户通过鼠标或键盘输入范围内的数值。

```ts
import { useNumberWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("NumberExampleComponent") }}

## Date Picker

日期选择器允许用户输入或选择日期。

```ts
import { useDateWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("DateExampleComponent") }}

## Date Range Picker

日期区间选择器允许用户输入或选择日期区间。

```ts
import { useDateRangeWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("DateRangeExampleComponent") }}

## Time Picker

时间选择器允许用户输入或选择时间。

```ts
import { useTimeWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("TimeExampleComponent") }}

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

#### Custom Property Names

此示例展示了如何使用 `config` 选项自定义属性名。

{{ NgDocActions.demo("SelectCustomPropertyNamesExampleComponent") }}

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

#### Custom Property Names

此示例展示了如何使用 `config` 选项自定义属性名。

{{ NgDocActions.demo("CascaderCustomPropertyNamesExampleComponent") }}

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

#### Custom Property Names

此示例展示了如何使用 `config` 选项自定义属性名。

{{ NgDocActions.demo("CheckboxGroupCustomPropertyNamesExampleComponent") }}

## Rate

评分组件允许用户进行评分操作。

```ts
import { useRateWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("RateExampleComponent") }}

## Color

颜色选择器允许用户选择或自定义颜色。

```ts
import { useColorWidget } from '@fluent-form/ui-zorro';
```

{{ NgDocActions.demo("ColorExampleComponent") }}
