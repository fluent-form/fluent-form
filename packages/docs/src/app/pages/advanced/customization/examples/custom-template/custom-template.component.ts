import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FluentFormModule, form, headless, row } from '@fluent-form/core';
import { headful, template } from '@fluent-form/ui-zorro';

@Component({
  selector: 'custom-template-example',
  standalone: true,
  imports: [FluentFormModule, JsonPipe, ReactiveFormsModule],
  templateUrl: './custom-template.component.html'
})
export class CustomTemplateExampleComponent {
  schema = form(() => {
    row().col(12).schemas(() => {
      headless('headless');
      headful('headful').template('controlTpl');
    });
    row().schemas(() => {
      template('namedTpl1');
      template('namedTpl2');
      template('namedTpl3');
    });
  });

  model = {};
}
