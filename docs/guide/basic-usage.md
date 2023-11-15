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

## 组件使用

### FluentFormComponent

```html
<fluent-form
  [schema]="schema"
  [(model)]="model"
  (submit)="onSubmit($event)">
</fluent-form>
```
- 使用 `schema` 属性指定表单图示；
- 使用 `model` 属性绑定模型，支持双向绑定；
- 使用 `(submit)` 侦听表单提交事件；
- 使用 `(formChange)` 侦听表单变更，可获得 `FormGroup` 实例；
- 使用 `(modelChange)` 侦听模型变更；
- 使用 `(valueChanges)` 侦听表单值变更，参考 [AbstractControl#valueChanges](https://angular.cn/api/forms/AbstractControl#valueChanges)；
- 使用 `(statusChanges)` 侦听表单状态变更，参考 [AbstractControl#statusChanges](https://angular.cn/api/forms/AbstractControl#statusChanges)；
- 有关更多组件属性/事件，请查阅 [Component API](../api/form/api)。

## 创建表单

下面我们来学习如何创建一个简单的英雄信息填写表单。

### 准备数据模型

在这里，我们的英雄数据模型是一个接口（interface），一个零行为的贫血模型。

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

<alert type="info">注意，Hero 的 `height` 和 `popularity` 属性都是可选的，这意味着在表单中它们属于非必填项。</alert>

### 创建表单图示

根据英雄数据模型，为每个属性选择并配置合适的表单控件：

```ts
import { form, input, number, rate, textarea, toggle } from 'ngx-fluent-form';

const schema = form(() => {
  number('id').label('ID').required(true);
  input('name').label('名称').required(true);
  textarea('power').label('能力').required(true);
  number('height').label('身高');
  rate('popularity').label('声望');
  toggle('enabled').label('状态').required(true);
});
```

就这样，我们创建好了最基本的英雄信息表单图示，但还有些问题：

1. `Hero.id` 可能由服务端生成，我们不太想要“编辑”它。
2. 我们希望 `Hero.enabled` 默认为 `true`。

针对第一点，可以采用删除 `number('id')` 的方法，这样表单模型中将不再包含 `id` 字段，这适用于新增英雄时的情况。

但是在编辑英雄时，由于此时英雄已具有特定的 `id`，如果表单中不包含 `id` 字段，那么在将模型填入表单后，等待编辑完成后输出表单值，我们就会丢失英雄的 `id`。除非我们将它额外保存起来，在编辑后重新将 `id` 设置回去，听起来有些麻烦。

显然，删除 `number('id')` 不是一个好方法，那么将它隐藏起来怎么样？

```diff
- number('id').label('ID').required(true);
+ number('id').hidden(true);
```

隐藏起来也可以，但 `ngx-fluent-form` 提供了更适合的控件，即 `headless()`，它被定义为一个“无头”控件，这意味着它可以**完全不渲染**控件视图。

```diff
- number('id').label('ID').required(true);
+ headless('id');
```

对于第二点，若控件需要提供默认值，配置 `defaultValue` 选项即可。此时完整的图示看起来是这样的：

```ts
import { form, headless, input, rate, textarea, toggle } from 'ngx-fluent-form';

const schema = form(() => {
  headless('id');
  input('name').label('名称').required(true);
  textarea('power').label('能力').required(true);
  number('height').label('身高');
  rate('popularity').label('声望');
  toggle('enabled').label('状态').required(true).defaultValue(true);
});
```

最后我们将它们应用到实际组件当中，查看预览：

<example name="fluent-form-hero-form-example" />

此时我们可以看到表单里的控件都挤在一起，这是因为我们没有配置布局选项导致的。在下一章中，我们将学习如何配置排版与布局。
