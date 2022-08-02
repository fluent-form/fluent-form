# ngx-fluent-form

Building dynamic form in Angular with Fluent API.

[![npm version](https://img.shields.io/npm/v/ngx-fluent-form/latest.svg)](https://npmjs.com/package/ngx-fluent-form)
![Node.js CI](https://github.com/HyperLife1119/ngx-fluent-form/workflows/Node.js%20CI/badge.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
[![Angular](https://img.shields.io/badge/Build%20with-Angular%20CLI-red?logo=angular)](https://www.github.com/angular/angular)
[![CodeFactor](https://www.codefactor.io/repository/github/hyperlife1119/ngx-fluent-form/badge)](https://www.codefactor.io/repository/github/hyperlife1119/ngx-fluent-form)
[![简体中文](https://img.shields.io/static/v1?label=简体中文&message=zh-CN&color=212121)](https://github.com/HyperLife1119/ngx-fluent-form/blob/main/README.zh-CN.md)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://hyperlife1119.github.io/ngx-fluent-form)

## Features

- Support using Fluent API and JSON.
- Type-safe form configuration.
- Built on top of Angular Reactive Forms.
- Form components and grid layout based on `ng-zorro-antd`.

## Prerequisites

- [Angular](https://angular.io) >= 13.0.0
- [ng-zorro-antd](https://ng.ant.design) >= 13.0.0

## Install

```shell
npm i ngx-fluent-form
```

## Docs

For documentation and examples please visit [https://hyperlife1119.github.io/ngx-fluent-form](https://hyperlife1119.github.io/ngx-fluent-form).

## Usage

Import the `FluentFormModule` into your module:

```ts
import { FluentFormModule } from 'ngx-fluent-form';

@NgModule({
  imports: [
    FluentFormModule
  ]
})
export class YourModule { }
```

Configure `schemas` parameter to build your form::

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

## Notice

For better performance, all components of `ngx-fluent-form` run in [OnPush](https://angular.io/api/core/ChangeDetectionStrategy) mode, this means that `mutate` operations on @Input() data will not take effect, please use `immutable` methods to manipulate arrays or objects.

## Support

Like `ngx-fluent-form` ? ⭐Star for this project!