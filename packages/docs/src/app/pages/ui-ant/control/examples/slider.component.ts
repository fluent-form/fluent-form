import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent } from '@fluent-form/core';
import { form, slider } from '@fluent-form/ui-zorro';

@Component({
  selector: 'slider-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class SliderExampleComponent {
  readonly schema = form(() => {
    slider('value')
      .label('Please drag the slider')
      .defaultValue(30)
      .col(6);
    slider(['min', 'max'])
      .type('range')
      .label('Please drag the slider')
      .defaultValue([10, 50])
      .col(6);
    slider('temperature')
      .label('With marks')
      .marks({ 0: '0°C', 26: '26°C', 37: '37°C', 100: '100°C' })
      .tip({
        formatter: (value: number) => `${value}°C`
      })
      .defaultValue(30)
      .col(6);
  });

  readonly model = signal({});
}
