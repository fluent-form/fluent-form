import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { button, date, FluentFormComponent, form, group, input, step, steps, textarea, toggle } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent, NzGridModule, JsonPipe],
  templateUrl: './step-by-step-form.component.html'
})
export class StepByStepFormExampleComponent {
  schema = form(() => {
    steps().col(24).active(0).schemas(() => {
      step().title('第一步').schemas(() => {
        input('text-1').label('文本输入框').col(12);
        input('text-2').label('文本输入框').col(12);
      });

      step().title('第二步').schemas(() => {
        date('date').label('文本输入框').col(12);
        toggle('switch').label('开关');
      });

      step().title('第三步').schemas(() => {
        group('step3').col(24).schemas(() => {
          textarea('textarea').label('文本域').col(24);
        });

        button().type('primary').content('提交').variants({ block: true }).col(24);
      });
    });
  });

  model = {};
}
