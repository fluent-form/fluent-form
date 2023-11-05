---
title: 基本用法
order: 1
---

了解 `ngx-fluent-form` 的基本用法。

## 注册部件

在[快速上手](/getting-started)章节中，为了简化操作，我们使用了 `withAllWidgets()` 来一次性注册所有部件。然而在实际应用中，这种方法并不受推荐。我们更推荐使用 `withWidgets()` 来按需注册组件：

```ts
import { provideFluentForm, withWidgets, useInputWidget, useNumberWidget } from 'ngx-fluent-form';

provideFluentForm(
  withWidgets(
    useInputWidget(),
    useNumberWidget(),
    ...
  )
)
```

## 创建图示

创建图示（schema）主要有两种方式：

### Fluent API

Fluent API 是一种可组合的、有限链式调用的 Builder-like API。

```ts
import { buttonGroup, button, form, input } from 'ngx-fluent-form';

const schema = form(() => {
  input('text').label('文本').placeholder('请输入');

  buttonGroup().schemas(() => {
    button().content('提交');
  });
});
```

### 对象字面量

```ts
import { form } from 'ngx-fluent-form';

const schema = form([
  {
    kind: 'input',
    key: 'text',
    label: '文本',
    placeholder: '请输入'
  },
  {
    kind: 'button-group',
    schemas: [
      {
        kind: 'button',
        content: '提交'
      }
    ]
  }
]);
```

<br>

两种写法都是等效的，您可以根据自己的偏好来选择一种写法。教程中将使用 Fluent API 来作为主要演示。
