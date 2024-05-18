import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { FluentFormModule, FluentGridModule, form, input, inputGroup } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormModule, FluentGridModule, NzToolTipModule, JsonPipe],
  templateUrl: './named-template.component.html'
})
export class NamedemplateExampleComponent {
  schema = form(() => {
    inputGroup().before('Https://').after('#tld').schemas(() => {
      input('text').col(12);
    });
  });

  model = {};
}
