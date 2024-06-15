# {{ NgDocPage.title }}

图示修补可用于在编写图示后续统一修改或补充参数。

## SchemaPatcher

使用 `withSchemaPatchers()` 特性函数开启此功能，将一个或多个图示修补器添加到配置中。

## 用例

一个自动补充输入框的 `placeholder` 占位提示的例子。

我们定义了两个图示修补器，分别对 `input` 与 `number` 图示进行修补。

```ts
import { provideFluentForm, withSchemaPatchers } from '@fluent-form/core';

provideFluentForm(
  ...
  withSchemaPatchers([
    {
      selector: 'input',
      patch: schema => {
        const label = schema.label || '文本';
        schema.placeholder ||= `请输入${label}`;
        return schema;
      }
    },
    {
      selector: 'number',
      patch: schema => {
        schema.placeholder ||= '请输入数字';
        return schema;
      }
    }
  ])
)
```

## 修补器定义

```ts
type SchemaSelector = '*' | string | SchemaType | (string | SchemaType)[];

type SchemaPatchFn<S extends AbstractSchema> = (schema: S & Record<string, SafeAny>) => S;

interface SchemaPatcher<S extends AbstractSchema = AbstractSchema> {
  selector: SchemaSelector;
  patch: SchemaPatchFn<S>;
}
```

使用 `selector` 字段定义要选择的图示，支持多种选择规则：

- 使用 `*` 通配符选择任意图示。
- 使用图示名称（schema.kind）选择具体的图示，例如 `input`、`number`。
- 使用图示类型枚举选择某一类型的图示，例如 `SchemaType.Control`、`SchemaType.Component`。
- 还可以使用数组组合多种选择规则以灵活匹配图示。

使用 `patch` 字段定义图示修补函数，该函数接受一个 `schema` 参数，并且需要返回修改后的图示。

```ts
import { SchemaType } from '@fluent-form/core';

// 选择任意图示
{
  selector: '*',
  patch: schema => schema
}

// 选择 input 图示
{
  selector: 'input',
  patch: schema => schema
}

// 选择 input 与 number 图示
{
  selector: ['input', 'number'],
  patch: schema => schema
}

// 选择类型为控件的图示
{
  selector: SchemaType.Control,
  patch: schema => schema
}

// 选择类型为控件与组件的图示
{
  selector: [SchemaType.Control, SchemaType.Component],
  patch: schema => schema
}

// 选择 button 图示 与 类型为控件组件的图示
{
  selector: ['button', SchemaType.Control],
  patch: schema => schema
}
```

## 执行顺序

图示修补器将根据它们在 `withSchemaPatchers()` 函数参数中的顺序，按顺序逐个执行修补函数。
