# ngx-fluent-form

Building dynamic form in Angular with Fluent API.

[![npm version](https://img.shields.io/npm/v/ngx-fluent-form/latest.svg)](https://npmjs.com/package/ngx-fluent-form)
![Node.js CI](https://github.com/HyperLife1119/ngx-fluent-form/workflows/Node.js%20CI/badge.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
[![Angular](https://img.shields.io/badge/Build%20with-Angular%20CLI-red?logo=angular)](https://www.github.com/angular/angular)
[![CodeFactor](https://www.codefactor.io/repository/github/hyperlife1119/ngx-fluent-form/badge)](https://www.codefactor.io/repository/github/hyperlife1119/ngx-fluent-form)
[![简体中文](https://img.shields.io/static/v1?label=简体中文&message=zh-CN&color=212121)](https://github.com/HyperLife1119/ngx-fluent-form/blob/main/README.zh-CN.md)

## Features

- Support using Fluent API and JSON.
- Type-safe form configuration.
- Built on top of Angular Reactive Forms.
- Form controls and grid layout based on `ng-zorro-antd`.

## Prerequisites

- [Angular](https://angular.io) >= 13.0.0
- [ng-zorro-antd](https://ng.ant.design) >= 13.0.0

## Install

```shell
npm i ngx-fluent-form
```

## Docs

- For the full API definition, please visit [here](https://hyperlife1119.github.io/ngx-fluent-form).
- [Online examples](https://hyperlife1119.github.io/ngx-fluent-form/demo), and [sample code](https://github.dev/HyperLife1119/ngx-fluent-form/tree/main/projects/demo/src/app/app.component.ts).

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

Build the form using the Fluent API:

```ts
import { date, form, number, text } from 'ngx-fluent-form';

@Component({
  template: `<fluent-form [(ngModel)]="model" [schema]="schema"></fluent-form>`
})
export class Component {
  schema = form(
    text('text').label('label').placeholder('placeholder').span(6),
    number('number').label('label').placeholder('placeholder').span(3).max(100),
    date('date').label('label').placeholder('placeholder').span(6)
  );

  model = {
    text: 'fluent-form',
    number: 10,
    date: Date.now()
  };
}
```

You can use JSON to build the form:

```ts
import { AnyControlOptions } from 'ngx-fluent-form';

@Component(...)
export class Component {
  schema: AnyControlOptions[] = [
    { type: 'text', name: 'text', label: 'label', span: 6 }
  ];
}
```

You can also mix Fluent API and JSON:

```ts
import { AnyControlOptions, number } from 'ngx-fluent-form';

@Component(...)
export class Component {
  schema: AnyControlOptions[] = [
    { type: 'text', name: 'text', label: 'label', span: 6 },
    number('number').label('label').placeholder('placeholder').span(3).build(),
  ];
}
```

For nested forms, you can use the `embed` control (supports infinite nesting):

```ts
import { date, form, number, text, embed, switcher } from 'ngx-fluent-form';

@Component(...)
export class Component {
  schema = form(
    text('text').label('label').placeholder('placeholder').span(6),
    number('number').label('label').placeholder('placeholder').span(3).max(100),

    embed('detail').label('detail').span(24).schema(form(
      date('date').label('label').placeholder('placeholder').span(6),
      switcher('switch').label('label').span(2),
    ))
  );

  model = {
    text: 'fluent-form',
    number: 10,
    detail: {
      date: Date.now(),
      switch: true
    }
  };
}
```

For values that require bidirectional mapping, the `mapper` option can be used. For example, the date control expects and will output a `Date` object, and we expect a date string from the date control output:

```ts
import { date, form } from 'ngx-fluent-form';

@Component(...)
export class Component {
  schema = form(
    date('date').label('label').placeholder('placeholder').span(6).mapper({
      input: (o: string) => new Date(o),
      output: (o: Date) => [o.getFullYear(), o.getMonth() + 1, o.getDate()].join('-')
    })
  );

  model = {
    date: '2022-2-22'
  };
}
```

For range selection controls, such as the `range` control, it will output an array of two elements, and we expect to map the two elements of the array to two properties:

```ts
import { form, range } from 'ngx-fluent-form';

@Component(...)
export class Component {
  schema = form(
    range(['start', 'end']).label('label').span(6),
  );

  model = {
    start: null,
    end: null
  };
}
```

For additional property binding or event listening, the `property` and `listener` options can be used：

```ts
import { form, time } from 'ngx-fluent-form';

@Component(...)
export class Component {
  schema = form(
    time('time').label('label').span(6).property({
      nzNowText: 'Now'
    }).listener({
      nzOpenChange: (event, options) => console.log(event, options)
    }),
  );
}
```
