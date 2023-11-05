import { JsonPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FluentFormModule, form, headless, row, template } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [NgFor, FluentFormModule, NzGridModule, JsonPipe, ReactiveFormsModule],
  templateUrl: './custom-template.component.html'
})
export class CustomTemplateExampleComponent {
  schema = form(() => {
    row().col(24).schemas(() => {
      headless('headless').template('controlTpl');
    });
    row().schemas(() => {
      template('namedTpl1');
      template('namedTpl2');
      template('namedTpl3');
    });
  });

  model = {};
}
