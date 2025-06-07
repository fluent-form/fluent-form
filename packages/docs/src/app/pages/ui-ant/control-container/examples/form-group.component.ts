import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { button, group, numberField, textField } from '@fluent-form/ui-zorro';

@Component({
  selector: 'form-group-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class FormGroupExampleComponent {
  readonly schema = form(() => {
    textField('name').label('用户名').col(12);
    numberField('age').label('年龄').col(12);

    group('info').label('其他信息').col(12).schemas(() => {
      textField('cellphone').type('tel').label('手机号').col(6);
      textField('email').type('email').label('邮箱').col(6);
    });

    button().content('提交').type('primary').variants({ block: true });
  });

  readonly model = signal({});
}
