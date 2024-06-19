# {{ NgDocPage.title }}

{{ NgDocActions.demo("ZorroStyleComponent", { container: false }) }}

在本章节，我们将介绍一些开发技巧，以帮助您更有效地使用 {% include "../../../markdowns/brand.md" %}。

## 命名模板

在某些情况下，我们可能需要为组件图示选项传入 `TemplateRef` 类型的值，例如 `input-group` 图示的 `before` 和 `after` 选项。

通常，我们会使用 `@ViewChild()` 来注入并获取相应的 `TemplateRef`。

```ts
@ViewChild('tpl') tpl: TemplateRef<void>;
```

然而，{% include "../../../markdowns/brand.md" %} 提供了一种更便捷的方法。
您只需要使用 `[fluentTemplate]` 指令为模板命名，并将其注册到 `<fluent-form>` 组件下。然后，在图示选项中使用 `#name` 语法来指定要使用的模板。

要使用命名模板功能，您需要导入 `FluentFormModule` 模块，并在 `<fluent-form>` 组件下使用 `[fluentTemplate]` 结构指令来注册自定义模板。

{{ NgDocActions.demo("NamedemplateExampleComponent") }}

## 更新图示

在大多数情况下，您无需手动更新图示，因为表单联动和表单数组已经满足了大部分需求。但是，如果需要，您可以使用 `SchemaUtil` 提供的 `find` 方法来查找并修改指定的图示。

> **NOTE**
> 由于 {% include "../../../markdowns/brand.md" %} 组件使用 `OnPush` 变更检测策略，更新 `schema` 后需要改变对象引用才能触发更新。

{{ NgDocActions.demo("UpdateSchemaExampleComponent") }}

## 封装图示

使用 Fluent API，我们可以轻松地封装图示函数，以提高表单开发效率。

```ts
import { button, form, toggle, radioGroup, text } from '@fluent-form/ui-zorro';

function genderRadioGroup(key = 'gender') {
  return radioGroup(key).options([
    { label: '女', value: 0 },
    { label: '男', value: 1 }
  ]);
}

function enabledToggle(key = 'enabled') {
  return toggle(key).placeholder(['有效', '无效']).defaultValue(true);
}

function submitButton(key?: string) {
  return button(key).type('primary').mode('submit');
}

form(() => {
  text('fullName').label('姓名');
  genderRadioGroup().label('性别');
  enabledToggle().label('状态');
  submitButton().content('提交信息');
});
```
