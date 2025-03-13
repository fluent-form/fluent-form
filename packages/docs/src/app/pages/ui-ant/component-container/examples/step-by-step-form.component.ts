import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { button, datePicker, group, step, steps, textArea, textField, toggle } from '@fluent-form/ui-zorro';

@Component({
  selector: 'step-by-step-form-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class StepByStepFormExampleComponent {
  schema = form(() => {
    steps().col(12).active(0).schemas(() => {
      step().title('第一步').schemas(() => {
        textField('text-1').label('文本输入框');
        textField('text-2').label('文本输入框');
      });

      step().title('第二步').schemas(() => {
        datePicker('date').label('文本输入框');
        toggle('switch').label('开关');
      });

      step().title('第三步').schemas(() => {
        group('step3').schemas(() => {
          textArea('textarea').label('文本域');
        });

        button().type('primary').content('提交').variants({ block: true }).col(12);
      });
    });
  });

  model = {};
}
