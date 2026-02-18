import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { textField } from '@fluent-form/ui-zorro';

@Component({
  selector: 'class-style-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class ClassStyleExampleComponent {
  readonly schema = form(() => {
    textField('class').label('Class').class('font-bold');
    textField('style').label('Style').style({ fontWeight: 'bold' });
    textField('host-class').label('Host class').class({
      host: 'font-bold'
    });
    textField('host-style').label('Host style').style({
      host: { fontWeight: 'bold' }
    });
    textField('wrapper-class').label('Wrapper class').class({
      wrapper: 'font-bold'
    });
    textField('wrapper-style').label('Wrapper style').style({
      wrapper: { fontWeight: 'bold' }
    });
  });

  readonly model = signal({});
}
