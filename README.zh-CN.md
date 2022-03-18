# ngx-fluent-form

在 Angular 中使用 Fluent API 构建动态表单。

[![npm version](https://img.shields.io/npm/v/ngx-fluent-form/latest.svg)](https://npmjs.com/package/ngx-fluent-form)
![Node.js CI](https://github.com/HyperLife1119/ngx-fluent-form/workflows/Node.js%20CI/badge.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
[![Angular](https://img.shields.io/badge/Build%20with-Angular%20CLI-red?logo=angular)](https://www.github.com/angular/angular)
[![CodeFactor](https://www.codefactor.io/repository/github/hyperlife1119/ngx-fluent-form/badge)](https://www.codefactor.io/repository/github/hyperlife1119/ngx-fluent-form)
[![English](https://img.shields.io/static/v1?label=English&message=en-US&color=212121)](https://github.com/HyperLife1119/ngx-fluent-form/blob/main/README.md)

## 特性

- 支持使用 Fluent API 与 JSON。
- 类型安全的表单配置。
- 建立在 Angular 响应式表单之上。
- 基于 `ng-zorro-antd` 的表单控件与栅格布局。

## 先决条件

- [Angular](https://angular.io) >= 13.0.0
- [ng-zorro-antd](https://ng.ant.design) >= 13.0.0

## 安装

```shell
npm i ngx-fluent-form
```

## 文档

- 有关完整的 API 定义，请访问[此处](https://hyperlife1119.github.io/ngx-fluent-form)。
- [在线示例](https://hyperlife1119.github.io/ngx-fluent-form/demo)，及[示例代码](https://github.dev/HyperLife1119/ngx-fluent-form/tree/main/projects/demo/src/app/app.component.ts)。

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

使用 Fluent API 构建表单：

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

你可以使用 JSON 来构建表单：

```ts
import { AnyControlOptions } from 'ngx-fluent-form';

@Component(...)
export class Component {
  schema: AnyControlOptions[] = [
    { type: 'text', name: 'text', label: 'label', span: 6 }
  ];
}
```

你还可以混合使用 Fluent API 和 JSON：

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

对于嵌套表单，可以使用 `embed` 控件（支持无限嵌套）：

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

对于需要双向映射的值，可以使用 `mapper` 选项。例如日期控件期望得到且将输出 `Date` 对象，而我们期望从日期控件输出中得到日期字符串：
<!-- *（注意：`ngx-fluent-form` 默认会将日期控件输出的 `Date` 对象转为时间戳，要覆盖此行为，可以使用 `mapper` 选项。）* -->

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

对于区间选择控件，例如 `range` 控件，它将输出一个包含两个元素的数组，而我们期望将数组里的这两个元素分别映射到两个属性：

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

对于需要绑定额外的属性或事件侦听，可以使用 `property` 和 `listener` 选项：

```ts
import { form, time } from 'ngx-fluent-form';

@Component(...)
export class Component {
  schema = form(
    time('time').label('label').span(6).property({
      nzNowText: '现在'
    }).listener({
      nzOpenChange: (event, options) => console.log(event, options)
    }),
  );
}
```
