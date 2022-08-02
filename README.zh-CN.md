# ngx-fluent-form

在 Angular 中使用 Fluent API 构建动态表单。

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
- 类型安全的表单配置。
- 建立在 Angular 响应式表单之上。
- 基于 `ng-zorro-antd` 的表单组件与栅格布局。

## 先决条件

- [Angular](https://angular.io) >= 13.0.0
- [ng-zorro-antd](https://ng.ant.design) >= 13.0.0

## 安装

```shell
npm i ngx-fluent-form
```

## 文档

有关文档与示例，请访问 [https://hyperlife1119.github.io/ngx-fluent-form](https://hyperlife1119.github.io/ngx-fluent-form)。


## 用法

导入 `FluentFormModule` 到你的模块：

```ts
import { FluentFormModule } from 'ngx-fluent-form';

@NgModule({
  imports: [
    FluentFormModule
  ]
})
export class YourModule { }
```

配置 `schemas` 参数，构建你的表单：

```ts
import { date, form, number, text } from 'ngx-fluent-form';

@Component({
  template: `<fluent-form [(model)]="model" [schema]="schema"></fluent-form>`
})
export class Component {
  schema = form(
    text('text').label('label'),
    number('number').label('label').max(100),
    date('date').label('label')
  );

  model = {
    text: 'fluent-form',
    number: 10,
    date: Date.now()
  };
}
```

## 注意

为了获得更好的性能，`ngx-fluent-form` 所有组件都运行在 [OnPush](https://angular.io/api/core/ChangeDetectionStrategy) 模式下，这意味着对 `@Input()` 数据的 `mutate` 操作将不会生效，请使用 `immutable` 方式操作数组或者对象。

## 支持

喜欢 `ngx-fluent-form` ？为该项目点星⭐！
