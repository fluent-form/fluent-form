import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FluentFormModule, headless, row } from '@fluent-form/core';
import { form, headful, template } from '@fluent-form/ui-zorro';

@Component({
  selector: 'custom-template-example',
  imports: [FluentFormModule, JsonPipe, ReactiveFormsModule],
  templateUrl: './custom-template.component.html'
})
export class CustomTemplateExampleComponent {
  readonly schema = form(() => {
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

  readonly model = signal({});
}
