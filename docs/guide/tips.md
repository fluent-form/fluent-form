---
title: 开发技巧
order: 888
---

## 更新图示

通常情况下，您无需手动更新图示，因为表单联动和表单数组已经满足了大多数需求。但你仍然可以使用 `SchemaUtil` 提供的 `find` 方法来查找指定图示并进行修改。

由于 `ngx-fluent-form` 组件使用了 `OnPush` 变更检测策略，更新 `schema` 后需要改变对象引用才能触发更新。

<example name="fluent-form-update-schema-example" />

## 封装图示

使用 Fluent API，我们可以轻松地封装一些图示函数来提高表单开发效率。

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
