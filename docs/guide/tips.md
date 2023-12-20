---
title: 开发技巧
order: 888
---

## 命名模板

部分组件图示选项还支持传入 `TemplateRef` 类型的值，例如 `input-group` 图示的 `before` 与 `after` 选项。

通常，我们需要通过使用 `@ViewChild()` 来注入并获取相应的 `TemplateRef`。

```ts
@ViewChild('tpl') tpl: TemplateRef<void>;
```

然而，对于快速配置表单而言，这种方式显然并不够便捷。

因此，`ngx-fluent-form` 提供了一种更快速的方法，您只需要使用 `[fluentTemplate]` 指令为模板命名，并将其注册到 `<fluent-form>` 组件下。接着，在图示选项中使用 `#name` 语法来指定要使用哪个模板。

要使用命名模板功能，您需要导入 `FluentFormModule` 模块，然后在 `<fluent-form>` 组件下使用 `[fluentTemplate]` 结构指令来注册自定义模板。

<example name="fluent-form-named-template-example" />

## 更新图示

通常情况下，您无需手动更新图示，表单联动和表单数组已经满足了大多数需求。但你仍然可以使用 `SchemaUtil` 提供的 `find` 方法来帮助查找指定图示并进行修改。

由于 `ngx-fluent-form` 组件使用 `OnPush` 变更检测策略，更新 `schema` 后需要改变对象引用才能够触发更新。

<example name="fluent-form-update-schema-example" />

## 封装图示

使用 Fluent API，我们可以轻松地封装图示函数来提高表单开发效率。

```ts
import { button, form, toggle, radioGroup, input } from 'ngx-fluent-form';

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
  input('fullName').label('姓名');
  genderRadioGroup().label('性别');
  enabledToggle().label('状态');
  submitButton().content('提交信息');
});
```
