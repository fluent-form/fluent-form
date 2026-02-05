{{ NgDocActions.demo("ZorroStyleComponent", { container: false }) }}

{% include "../../../markdowns/brand.md" %} 提供了强大的自定义视图渲染功能，无论是表单元素还是表单布局，都可以根据需要进行定制。

## Custom Template

如果您需要使用自定义模板，首先需要导入 `FluentFormModule` 模块。然后，在 `<fluent-form>` 组件下使用 `[fluentTemplate]` 指令来注册自定义模板。

该指令会在 `<ng-template>` 上导出三个模板变量，分别是：`control`、`schema`、`model`。

您可以选择使用 `headful()` 或 `template()` 来渲染自定义模板。这两者的主要区别在于：

<!-- - `headless()` 是一个表单控件，它**仅**用于形成表单模型，**不会**渲染模板； -->
- `headful()` 是一个表单控件，它**可以**渲染自定义模板并形成表单模型；
- `template()` 是一个组件，它**仅**用于渲染模板，**不会**形成表单模型。

{{ NgDocActions.demo("CustomTemplateExampleComponent") }}

## Custom Render

{% include "../../../markdowns/developer-preview.md" %}

如果您需要自定义表单布局，例如将表单控件渲染到表格单元格中，您可以使用自定义渲染功能。

要使用自定义渲染功能，您需要导入 `FluentFormRenderModule` 模块。该模块提供了以下指令：

- `[fluentSchema]` 指令：这是顶层表单，用于配置 `schema` 并绑定 `model`。
- `<fluent-outlet>` 指令：这是视图渲染出口，用于渲染表单元素视图。您可以使用参数 `key` 来指定要渲染的部分。

{{ NgDocActions.demo("CustomLayoutExampleComponent") }}

## Custom Widget

即将推出教程...

## Custom Widget Wrapper

有时，您可能需要为表单控件添加“包装器（WidgetWrapper）”，用于实现自定义样式或交互能力，例如：边框/分组、提示信息、额外的操作按钮、前后缀布局等。

Wrapper **只影响视图渲染**，不会改变表单模型的生成逻辑。

如果您使用的是 `@fluent-form/ui-zorro`，它会提供一个默认的 Wrapper：`FormFieldWrapper`（用于渲染 FormItem、FormLabel、校验提示等）。

当控件没有显式指定 `wrappers` 时，会使用 UI 适配器提供的默认 `wrappers`。

### How the wrapper works

当 {% include "../../../markdowns/brand.md" %} 渲染某个控件时，如果存在 Wrappers，会先渲染一层或多层 Wrappers，然后再渲染真正的 Widget。

每一层 Wrapper 都会拿到同一份上下文（Context）：

- `control`：当前控件对应的 `AbstractControl`
- `schema`：当前控件的 schema
- `model`：当前表单的 model
- `next`：下一层要渲染的内容（可能还是一个 Wrapper，也可能是最终的 Widget）

要让“链式 Wrapper”继续向内渲染，Wrapper 模板中需要使用 `FluentNextWidgetWrapperOutlet` 把 `{ schema, control, model, next }` 继续传下去。

### Implement a custom wrapper

可以使用一个组件来实现 Wrapper，并继承 `AbstractWidgetWrapper`。在模板中包裹自己的 DOM，然后用 `FluentNextWidgetWrapperOutlet` 渲染下一层：

```angular-ts
import { AbstractWidgetWrapper, FluentNextWidgetWrapperOutlet } from '@fluent-form/core';

@Component({
  imports: [FluentNextWidgetWrapperOutlet],
  template: `
    <ng-template let-control="control" let-schema="schema" let-model="model" let-next="next">
      <div class="my-wrapper">
        <ng-container [fluentNextWidgetWrapperOutlet]="{ schema, control, model, next }" />
      </div>
    </ng-template>
  `
})
export class MyWrapper extends AbstractWidgetWrapper { }
```

如果您在 Wrapper 里忘记渲染 `FluentNextWidgetWrapperOutlet`，那么内层（下一个 wrapper / widget）将不会显示。

### Using a fluent template as wrapper

除了使用组件来实现 Wrapper 外，您还可以使用 `FluentTemplate` 来实现 Wrapper。

当 `wrappers` 的元素是字符串时，它表示一个 `FluentTemplate` 的 Key，指向的是使用 `[fluentTemplate]` 指令注册的模板。这样您可以只用一段模板就完成包装，而无需创建一个 `AbstractWidgetWrapper` 子类。

```html
<fluent-form [schema]="schema()" [(model)]="model">
  <ng-template
    fluentTemplate="borderedWrapper"
    let-control="control"
    let-schema="schema"
    let-model="model"
    let-next="next">
    <div style="border: 1px dashed #ec4899;">
      <ng-container [fluentNextWidgetWrapperOutlet]="{ schema, control, model, next }" />
    </div>
  </ng-template>
</fluent-form>
```

### Applying wrappers

通过 schema 的 `wrappers([...])` 为某个控件指定 Wrapper 列表：

- 数组顺序决定了渲染顺序，“由外到内”：第一个是最外层 Wrapper。
- 指定 `wrappers` 会**覆盖** UI 适配器（例如 `@fluent-form/ui-zorro`）提供的默认 Wrappers；如果您希望保留默认 Wrappers，请手动把它加入数组。
- 可以使用 `inject(FLUENT_WIDGET_WRAPPERS)` 来获取默认的 Wrappers 列表。
- 数组元素既可以是 Wrapper 组件类型，也可以是 `FluentTemplate` 的 Key（由 `[fluentTemplate]` 注册）。

```ts
const defaultWrappers = inject(FLUENT_WIDGET_WRAPPERS);

textField('name').label('Name').wrappers([
  defaultWrappers,   // 仍然保留默认的表单项外观（label、校验提示等）
  MyWrapper,         // 再叠加自定义外观/交互
  'borderedWrapper', // 对应 fluentTemplate="borderedWrapper" 注册的模板
]);
```

- 如果您不需要任何 Wrappers，可以传入一个空数组来覆盖默认的 Wrappers：

```ts
textField('name').label('Name').wrappers([]);
```

{{ NgDocActions.demo("CustomWrapperExampleComponent") }}

### Providing default wrappers

UI 适配器通常会使用 `FLUENT_WIDGET_WRAPPERS` Token 来提供一组默认的 Wrappers；

如果希望**覆盖**这些默认 Wrappers（对所有未显式设置 `wrappers` 的控件生效），可以自行提供该 Token：

```ts
import { FLUENT_WIDGET_WRAPPERS } from '@fluent-form/core';

export const appConfig: ApplicationConfig = {
  providers: [
    ...
    { provide: FLUENT_WIDGET_WRAPPERS, useValue: [MyWrapper1, MyWrapper2] },
  ],
};
```
