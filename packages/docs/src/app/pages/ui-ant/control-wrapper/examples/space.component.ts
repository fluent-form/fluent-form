import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { button, space, textField } from '@fluent-form/ui-zorro';

@Component({
  selector: 'space-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class SpaceExampleComponent {
  readonly schema = form(() => {
    space().label('Inputs with space').col(4).schemas(() => {
      textField('firstName').placeholder('Please enter').col(4);
      textField('lastName').placeholder('Please enter').col(8);
    });

    space().label('Input with button').col(4).schemas(() => {
      textField('keyword').placeholder('Please enter').col('fill');
      button().type('primary').variants({ ghost: true }).content('Search');
    });
  });

  readonly model = signal({});
}
