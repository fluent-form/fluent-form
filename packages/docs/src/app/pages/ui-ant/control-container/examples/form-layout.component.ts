import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { group, input } from '@fluent-form/ui-zorro';

@Component({
  selector: 'form-layout-example',
  standalone: true,
  imports: [FluentFormComponent],
  template: `
    <h3>Vertical</h3>
    <fluent-form [schema]="schema1" [(model)]="model1"></fluent-form>

    <h3>Horizontal</h3>
    <fluent-form [schema]="schema2" [(model)]="model2"></fluent-form>

    <h3>Inline</h3>
    <fluent-form [schema]="schema3" [(model)]="model3"></fluent-form>
  `
})
export class FormLayoutExampleComponent {
  schema1 = form(
    group().layout('vertical').schemas(() => {
      input('text-1').label('控件标签').col(6);
      input('text-2').label('控件标签').col(6);
      input('text-3').label('控件标签').col(6);
    })
  );
  schema2 = form(
    group().layout('horizontal').schemas(() => {
      input('text-1').label('控件标签').col(6);
      input('text-2').label('控件标签').col(6);
      input('text-3').label('控件标签').col(6);
    })
  );
  schema3 = form(
    group().layout('inline').schemas(() => {
      input('text-1').label('控件标签').col(6);
      input('text-2').label('控件标签').col(6);
      input('text-3').label('控件标签').col(6);
    })
  );

  model1 = {};
  model2 = {};
  model3 = {};
}
