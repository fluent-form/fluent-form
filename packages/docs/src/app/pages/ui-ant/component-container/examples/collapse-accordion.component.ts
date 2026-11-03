import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { collapse, collapsePanel, numberField, textField, toggle } from '@fluent-form/ui-zorro';

@Component({
  selector: 'collapse-accordion-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class CollapseAccordionExampleComponent {
  readonly schema = form(() => {
    toggle('advancedEnabled').label('Enable advanced settings').col(12);

    collapse().accordion(true).size('small').expandIconPlacement('end').col(12)
      .schemas(() => {
        collapsePanel().header('General settings').active(true).schemas(() => {
          textField('title').label('Title').col(12);
        });

        collapsePanel().header('Notifications').schemas(() => {
          toggle('emailNotifications').label('Email notifications').col(12);
        });

        collapsePanel()
          .header('Advanced settings')
          .collapsible(({ model }) => model.advancedEnabled ? 'header' : 'disabled')
          .schemas(() => {
            numberField('retryCount').label('Retry count').range({ min: 0 }).precision(0).col(12);
          });
      });
  });

  readonly model = signal({ advancedEnabled: false });
}
