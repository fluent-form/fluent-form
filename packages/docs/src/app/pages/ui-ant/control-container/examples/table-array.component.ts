import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormModule, form } from '@fluent-form/core';
import { button, spaceCompact, tableArray, tableColumn, tableRowGroup, template, textField, toggle } from '@fluent-form/ui-zorro';

@Component({
  selector: 'table-array-example',
  imports: [FluentFormModule, JsonPipe],
  template: `
    <fluent-form class="block" [schema]="schema()" [(model)]="model">
      <ng-template fluentTemplate="idxTmpl" let-control="control">
        {{ control.parent?.controls.indexOf(control)! + 1 }}
      </ng-template>
    </fluent-form>
    <pre>{{ model() | json }}</pre>
  `
})
export class TableArrayExampleComponent {
  readonly schema = form(() => {
    tableArray('passengers')
      .label('Passengers')
      .orderable(true)
      .col(12)
      .schemas(() => {
        tableRowGroup().schemas(() => {
          tableColumn().header('#').schemas(() => {
            template('idxTmpl');
          });
          tableColumn().header('Name').schemas(() => {
            textField('name').placeholder('Please enter');
          });
          tableColumn().header('Cellphone').schemas(() => {
            textField('cellphone').placeholder('Please enter');
          });
          tableColumn().header('Info').tooltip('Tips').schemas(() => {
            spaceCompact().schemas(() => {
              textField('txt1').placeholder('Please enter').col(6);
              textField('txt2').placeholder('Please enter').col(6);
            });
          });
          tableColumn().header('Status').schemas(() => {
            toggle('enabled');
          });
        });
      });

    button()
      .type('primary')
      .content('Submit')
      .variants({ block: true })
      .col(12);
  });

  readonly model = signal({
    passengers: [
      { name: 'John Doe', cellphone: '1234567890', enabled: true },
      { name: 'Jane Smith', cellphone: '0987654321' }
    ]
  });
}
