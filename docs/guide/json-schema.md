---
title: JSON 图示
order: 8
---

除了支持使用 Fluent API 和对象字面量编写图示，`ngx-fluent-form` 还允许使用 JSON 格式来编写图示。

## StaticExpression <label type="danger">Developer Preview</label>

在处理表单联动时，通常需要使用函数来完成，但在 JSON 中无法编写函数。为应对这种情况，您可以使用静态表达式来代替。

静态表达式是一段字符串，允许您在其中编写一些简单的 JavaScript 表达式，其执行上下文为 `{ model, control, schema }`。

使用 `withStaticExpression()` 特性函数来开启静态表达式功能。

```ts
import { provideFluentForm, withWidgets, withStaticExpression } from 'ngx-fluent-form';

provideFluentForm(
  withWidgets(...),
  withStaticExpression()
)
```

<example name="fluent-form-static-expression-example" />

### 安全性

目前静态表达式是在一个简易的沙箱环境下运行的，仍然可以通过一些手段逃逸出沙箱环境，开发者需要确保传入的表达式是安全的，可信任的。
