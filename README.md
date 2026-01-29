<div align="center">
  <h1>
    <img src="./logo/outline.png" height="65" />
  </h1>

  An Angular dynamic forms library powered by Fluent API and JSON.

  [![npm version](https://img.shields.io/npm/v/@fluent-form/core/latest.svg)](https://www.npmjs.com/settings/fluent-form/packages)
  ![CI](https://github.com/fluent-form/fluent-form/actions/workflows/ci.yml/badge.svg)
  ![License](https://img.shields.io/badge/License-MIT-blue.svg)
  [![Angular](https://img.shields.io/badge/Angular-≥19.0.0-red?logo=angular)](https://www.github.com/angular/angular)
  [![codecov](https://codecov.io/gh/fluent-form/fluent-form/branch/main/graph/badge.svg?token=070GEU44U0)](https://codecov.io/gh/fluent-form/fluent-form)
  [![CodeFactor](https://www.codefactor.io/repository/github/fluent-form/fluent-form/badge)](https://www.codefactor.io/repository/github/fluent-form/fluent-form)
</div>

## Features

- Support for using the Fluent API and JSON.
- Based on embedded view, no host element, supports nested layout.
- Tree shakable, supports lazy loading and preloading.
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
import { FluentForm, form } from '@fluent-form/core';
import { button, numberField, textField, textArea } from '@fluent-form/ui-zorro';

@Component({
  imports: [FluentForm],
  template: `<fluent-form [schema]="schema()" [(model)]="model" />`
})
export class ExampleComponent {
  readonly schema = form(() => {
    textField('name').label('Name').required(true);
    numberField('age').label('Age').required(true);
    textArea('bio').label('Bio').placeholder('Tell us about yourself');
    button().content('Submit');
  });

  readonly model = signal({
    name: 'John Doe',
    age: null,
    bio: 'I love fluent form'
  });
}
```

## Stage

Currently in beta, we look forward to your active trial, we will continue to actively collect user feedback, rapid iteration and continuous improvement of functionality and performance.

## Changelog

[Learn about the latest improvements.](https://github.com/fluent-form/fluent-form/blob/main/CHANGELOG.md)

## Support

Do you love ✨ fluent-form ✨ ? Star for [this](https://github.com/fluent-form/fluent-form) project!

##  Special thanks

Thanks to [JetBrains](https://www.jetbrains.com/?from=fluent-form) for supporting us free open source licenses.

![JetBrains Logo (Main) logo](https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.svg)

## License

[MIT](https://github.com/fluent-form/fluent-form/blob/main/LICENSE)
