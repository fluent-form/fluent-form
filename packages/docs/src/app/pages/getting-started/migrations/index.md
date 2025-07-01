从 `ngx-fluent-form` 升级到 `@fluent-form/core`，您需要手动执行以下迁移。

## 迁移步骤

1. 替换旧依赖：
```bash
> npm rm ngx-fluent-form                        # 删除旧依赖
> npm i @fluent-form/core @fluent-form/ui-zorro # 安装新依赖
```

2. 更新导入点，您通常可以使用 IDE 自动导入功能来完成此迁移:
   - 核心功能相关的 API，请使用 `@fluent-form/core` 导入点。
   - UI 部件相关的 API，请使用 `@fluent-form/ui-zorro` 导入点。

3. 更新配置：
```diff
- import { withWidgets } from 'ngx-fluent-form';
+ import { withZorro } from '@fluent-form/ui-zorro';

  provideFluentForm(
-   withWidgets(...)
+   withZorro(...)
  );
```

4. `inputGroup()` 组件的 `before` 与 `after` 选项合并为 `addons` 选项，`prefix` 与 `suffix` 选项合并为 `affixes` 选项，并将这些选项转移到 `textField()` 与 `numberField()` 控件上：

```diff
- inputGroup().before('before').after('after')
+ textField('x').addons({ before: 'before', after: 'after' })

- inputGroup().prefix('prefix').suffix('suffix')
+ textField('x').affixes({ prefix: 'prefix', suffix: 'suffix' })
```

5. `inputGroup()` 和 `numberGroup()` 组件已被移除，使用 `spaceCompact()` 组件代替。

6. API 重命名：

| Old API                | New API                      |
| ---------------------- | ---------------------------- |
| `date()`               | `datePicker()`               |
| `dateRange()`          | `dateRangePicker()`          |
| `time()`               | `timePicker()`               |
| `input()`              | `textField()`                |
| `number()`             | `numberField()`              |
| `textarea()`           | `textArea()`                 |
| `useInputWidge()`      | `useTextFieldWidget()`       |
| `useNumberWidge()`     | `useNumberFieldWidget()`     |
| `useTextareaWidge()`   | `useTextAreaWidget()`        |
| `useDateWidget()`      | `useDatePickerWidget()`      |
| `useDateRangeWidget()` | `useDateRangePickerWidget()` |
| `useTimeWidget()`      | `useTimePickerWidget()`      |


7. `headless()` 不再支持自定义模板，您可以使用 `headful()` 替代。

8. `select()`、`cascader()`、`radioGroup()`、`checkboxGroup()` 不再支持 `config` 选项。

9. `form()` 函数不再支持 `group()` 作为参数，您可以使用 `applyGroup()` 函数来配置顶层表单。

```diff
- form(group().layout('horizontal').schemas(() => {}))
+ form(() => {
+   applyGroup({ layout: 'horizontal' });
+   // ...
+ })
```

10. 移除 `applyGroup()` 函数，您可以直接在 `form()` 函数中使用 `it` 参数来配置顶层表单。

```diff
- form(() => {
-   applyGroup({ layout: 'horizontal' });
-   // ...
- })
+ form(it => {
+   it.layout('horizontal');
+   // ...
+ })
```

11.  `observers` 选项用法更新，不再需要自行订阅，改为 `pipe` 形式：

```diff
  .observers({
-   valueChanges: source => source.subscribe(...),
+   valueChanges: source => source.pipe(tap(...)),
  })
```

12. `@fluent-form/core` 不再导出 `form` 函数，您需要从 `@fluent-form/ui-zorro` 中导入。

```diff
- import { form } from '@fluent-form/core';
+ import { form } from '@fluent-form/ui-zorro';
```
