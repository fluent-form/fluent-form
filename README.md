# ngx-fluent-form

Building dynamic form in Angular with Fluent API or JSON.

[![npm version](https://img.shields.io/npm/v/ngx-fluent-form/latest.svg)](https://npmjs.com/package/ngx-fluent-form)
![Node.js CI](https://github.com/HyperLife1119/ngx-fluent-form/workflows/Node.js%20CI/badge.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
[![Angular](https://img.shields.io/badge/Build%20with-Angular%20CLI-red?logo=angular)](https://www.github.com/angular/angular)
[![codecov](https://codecov.io/gh/HyperLife1119/ngx-fluent-form/branch/main/graph/badge.svg?token=070GEU44U0)](https://codecov.io/gh/HyperLife1119/ngx-fluent-form)
[![CodeFactor](https://www.codefactor.io/repository/github/hyperlife1119/ngx-fluent-form/badge)](https://www.codefactor.io/repository/github/hyperlife1119/ngx-fluent-form)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://hyperlife1119.github.io/ngx-fluent-form)
[![简体中文](https://img.shields.io/static/v1?label=简体中文&message=zh-CN&color=212121)](https://github.com/HyperLife1119/ngx-fluent-form/blob/main/README.zh-CN.md)

## Features

- Support using Fluent API and JSON.
- Based on Angular Template, without Host Element, supports nested layout.
- Type-safe form schema configuration.
- Built on top of Angular Reactive Forms.
- Components and grid layout based on [NG-ZORRO](https://ng.ant.design).

## Prerequisites

Before using `ngx-fluent-form`, you should have a basic understanding of the following:

- [Angular Reactive Forms](https://angular.cn/guide/reactive-forms)
- [NG-ZORRO Components](https://ng.ant.design)

And make sure your relevant dependency versions meet the following requirements:

- `angular >= v15.0.0`
- `ng-zorro-antd >= v15.0.0`

## Install

```shell
$ ng add ngx-fluent-form
```

## Docs

For documentation and examples please visit [https://hyperlife1119.github.io/ngx-fluent-form](https://hyperlife1119.github.io/ngx-fluent-form).

## Usages

`ngx-fluent-form` supports both `NgModule` or `Standalone` based projects. For different types of projects, there are slightly different usages:

### Standalone usage:

1. Configure `provideFluentForm()` and add it to `bootstrapApplication()`:

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

2. Add `FluentFormComponent` to your standalone component, configure the `schemas` parameter, and start building the form:

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

### NgModule usage:

1. Configure `FluentFormModule.forRoot()` and add it to your root `NgModule`, usually `AppModule`

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

2. Add `FluentFormModule` into your `NgModule`:

```ts
import { FluentFormModule } from 'ngx-fluent-form';

@NgModule({
  imports: [
    FluentFormModule
  ]
})
export class YourModule { }
```

3. Configure `schemas` parameter to start building form:

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

## Support

Do you love `ngx-fluent-form`? Star for this project! ⭐

## Special thanks

Thanks to [JetBrains](https://www.jetbrains.com/?from=ngx-fluent-form) for supporting us free open source licenses.

![JetBrains Logo (Main) logo](https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.svg)
