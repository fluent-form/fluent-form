import { Component, signal } from '@angular/core';
import { FluentFormModule, form } from '@fluent-form/core';
import { textField } from '@fluent-form/ui-zorro';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'named-template-example',
  imports: [FluentFormModule, NzToolTipModule],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model">
      <span *fluentTemplate="'tld'" nz-tooltip nzTooltipTitle="顶级域名">.com</span>
    </fluent-form>
  `
})
export class NamedTemplateExampleComponent {
  readonly schema = form(() => {
    textField('text').addons({
      before: 'Https://',
      after: '#tld'
    });
  });

  readonly model = signal({});
}
