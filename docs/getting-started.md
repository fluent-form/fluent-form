---
title: 快速上手
order: 2
---

## 先决条件

在使用 `ngx-fluent-form` 之前，您应该对以下内容有基本的了解：

- [Angular 响应式表单](https://angular.cn/guide/reactive-forms)
- [Ant Design 组件](https://ng.ant.design)

并且确保你的相关依赖版本符合如下规定：

- `angular >= v16.0.0`
- `ng-zorro-antd >= v16.0.0`

## 安装

```shell
ng add ngx-fluent-form
```

## 配置

`ngx-fluent-form` 支持 `ngModule` 与 `standalone` 两种风格的用法。

对于 `standalone` 风格，您需要配置 `provideFluentForm()` 并将其添加到 `bootstrapApplication()` 中：

```ts
import { provideFluentForm, withAllWidgets } from 'ngx-fluent-form';

bootstrapApplication(RootComponent, {
  providers: [
    provideFluentForm(
      withAllWidgets()
    )
  ]
});
```

<br>

对于 `ngModule` 风格，则需要配置 `FluentFormModule.forRoot()` 并添加到你的根 `NgModule`，通常是 `AppModule`：

```ts
import { FluentFormModule, withAllWidgets } from 'ngx-fluent-form';

@NgModule({
  imports: [
    FluentFormModule.forRoot(
      withAllWidgets()
    )
  ]
})
export class AppModule { }
```

## 使用

对于 `standalone` 风格，你只需要将 `FluentFormComponent` 导入到你的独立组件即可：

```ts
import { FluentFormComponent, button, form, number, input } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent],
  template: `<fluent-form [(model)]="model" [schema]="schema"></fluent-form>`
})
export class ExampleComponent {
  schema = form(() => {
    input('text');
    number('count');
    button().content('submit');
  });

  model = {
    text: 'I love ngx-fluent-form',
    count: 10
  };
}
```
<alert type="info">如果您在模板中同时使用到多个 `ngx-fluent-form` 组件/指令，我们推荐您直接导入相应模块，例如 `FluentFormModule`。</alert>

<br>

对于 `ngModule` 风格，则需要将 `FluentFormModule` 导入到你的 `NgModule`：

```ts
import { FluentFormModule } from 'ngx-fluent-form';

@NgModule({
  declarations: [ExampleComponent]
  imports: [FluentFormModule]
})
export class YourModule { }
```

```ts
import { button, form, number, input } from 'ngx-fluent-form';

@Component({
  template: `<fluent-form [(model)]="model" [schema]="schema"></fluent-form>`
})
export class ExampleComponent {
  schema = form(() => {
    input('text');
    number('count');
    button().content('submit');
  });

  model = {
    text: 'I love ngx-fluent-form',
    count: 10
  };
}
```
