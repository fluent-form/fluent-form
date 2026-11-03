import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { collapse, collapsePanel, group, textArea, textField } from '@fluent-form/ui-zorro';

@Component({
  selector: 'collapse-form-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class CollapseFormExampleComponent {
  readonly schema = form(() => {
    collapse().col(12).schemas(() => {
      collapsePanel().header('Basic information').active(true).schemas(() => {
        textField('name').label('Name').col(6);
        textField('nickname').label('Nickname').col(6);
        textArea('bio').label('Bio').col(12);
      });

      collapsePanel().header('Contact information').schemas(() => {
        group('contact').col(12).schemas(() => {
          textField('email').type('email').label('Email').col(6);
          textField('phone').type('tel').label('Phone').col(6);
        });
      });
    });
  });

  readonly model = signal({});
}
