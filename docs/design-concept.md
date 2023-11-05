---
title: 设计理念
order: 3
---

`ngx-fluent-form` 使用 `schema` 来描述各种元素，通过将这些 `schema` 组合在一起，我们能够很好的描述一个完整的表单。

## 术语

- `schema` 图示，用于描述数据结构或模式规范；
- `control` 控件，表单中用于收集用户输入的交互性元素；
- `component` 组件，非控件元素的代称；
- `wrapper` 包装器，用于包装、装饰子元素；
- `container` 容器，用于承载多层子元素。
- `widget` 部件，指表单中的元素，包括控件、组件、容器、包装器。

## 图示结构

我们的图示具有类似于 `Node` 节点的基本结构，可以进行嵌套。

```ts
{
  kind: 'kind',
  schemas: [
    {
      kind: 'kind',
      schemas: [...]
    }
  ]
}
```

## Fluent API

为了更加便捷地编写图示，我们引入了一种可组合的、支持有限链式调用的 Builder-like API，称之为 Fluent API。

```ts
import { buttonGroup, button, form, input } from 'ngx-fluent-form';

const schema = form(() => {
  input('text').label('文本').placeholder('请输入');

  buttonGroup().schemas(() => {
    button().content('提交');
  });
});
```
执行 `form()` 函数后，我们可以得到如下图示结构：

```ts
{
  kind: 'group',
  key: 'root',
  schemas: [
    [
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
    ]
  ]
}
```

## 图示类型

我们对图示（schema）进行了明确的分类，这有助于我们更清晰地识别和管理不同类型的图示，以下是所有的图示类型：

<br>

| 类型                 | 描述                                                          |
| -------------------- | ------------------------------------------------------------- |
| `Control`            | 控件类型，表示表单中的控件元素，例如 `input`、`number`        |
| `ControlWrapper`     | 控件包装类型，用于包装**一层**控件元素，例如 `input-group`    |
| `ControlContainer`   | 控件容器类型，用于承载**多层**控件元素，例如 `group`、`array` |
| `Component`          | 组件类型，表示非控件元素，即普通组件，例如 `button`、`text`   |
| `ComponentWrapper`   | 组件包装类型，用于包装**一层**组件元素，例如 `button-group`   |
| `ComponentContainer` | 组件容器类型，用于容纳**多层**组件元素，例如 `tabs`、`steps`  |

<br>

<alert type="primary">`wrapper` 与 `container` 的主要区别在于，`wrapper` 只能包含**一层**子图示，而 `container` 可以包含**多层**子图示。</alert>

## 图示接口

- `AbstractSchema`：所有图示的父接口
- `AbstractControlSchema`：所有控件图示的父接口
- `AbstractControlContainerSchema`：所有控件容器图示的父接口

你可以到 [Schema API](../api/schemas/api) 文档中去检查它们。

## EmbeddedView

与市面上大多数基于组件复用的动态表单库不同，`ngx-fluent-form` 采用了基于 `EmbeddedView` 的方式来定义可复用部件（widget）。

### 为什么

由于 Angular 组件具有选择器（selector）的概念，这使得组件在渲染后会增加一层 `<host-element>` 宿主元素，它的存在直接改变了渲染后的 DOM 结构。在嵌套布局中，这可能会影响某些 CSS 样式。

以 `<button-group>` 与 `<button>` 嵌套形成的按钮组为例，我们希望 `<button>` 是 `<button-group>` 的**直接**子元素，此时模板定义看起来像是这样的：

```html
<host-button-group>
  <host-button></host-button>
</host-button-group>
```

**预期**渲染结果：

```html
<button-group>
  <button></button>
</button-group>
```

**实际**渲染结果：

```diff
- <host-button-group>
    <button-group>
-     <host-button>
        <button></button>
-     </host-button>
    </button-group>
- </host-button-group>
```

不难发现，由于 `<host-element>` 的出现，破坏了 DOM 结构。在这种情况下，以下 CSS 选择器均无法准确命中元素：

```css
button-group > button { }
button-group button:first-child { }
button-group button:last-child { }
button-group button:nth-child(2) { }
button-group button:nth-child(odd) { }
button-group button:nth-child(even) { }
...
```

为了避免这种情况，我们选择使用 `EmbeddedView` 来定义部件，通过将 `<ng-template>` 从组件中提取出来并独立渲染，直接避免了 `<host-element>` 问题。
