import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormModule } from '@fluent-form/core';
import { form, textField } from '@fluent-form/ui-zorro';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'text-field-example',
  imports: [FluentFormModule, JsonPipe, NzIconModule],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model">
      <ng-template fluentTemplate="settingsIconTmpl">
        <nz-icon nzType="setting" nzTheme="outline" />
      </ng-template>
    </fluent-form>
    <pre>{{ model() | json }}</pre>
  `
})
export class TextFieldExampleComponent {
  readonly schema = form(() => {
    textField('name').label('Text').placeholder('Please enter').col(4);
    textField('pwd').type('password').label('Password').placeholder('Please enter').col(4);

    textField('rmb1')
      .label('With affixes')
      .placeholder('Please enter')
      .affixes({ prefix: '￥', suffix: 'RMB' })
      .col(4);

    textField('rmb2')
      .label('With icon affixes')
      .placeholder('Please enter')
      .affixes({ suffix: '#settingsIconTmpl' })
      .col(4);

    textField('cny1')
      .label('With addons')
      .placeholder('Please enter')
      .addons({ before: '￥', after: 'CNY' })
      .col(4);

    textField('cny2')
      .label('With icon addons')
      .placeholder('Please enter')
      .addons({ after: '#settingsIconTmpl' })
      .col(4);

    textField('clearable')
      .label('With clear button')
      .placeholder('Please enter')
      .clearable(true)
      .col(4);
  });

  readonly model = signal({});
}
