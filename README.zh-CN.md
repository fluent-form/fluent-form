# ngx-fluent-form

在 Angular 中使用 Fluent API 或 JSON 构建动态表单。

[![npm version](https://img.shields.io/npm/v/ngx-fluent-form/latest.svg)](https://npmjs.com/package/ngx-fluent-form)
![Node.js CI](https://github.com/HyperLife1119/ngx-fluent-form/workflows/Node.js%20CI/badge.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
[![Angular](https://img.shields.io/badge/Build%20with-Angular%20CLI-red?logo=angular)](https://www.github.com/angular/angular)
[![codecov](https://codecov.io/gh/HyperLife1119/ngx-fluent-form/branch/main/graph/badge.svg?token=070GEU44U0)](https://codecov.io/gh/HyperLife1119/ngx-fluent-form)
[![CodeFactor](https://www.codefactor.io/repository/github/hyperlife1119/ngx-fluent-form/badge)](https://www.codefactor.io/repository/github/hyperlife1119/ngx-fluent-form)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://hyperlife1119.github.io/ngx-fluent-form)
[![English](https://img.shields.io/static/v1?label=English&message=en-US&color=212121)](https://github.com/HyperLife1119/ngx-fluent-form/blob/main/README.md)

## 特性

- 支持使用 Fluent API 与 JSON。
- 基于 Angular Template，没有 Host Element，支持嵌套布局。
- 类型安全的表单图示配置。
- 建立在 Angular 响应式表单之上。
- 基于 [NG-ZORRO](https://ng.ant.design) 的组件与栅格布局。

## 先决条件

在使用 `ngx-fluent-form` 之前，您应该对以下内容有基本的了解：

- [Angular 响应式表单](https://angular.cn/guide/reactive-forms)
- [NG-ZORRO 组件](https://ng.ant.design)

并且确保你的相关依赖版本符合如下规定：

- `angular >= v15.0.0`
- `ng-zorro-antd >= v15.0.0`

## 安装

```shell
ng add ngx-fluent-form
```

## 文档

有关文档与示例，请访问 [https://hyperlife1119.github.io/ngx-fluent-form](https://hyperlife1119.github.io/ngx-fluent-form)。

## 用法

`ngx-fluent-form` 同时支持基于 `NgModule` 或 `Standalone` 的项目。对于不同类型的项目，在用法上也有稍许不同：

### Standalone 用法：

1. 配置 `provideFluentForm()` 并添加到 `bootstrapApplication()` 中：

```ts
import { provideFluentForm, withAllWidgets } from 'ngx-fluent-form';

bootstrapApplication(RootComponent, {
  providers: [
    provideFluentForm(
      withAllWidgets()
      // or use withWidgets and import widget features on demand.
      // withWidgets(
      //   useInputWidget()
      //   ...
      // )
    )
  ]
});
```

2. 将 `FluentFormComponent` 添加到你的独立组件，然后配置 `schemas` 参数，开始构建表单：

```ts
import { FluentFormComponent, buttonGroup, button, date, form, number, input } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent],
  template: `<fluent-form [(model)]="model" [schemas]="schemas"></fluent-form>`
})
export class ExampleComponent {
  schemas = form(
    input('text').length(15),
    number('count'),
    date('date').format('yyyy/MM/dd'),
    buttonGroup(
      button().content('cancel'),
      button().content('submit')
    )
  );

  model = {
    text: 'I love ngx-fluent-form',
    count: 10,
    date: Date.now()
  };
}
```

### NgModule 用法：

1. 配置 `FluentFormModule.forRoot()` 并添加到你的根 `NgModule`，通常是 `AppModule`：

```ts
import { FluentFormModule, withAllWidgets } from 'ngx-fluent-form';

@NgModule({
  imports: [
    FluentFormModule.forRoot(
      withAllWidgets()
      // or use withWidgets and import widget features on demand.
      // withWidgets(
      //   useInputWidget()
      //   ...
      // )
    )
  ]
})
export class RootModule { }
```

2. 将 `FluentFormModule` 添加到你的 `NgModule`：

```ts
import { FluentFormModule } from 'ngx-fluent-form';

@NgModule({
  imports: [
    FluentFormModule
  ]
})
export class YourModule { }
```

3. 配置 `schemas` 参数，开始构建表单：

```ts
import { buttonGroup, button, date, form, number, input } from 'ngx-fluent-form';

@Component({
  template: `<fluent-form [(model)]="model" [schemas]="schemas"></fluent-form>`
})
export class ExampleComponent {
  schemas = form(
    input('text').length(15),
    number('count'),
    date('date').format('yyyy/MM/dd'),
    buttonGroup(
      button().content('cancel'),
      button().content('submit')
    )
  );

  model = {
    text: 'I love ngx-fluent-form',
    count: 10,
    date: Date.now()
  };
}
```

## 支持

喜欢 `ngx-fluent-form` 吗？为该项目点星！⭐

## 特别鸣谢

感谢 [JetBrains](https://www.jetbrains.com/?from=ngx-fluent-form) 为我们提供免费开源许可证。

![JetBrains Logo (Main) logo](https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.svg)
