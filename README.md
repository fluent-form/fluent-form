<div align="center">

<img src="./logo.svg" width="130" />

# ngx-fluent-form

An Angular dynamic forms library, using the Fluent API or JSON to build dynamic forms.

[![npm version](https://img.shields.io/npm/v/ngx-fluent-form/latest.svg)](https://npmjs.com/package/ngx-fluent-form)
![Node.js CI](https://github.com/HyperLife1119/ngx-fluent-form/workflows/Node.js%20CI/badge.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
[![Angular](https://img.shields.io/badge/Build%20with-Angular%20CLI-red?logo=angular)](https://www.github.com/angular/angular)
[![codecov](https://codecov.io/gh/HyperLife1119/ngx-fluent-form/branch/main/graph/badge.svg?token=070GEU44U0)](https://codecov.io/gh/HyperLife1119/ngx-fluent-form)
[![CodeFactor](https://www.codefactor.io/repository/github/hyperlife1119/ngx-fluent-form/badge)](https://www.codefactor.io/repository/github/hyperlife1119/ngx-fluent-form)
[![简体中文](https://img.shields.io/static/v1?label=简体中文&message=zh-CN&color=212121)](https://github.com/HyperLife1119/ngx-fluent-form/blob/main/README.zh-CN.md)

</div>

## Features

- Support for using the Fluent API with JSON.
- Based on EmbeddedView, no HostElement, supports nested layout.
- Imported on demand and tree-shakable.
- Built on Angular reactive forms.
- Integrated with [Ant Design](https://ng.ant.design).

## Install

```bash
ng add ngx-fluent-form
```

## Docs

For documentation and examples please visit [https://hyperlife1119.github.io/ngx-fluent-form](https://hyperlife1119.github.io/ngx-fluent-form).

## Usage

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

## Stage

Currently in beta, we look forward to your active trial, we will continue to actively collect user feedback, rapid iteration and continuous improvement of functionality and performance.

## Support

Do you love `ngx-fluent-form`? ⭐ Star for this project!

##  Special thanks

Thanks to [JetBrains](https://www.jetbrains.com/?from=ngx-fluent-form) for supporting us free open source licenses.

![JetBrains Logo (Main) logo](https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.svg)

## License

[MIT](https://github.com/HyperLife1119/ngx-fluent-form/blob/main/LICENSE)
