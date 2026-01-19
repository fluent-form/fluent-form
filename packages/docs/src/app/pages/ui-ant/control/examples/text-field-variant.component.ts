import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormModule, form } from '@fluent-form/core';
import { textField } from '@fluent-form/ui-zorro';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'text-field-variant-example',
  imports: [FluentFormModule, JsonPipe, NzIconModule],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class TextFieldVariantExampleComponent {
  readonly schema = form(() => {
    textField('outlined')
      .label('Outlined')
      .placeholder('Please enter')
      .variant('outlined')
      .col(3);

    textField('filled')
      .label('Filled')
      .placeholder('Please enter')
      .variant('filled')
      .col(3);

    textField('borderless')
      .label('Borderless')
      .placeholder('Please enter')
      .variant('borderless')
      .col(3);

    textField('underlined')
      .label('Underlined')
      .placeholder('Please enter')
      .variant('underlined')
      .col(3);
  });

  readonly model = signal({});
}
