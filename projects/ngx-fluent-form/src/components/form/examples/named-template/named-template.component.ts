import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { FluentFormModule, form, input, inputGroup } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormModule, NzGridModule, NzToolTipModule, JsonPipe],
  templateUrl: './named-template.component.html'
})
export class NamedemplateExampleComponent {
  schema = form(() => {
    inputGroup().before('Https://').after('#tld').schemas(() => {
      input('text').col(24);
    });
  });

  model = {};
}
