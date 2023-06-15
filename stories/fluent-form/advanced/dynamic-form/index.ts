import { Component } from '@angular/core';
import { array, button, buttonGroup, form, FormArraySchema, input, schemasUtils } from 'ngx-fluent-form';
import { AbstractFluentFormWrapperComponent, defineMeta, defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

@Component({
  selector: 'fluent-form-wrapper',
  template: `
    <div nz-row nzGutter="20">
      <fluent-form
        nz-col
        nzFlex="2"
        [(model)]="model"
        [schemas]="schemas"
        [layout]="layout"
        [colon]="colon"
        [gutter]="gutter"></fluent-form>
      <div nz-col nzFlex="1">
        <pre>{{ model | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    pre { padding: 5px; background: #f5f5f5; border: 1px solid #e0e0e0 }
  `]
})
class FluentFormWrapperComponent extends AbstractFluentFormWrapperComponent {
  constructor() {
    super();

    this.schemas = form(
      array('passengers').col(24).schemas(
        input().label('乘客').col(12),
      ),
      buttonGroup().schemas(
        button().type('primary').content('添加控件').listeners({
          click: () => this.add()
        }),
        button().content('移除控件').listeners({
          click: () => this.remove()
        }),
      )
    );

    this.model = {};
  }

  add() {
    const array = schemasUtils(this.schemas).find<FormArraySchema>('passengers')!;
    array.schemas.push(
      input().label('乘客').col(12)
    );
    this.schemas = form(...this.schemas);
  }

  remove() {
    const array = schemasUtils(this.schemas).find<FormArraySchema>('passengers')!;
    array.schemas.pop();
    this.schemas = form(...this.schemas);
  }
}

export const meta = defineMeta({
  component: FluentFormWrapperComponent
});

export const story = defineStory();

export const source = dedent`
  import { Component } from '@angular/core';
  import { array, button, buttonGroup, form, FormArraySchema, input, schemasUtils } from 'ngx-fluent-form';

  @Component({
    selector: 'example-component',
    template: \`
      <fluent-form [schemas]="schemas" [(model)]="model"></fluent-form>
    \`
  })
  export class ExampleComponent {
    schemas = form(
      array('passengers').col(24).schemas(
        input().label('乘客').col(12),
      ),
      buttonGroup().schemas(
        button().type('primary').content('添加控件').listeners({
          click: () => this.add()
        }),
        button().content('移除控件').listeners({
          click: () => this.remove()
        }),
      )
    );

    model = {};

    add() {
      const array = schemasUtils(this.schemas).find<FormArraySchema>('passengers')!;
      array.schemas.push(
        input().label('乘客').col(12).build()
      );
      array.schemas = [...array.schemas];
      this.schemas = [...this.schemas];
    }

    remove() {
      const array = schemasUtils(this.schemas).find<FormArraySchema>('passengers')!;
      array.schemas.pop();
      array.schemas = [...array.schemas];
      this.schemas = [...this.schemas];
    }
  }
`;
