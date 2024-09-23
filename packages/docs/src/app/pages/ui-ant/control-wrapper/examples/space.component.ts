import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { button, space, text } from '@fluent-form/ui-zorro';

@Component({
  selector: 'space-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class SpaceExampleComponent {
  schema = form(() => {
    space().label('Inputs with space').col(4).schemas(() => {
      text('firstName').placeholder('Please enter').col(4);
      text('lastName').placeholder('Please enter').col(8);
    })

    space().label('Input with button').col(4).schemas(() => {
      text('keyword').placeholder('Please enter').col('fill');
      button().type('primary').variants({ ghost: true }).content('Search');
    })
  });

  model = {};
}
