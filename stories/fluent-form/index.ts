import { Component } from '@angular/core';
import { AbstractFluentFormWrapperComponent, defineMeta } from 'stories/storybook';
import dedent from 'ts-dedent';


@Component({
  selector: 'fluent-form-wrapper',
  template: `
    <div nz-row nzGutter="20">
      <fluent-form
        nz-col
        nzFlex="2"
        [schemas]="schemas"
        [(model)]="model"
        [layout]="layout"
        [colon]="colon"
        [spinning]="spinning"
        [spinTip]="spinTip"
        [spinSize]="spinSize"></fluent-form>
      <div nz-col nzFlex="1">
        <pre>{{ model | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    pre { padding: 5px; background: #f5f5f5; border: 1px solid #e0e0e0 }
  `]
})
class FluentFormWrapperComponent extends AbstractFluentFormWrapperComponent { }

export const meta = defineMeta({
  component: FluentFormWrapperComponent
});

// TODO: move to ./index.story.mdx
export const moduleSource = dedent`
  import { FluentFormModule } from 'ngx-fluent-form';

  @NgModule({
    imports: [
      FluentFormModule
    ]
  })
  export class YourModule { }
`;

export const cmpSource = dedent`
  import { date, form, number, input } from 'ngx-fluent-form';

  @Component({
    template: \`<fluent-form [(model)]="model" [schemas]="schemas"></fluent-form>\`
  })
  export class ExampleComponent {
    schemas = form(
      input('text').label('文本'),
      number('number').label('数字').max(100),
      date('date').label('日期')
    );

    model = {
      text: 'fluent-form',
      number: 10,
      date: Date.now()
    };
  }
`;