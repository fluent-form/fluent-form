<div class="text-center mt-8">
  <div class="text-6xl">
    {% include "../../markdowns/brand.md" %}
  </div>

  An Angular dynamic forms library powered by Fluent API and JSON.

  ![npm version](https://img.shields.io/npm/v/@fluent-form/core/latest.svg)
  ![CI](https://github.com/fluent-form/fluent-form/actions/workflows/ci.yml/badge.svg)
  ![License](https://img.shields.io/badge/License-MIT-blue.svg)
  ![Angular](https://img.shields.io/badge/Angular-≥17.0.0-red?logo=angular)
  ![codecov](https://codecov.io/gh/fluent-form/fluent-form/branch/main/graph/badge.svg?token=070GEU44U0)
  ![CodeFactor](https://www.codefactor.io/repository/github/fluent-form/fluent-form/badge)
</div>

## Features

- Support for using the Fluent API with JSON.
- Based on embedded view, no host element, supports nested layout.
- Imported on demand and tree-shakable.
- Built on Angular reactive forms.
- Supports integration with UI libraries.

## Basic usage

```ts
import { FluentForm, form } from '@fluent-form/core';
import { button, numberField, textField } from '@fluent-form/ui-zorro';

@Component({
  standalone: true,
  imports: [FluentForm],
  template: `<fluent-form [(model)]="model" [schema]="schema" />`
})
export class ExampleComponent {
  schema = form(() => {
    textField('text');
    numberField('count');
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

## Changelog

[Learn about the latest improvements.](https://github.com/fluent-form/fluent-form/blob/main/CHANGELOG.md)

## Support

Do you love ✨ {% include "../../markdowns/brand.md" %} ✨ ? Star for [this](https://github.com/fluent-form/fluent-form) project!

##  Special thanks

Thanks to [JetBrains](https://www.jetbrains.com/?from=fluent-form) for supporting us free open source licenses.

![JetBrains Logo (Main) logo](https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.svg)

## License

[MIT](https://github.com/fluent-form/fluent-form/blob/main/LICENSE)
