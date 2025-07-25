import { Component } from '@angular/core';
import { FluentFormComponent } from '@fluent-form/core';
import { form, textField } from '@fluent-form/ui-zorro';

@Component({
  selector: 'form-layout-example',
  imports: [FluentFormComponent],
  template: `
    <h3>Vertical</h3>
    <fluent-form [schema]="schema1()" [(model)]="model1" />

    <h3>Horizontal</h3>
    <fluent-form [schema]="schema2()" [(model)]="model2" />

    <h3>Inline</h3>
    <fluent-form [schema]="schema3()" [(model)]="model3" />
  `
})
export class FormLayoutExampleComponent {
  readonly schema1 = form(it => {
    it.layout('vertical');
    textField('text-1').label('Label').col(6);
    textField('text-2').label('Label').col(6);
    textField('text-3').label('Label').col(6);
  });

  readonly schema2 = form(it => {
    it.layout('horizontal');
    textField('text-1').label('Label').col(6);
    textField('text-2').label('Label').col(6);
    textField('text-3').label('Label').col(6);
  });

  readonly schema3 = form(it => {
    it.layout('inline');
    textField('text-1').label('Label').col(6);
    textField('text-2').label('Label').col(6);
    textField('text-3').label('Label').col(6);
  });

  readonly model1 = {};
  readonly model2 = {};
  readonly model3 = {};
}
