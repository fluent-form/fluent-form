import { Component } from '@angular/core';
import { form, headless, row, template } from 'ngx-fluent-form';
import { AbstractFluentFormWrapperComponent, defineMeta, defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

@Component({
  selector: 'fluent-form-wrapper',
  template: `
    <div nz-row nzGutter="20">
      <fluent-form
        nz-col
        nzFlex="2"
        [schema]="schema"
        [(model)]="model"
        [layout]="layout"
        [colon]="colon"
        [gutter]="gutter">
        <input
          *fluentTemplate="'controlTpl'; control as control"
          [formControl]="control"
          placeholder="custom control template" />

        <ng-container *fluentTemplate="'namedTpl1'">
          <button>click me</button>
        </ng-container>

        <ng-container *fluentTemplate="'namedTpl2'; schema as schema; model as model; control as control">
          <button>{{ schema.kind }}</button>
        </ng-container>

        <ng-template fluentTemplate="namedTpl3" let-schema="schema" let-model="model" let-control="control">
          <button>{{ model | json }}</button>
        </ng-template>
      </fluent-form>

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

    this.schema = form(() => {
      row().col(24).schemas(() => {
        headless('headless').template('controlTpl');
      });
      row().schemas(() => {
        template('namedTpl1');
        template('namedTpl2');
        template('namedTpl3');
      });
    });

    this.model = {};
  }
}

export const meta = defineMeta({
  component: FluentFormWrapperComponent
});

export const story = defineStory();

export const source = dedent`
  import { Component } from '@angular/core';
  import { form, headless, row, template } from 'ngx-fluent-form';

  @Component({
    selector: 'example-component',
    template: \`
      <fluent-form [(model)]="model" [schema]="schema">
        <input
          *fluentTemplate="'controlTpl'; control as control"
          [formControl]="control"
          placeholder="custom control template" />

        <ng-container *fluentTemplate="'namedTpl1'">
          <button>click me</button>
        </ng-container>

        <ng-container *fluentTemplate="'namedTpl2'; schema as schema; model as model; control as control">
          <button>{{ schema.kind }}</button>
        </ng-container>

        <ng-template fluentTemplate="namedTpl3" let-schema="schema" let-model="model" let-control="control">
          <button>{{ model | json }}</button>
        </ng-template>
      </fluent-form>
    \`
  })
  export class ExampleComponent {
    schema = form(() => {
      row().col(24).schemas(() => {
        headless('headless').template('controlTpl');
      });
      row().schemas(() => {
        template('namedTpl1');
        template('namedTpl2');
        template('namedTpl3');
      });
    });

    model = {};
  }
`;
