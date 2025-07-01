import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormModule } from '@fluent-form/core';
import { button, form, textField } from '@fluent-form/ui-zorro';

@Component({
  selector: 'label-example',
  imports: [FluentFormModule, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model">
      <ng-template fluentTemplate="labelTmpl">
        <strong>Custom Template</strong>
      </ng-template>
    </fluent-form>
    <pre>{{ model() | json }}</pre>
  `
})
export class LabelExampleComponent {
  readonly schema = form(it => {
    it.layout('horizontal');

    textField('text-1').label('Normal label').col(12);
    textField('text-2').label('#labelTmpl').col(12);

    textField('text-3').label({ content: 'Fixed width', width: 80 }).col(12);
    button().type('primary').label({ width: 80 }).content('Submit').variants({ block: true });

    textField('text-4').label({ content: 'Align right', span: 4 }).col(12);
    textField('text-5')
      .label({ content: 'With tips', span: 4 })
      .tooltip('Tips')
      .col(12);
    textField('text-6')
      .label({ content: 'Custom tip icon', span: 4 })
      .tooltip({ content: 'Tips', icon: 'info-circle' })
      .col(12);
    textField('text-7').label({ content: 'Looooooooooooong text auto line wrap', wrap: true, span: 4 }).col(12);

    button().type('primary').label({ span: 4 }).content('Submit').variants({ block: true });
  });

  readonly model = signal({});
}
