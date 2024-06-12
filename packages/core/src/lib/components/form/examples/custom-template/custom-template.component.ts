import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FluentFormModule, FluentGridModule, form, headless, row, template } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormModule, FluentGridModule, JsonPipe, ReactiveFormsModule],
  templateUrl: './custom-template.component.html'
})
export class CustomTemplateExampleComponent {
  schema = form(() => {
    row().col(12).schemas(() => {
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
