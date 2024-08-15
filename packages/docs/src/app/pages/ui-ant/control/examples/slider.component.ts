import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { slider } from '@fluent-form/ui-zorro';

@Component({
  selector: 'slider-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class SliderExampleComponent {
  schema = form(() => {
    slider('value')
      .label('Please drag the slider')
      .defaultValue(30)
      .col(6);
    slider(['min', 'max'])
      .type('range')
      .label('Please drag the slider')
      .defaultValue([10, 50])
      .col(6);
  });

  model = {};
}