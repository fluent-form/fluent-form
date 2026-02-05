{{ NgDocActions.demo("ZorroStyleComponent", { container: false }) }}

在本章节，我们将介绍一些开发技巧，以帮助您更有效地使用 {% include "../../../markdowns/brand.md" %}。

## Fluent Template

在某些情况下，我们可能需要为组件图示选项传入 `TemplateRef` 类型的值，例如 `text` 图示的 `addons` 选项。

通常，我们会使用 `@ViewChild()` 来注入并获取相应的 `TemplateRef`。

```ts
@ViewChild('tpl') tpl: TemplateRef<void>;
```

然而，{% include "../../../markdowns/brand.md" %} 提供了一种更便捷的方法。
您只需要使用 `[fluentTemplate]` 指令为模板命名，并将其注册到 `<fluent-form>` 组件下。然后，在图示选项中使用 `#key` 语法来指定要使用的模板。

要使用 `FluentTemplate` 功能，您需要导入 `FluentFormModule` 模块或 `FluentTemplate` 指令，并在 `<fluent-form>` 组件下使用 `[fluentTemplate]` 指令来注册自定义模板。

{{ NgDocActions.demo("NamedTemplateExampleComponent") }}

## Dynamic Schema

借助 Signals API，您可以在 `form()` 函数内部轻松构建动态图示。

{{ NgDocActions.demo("DynamicSchemaExampleComponent") }}

## Encapsulation Schema

使用 Fluent API，我们可以轻松地封装图示函数，以提高表单开发效率。

```ts
import { form, headless } from '@fluent-form/core';
import { button, toggle, radioGroup, textField } from '@fluent-form/ui-zorro';

function entityForm(composeFn: () => void) {
  return form(() => {
    headless('id');
    composeFn();
  });
}

function genderRadioGroup(key = 'gender') {
  return radioGroup(key).options([
    { label: 'Women', value: 0 },
    { label: 'Male', value: 1 }
  ]);
}

function enabledToggle(key = 'enabled') {
  return toggle(key).placeholder(['Enabled', 'Disabled']).defaultValue(true);
}

function submitButton(key?: string) {
  return button(key).type('primary').mode('submit');
}

entityForm(() => {
  textField('fullName').label('Name');
  genderRadioGroup().label('Gender');
  enabledToggle().label('Status');
  submitButton().content('Submit');
});
```
