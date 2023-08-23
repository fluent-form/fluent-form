import { Component } from '@angular/core';
import { AbstractFluentFormWrapperComponent, defineMeta } from 'stories/storybook';

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
class FluentFormWrapperComponent extends AbstractFluentFormWrapperComponent { }

export const meta = defineMeta({
  component: FluentFormWrapperComponent
});
