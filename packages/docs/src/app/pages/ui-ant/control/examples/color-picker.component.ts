import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent } from '@fluent-form/core';
import { colorPicker, form } from '@fluent-form/ui-zorro';

@Component({
  selector: 'color-picker-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class ColorPickerExampleComponent {
  readonly schema = form(() => {
    colorPicker('color1');
    colorPicker('color2').showText(true);
  });

  readonly model = signal({});
}
