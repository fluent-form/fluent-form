import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { color } from '@fluent-form/ui-zorro';

@Component({
  selector: 'color-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class ColorExampleComponent {
  schema = form(() => {
    color('color1').alpha(false);
    color('color2').showText(true);
  });

  model = {};
}
