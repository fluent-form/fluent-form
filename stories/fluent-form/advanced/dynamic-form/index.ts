import { Component } from '@angular/core';
import { array, findSchema, form, FormArraySchema, input } from 'ngx-fluent-form';
import { AbstractFluentFormWrapperComponent, defineMeta, defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

@Component({
  selector: 'fluent-form-wrapper',
  template: `
    <div nz-row nzGutter="20">
      <fluent-form
        nz-col
        nzFlex="2"
        [schemas]="schemas"
        [model]="model"
        [layout]="layout"
        [colon]="colon"
        [spinning]="spinning"
        [spinTip]="spinTip"
        [spinSize]="spinSize"></fluent-form>

      <div nz-col nzFlex="1">
        <pre>{{ model | json }}</pre>
      </div>

      <nz-button-group nz-col nzSpan="24">
        <button nz-button nzType="primary" (click)="add()">添加控件</button>
        <button nz-button nzType="default" (click)="remove()">移除控件</button>
      </nz-button-group>
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
      array('passengers').span(24).schemas(
        input().label('乘客').span(12),
      )
    );

    this.model = {}
  }

  add() {
    const array = findSchema<FormArraySchema>(this.schemas, 'passengers')!;
    array.schemas.push(
      input().label('乘客').span(12).build()
    );
    array.schemas = [...array.schemas];
    this.schemas = [...this.schemas];
  }

  remove() {
    const array = findSchema<FormArraySchema>(this.schemas, 'passengers')!;
    array.schemas.pop();
    array.schemas = [...array.schemas];
    this.schemas = [...this.schemas];
  }
}

export const meta = defineMeta({
  component: FluentFormWrapperComponent
});

export const story = defineStory();

export const source = dedent`
  import { Component } from '@angular/core';
  import { array, findSchema, form, FormArraySchema, input } from 'ngx-fluent-form';

  @Component({
    selector: 'example-component',
    template: \`
      <fluent-form [schemas]="schemas" [model]="model"></fluent-form>

      <nz-button-group>
        <button nz-button nzType="primary" (click)="add()">添加控件</button>
        <button nz-button nzType="default" (click)="remove()">移除控件</button>
      </nz-button-group>
    \`
  })
  export class ExampleComponent {
    schemas = form(
      array('passengers').span(24).schemas(
        input().label('乘客').span(12),
      )
    );

    model = {};

    add() {
      const array = findSchema<FormArraySchema>(this.schemas, 'passengers')!;
      array.schemas.push(
        input().label('乘客').span(12).build()
      );
      array.schemas = [...array.schemas];
      this.schemas = [...this.schemas];
    }

    remove() {
      const array = findSchema<FormArraySchema>(this.schemas, 'passengers')!;
      array.schemas.pop();
      array.schemas = [...array.schemas];
      this.schemas = [...this.schemas];
    }
  }
`;