import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { inputAddon, inputGroup, number, select, text } from '@fluent-form/ui-zorro';

@Component({
  selector: 'input-addon-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class InputAddonExampleComponent {
  schema = form(() => {
    inputGroup().label('With control addon').col(5).schemas(() => {
      inputAddon().schemas(() => {
        select('protocol').style({ width: '90px' }).defaultValue('https').options([
          { label: 'http://', value: 'http' },
          { label: 'https://', value: 'https' },
        ]);
      });
      text('url').placeholder('Please enter').col('fill');
      inputAddon().schemas(() => {
        select('domain').style({ width: '80px' }).defaultValue('com').options([
          { label: '.com', value: 'com' },
          { label: '.cn', value: 'cn' },
          { label: '.net', value: 'net' },
          { label: '.org', value: 'org' },
        ]);
      });
    })

    inputGroup().label('Number with control addon').col(5).schemas(() => {
      inputAddon().schemas(() => {
        select('type').style({ width: '55px' }).defaultValue('¥').options([
          { label: '¥', value: '¥' },
          { label: '$', value: '$' },
        ]);
      });
      number('price').placeholder('Please enter').col('fill');
    });
  });

  model = {};
}
