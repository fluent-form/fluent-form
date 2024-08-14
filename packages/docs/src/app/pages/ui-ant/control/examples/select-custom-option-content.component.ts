import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormModule, form } from '@fluent-form/core';
import { select } from '@fluent-form/ui-zorro';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'select-custom-option-content-example',
  standalone: true,
  imports: [FluentFormModule, NzTagModule, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model">
      <ng-template fluentTemplate="optionTpl" let-option>
        <nz-tag nzColor="magenta">Label</nz-tag>{{ option.label }}
      </ng-template>
    </fluent-form>
    <pre>{{ model | json }}</pre>
  `
})
export class SelectCustomOptionContentExampleComponent {
  schema = form(() => {
    select('user')
      .placeholder('Please select user')
      .option('#optionTpl')
      .options([
        { label: 'Jack', value: 'jack' },
        { label: 'lucy', value: 'lucy' },
        { label: 'Mike', value: 'mike' },
      ])
      .col(4);
  });

  model = {};

}
