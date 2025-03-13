{{ NgDocActions.demo("ZorroStyleComponent", { container: false }) }}

本文档将详细介绍 {% include "../../../markdowns/brand.md" %} 的基本用法。

## 选择 UI 库

{% include "../../../markdowns/brand.md" %} 目前提供了以下 UI 库的支持：

| UI         | Package                 | 官网                  |
| ---------- | ----------------------- | --------------------- |
| Ant Design | `@fluent-form/ui-zorro` | https://ng.ant.design |


<!-- - @fluent-form/ui-zorro - [NG-ZORRO - Ant Design of Angular](https://ng.ant.design) -->

我们计划未来将支持更多的 UI 库，例如 [Material Design](https://material.angular.io)、[PrimeNG](https://primeng.org/) 等。

> **NOTE**
> 您可以根据自己的偏好和项目的需求来选择不同的 UI 库。教程中将主要使用 Ant Design 来演示。

## 注册部件

在选择好 UI 库之后，您需要**按需注册**项目所需要的部件：

```ts
import { provideFluentForm } from '@fluent-form/core';
import { withZorro, useTextFieldWidget, useNumberFieldWidget } from '@fluent-form/ui-zorro';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFluentForm(
      withZorro([
        useTextFieldWidget(),
        useNumberFieldWidget(),
        ...
      ])
    )
  ]
};
```

在上述代码中，我们使用 `provideFluentForm` 辅助函数来配置 {% include "../../../markdowns/brand.md" %}，然后使用 `withZorro` 函数来注册 UI 库与部件，它接收一个部件数组作为参数。

`useTextFieldWidget` 和 `useNumberFieldWidget` 都是部件工厂函数，它们分别注册一个文本输入部件和一个数字部件。

要查看更多部件，请查阅 [API 文档](/api)。

## 创建图示

创建图示（schema）有两种主要方式：Fluent API 和 对象字面量。

### Fluent API

Fluent API 是一种可组合的、有限链式调用的 Builder-like API。它的优点是语法简洁，易于编写和类型安全。

```ts
import { form } from '@fluent-form/core';
import { buttonGroup, button, textField } from '@fluent-form/ui-zorro';

const schema = form(() => {
  textField('text').label('文本').placeholder('请输入');

  buttonGroup().schemas(() => {
    button().content('提交');
  });
});
```

### 对象字面量

对象字面量的方式更直观，更符合 JavaScript 的编程习惯。

```ts
import { form } from '@fluent-form/core';

const schema = form([
  {
    kind: 'text-field',
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

> **NOTE**
> 两种写法都是等效的，您可以根据自己的偏好和项目的需求来选择。教程中将主要使用 Fluent API 来演示。

## 核心组件

`FluentFormComponent` 是 {% include "../../../markdowns/brand.md" %} 的核心组件，它用于创建和管理表单。

```html
<fluent-form [schema]="schema" [(model)]="model" (submit)="onSubmit($event)" />
```

- `schema` 属性用于指定表单图示；
- `model` 属性用于绑定模型，支持双向绑定；
- `(submit)` 事件用于侦听表单提交事件；
- `(formChange)` 事件用于侦听表单变更，可以用于获取 `FormGroup` 实例；
- `(modelChange)` 事件用于侦听模型变更；
- `(valueChanges)` 事件用于侦听表单值变更，参考 [AbstractControl#valueChanges](https://angular.cn/api/forms/AbstractControl#valueChanges)；
- `(statusChanges)` 事件用于侦听表单状态变更，参考 [AbstractControl#statusChanges](https://angular.cn/api/forms/AbstractControl#statusChanges)；

## 创建表单

接下来，我们将学习如何创建一个简单的英雄信息填写表单。

### 准备数据模型

首先，我们需要定义一个英雄数据模型。在这里，我们的英雄数据模型是一个接口（interface），一个零行为的贫血模型。

```ts
interface Hero {
  id: number;
  /** 名称 **/
  name: string;
  /** 能力 **/
  power: string;
  /** 身高 **/
  height?: number;
  /** 声望 **/
  popularity?: number;
  /** 有效/无效 **/
  enabled: boolean;
}
```

> **Note**
> 注意，Hero 的 `height` 和 `popularity` 属性都是可选的，这意味着在表单中它们属于**非必填**项。

### 创建表单图示

根据英雄数据模型，我们为每个属性选择并配置合适的表单控件：

```ts
import { form } from '@fluent-form/core';
import { textField, numberField, rate, textArea, toggle } from '@fluent-form/ui-zorro';

const schema = form(() => {
  numberField('id').label('ID').required(true);
  textField('name').label('名称').required(true);
  textArea('power').label('能力').required(true);
  numberField('height').label('身高');
  rate('popularity').label('声望');
  toggle('enabled').label('状态').required(true);
});
```

在这个例子中，我们使用了 `number-field`、`text-field`、`text-area`、`rate` 和 `toggle` 这几种控件。每个控件都有一些配置选项，例如 `label` 用于设置控件的标签，`required` 用于设置控件是否必填。

然后，我们需要解决两个问题：

1. `Hero.id` 可能由服务端生成，我们不希望用户可以**编辑**它。
2. 我们希望 `Hero.enabled` 默认为 `true`。

对于第一个问题，我们可以使用 `headless` 控件来处理。`headless` 控件是一个“无头”控件，它可以**完全不渲染**控件视图，但仍然可以在表单模型中保留对应的字段。

```diff
- numberField('id').label('ID').required(true);
+ headless('id');
```

对于第二个问题，我们可以通过配置 `defaultValue` 选项来为控件提供默认值。

```diff
- toggle('enabled').label('状态').required(true);
+ toggle('enabled').label('状态').required(true).defaultValue(true);
```
最后，我们将创建的表单图示应用到实际组件中：

{{ NgDocActions.demo("HeroFormExampleComponent") }}

此时我们可以看到表单里的控件都挤在一起，这是因为我们没有配置布局选项导致的。在下一章中，我们将学习如何配置排版与布局。
