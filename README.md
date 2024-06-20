<div align="center">
  <h1>
    <img src="./logo/outline.png" height="65" />
  </h1>

  An Angular dynamic forms library powered by Fluent API and JSON.

  [![npm version](https://img.shields.io/npm/v/@fluent-form/core/latest.svg)](https://www.npmjs.com/settings/fluent-form/packages)
  ![Node.js CI](https://github.com/fluent-form/fluent-form/workflows/Node.js%20CI/badge.svg)
  ![License](https://img.shields.io/badge/License-MIT-blue.svg)
  [![Angular](https://img.shields.io/badge/Build%20with-Angular%20CLI-red?logo=angular)](https://www.github.com/angular/angular)
  [![codecov](https://codecov.io/gh/fluent-form/fluent-form/branch/main/graph/badge.svg?token=070GEU44U0)](https://codecov.io/gh/fluent-form/fluent-form)
  [![CodeFactor](https://www.codefactor.io/repository/github/fluent-form/fluent-form/badge)](https://www.codefactor.io/repository/github/fluent-form/fluent-form)
</div>

## Features

- Support for using the Fluent API with JSON.
- Based on embedded view, no host element, supports nested layout.
- Imported on demand and tree-shakable.
- Built on Angular reactive forms.
- Supports integration with UI libraries.

## Install

```bash
ng add @fluent-form/core
```

## Docs

For documentation and examples please visit [https://fluent-form.github.io/fluent-form](https://fluent-form.github.io/fluent-form).

## Usage

```ts
import { FluentFormComponent, form } from '@fluent-form/core';
import { button, number, text } from '@fluent-form/ui-zorro';

@Component({
  standalone: true,
  imports: [FluentFormComponent],
  template: `<fluent-form [(model)]="model" [schema]="schema" />`
})
export class ExampleComponent {
  schema = form(() => {
    text('text');
    number('count');
    button().content('submit');
  });

  model = {
    text: 'I love fluent form',
    count: 10
  };
}
```

## Stage

Currently in beta, we look forward to your active trial, we will continue to actively collect user feedback, rapid iteration and continuous improvement of functionality and performance.

## Support

Do you love ✨ fluent-form ✨ ? Star for [this](https://github.com/fluent-form/fluent-form) project!

##  Special thanks

Thanks to [JetBrains](https://www.jetbrains.com/?from=fluent-form) for supporting us free open source licenses.

![JetBrains Logo (Main) logo](https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.svg)

## License

[MIT](https://github.com/fluent-form/fluent-form/blob/main/LICENSE)
