{{ NgDocActions.demo("ZorroStyleComponent", { container: false }) }}

除了支持使用 Fluent API 和对象字面量编写图示，{% include "../../../markdowns/brand.md" %} 还允许使用 JSON 格式来编写图示。

## StaticExpression

{% include "../../../markdowns/developer-preview.md" %}

在处理表单联动时，通常需要使用函数来完成，但在 JSON 中无法编写函数。为应对这种情况，您可以使用静态表达式来代替。

静态表达式是一段由 \{\{ 与 \}\} 包围的字符串，允许您在其中编写一些简单的 JavaScript 表达式，其执行上下文为 `{ model, control, schema }`。

使用 `withStaticExpression()` 特性函数来开启静态表达式功能。

```ts
import { provideFluentForm, withStaticExpression } from '@fluent-form/core';

provideFluentForm(
  ...
  withStaticExpression()
)
```

准备 JSON 文件：

```json name="schema.json" file="./examples/static-expression/schema.json" {11}
```

{{ NgDocActions.demo("StaticExpressionExampleComponent") }}

> **ALERT**
> 目前，静态表达式是在一个简易的沙箱环境下运行的，仍然可以通过一些手段来逃逸沙箱环境，开发者需要确保传入的表达式是安全的，可信任的。
