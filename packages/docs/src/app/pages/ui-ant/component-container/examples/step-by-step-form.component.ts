import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { button, date, group, input, step, steps, textarea, toggle } from '@fluent-form/ui-zorro';

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
        input('text-1').label('文本输入框');
        input('text-2').label('文本输入框');
      });

      step().title('第二步').schemas(() => {
        date('date').label('文本输入框');
        toggle('switch').label('开关');
      });

      step().title('第三步').schemas(() => {
        group('step3').schemas(() => {
          textarea('textarea').label('文本域');
        });

        button().type('primary').content('提交').variants({ block: true }).col(12);
      });
    });
  });

  model = {};
}
