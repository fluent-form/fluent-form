import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FluentFormComponent, form } from '@fluent-form/core';
import { button, datePicker, group, step, steps, textArea, textField, toggle } from '@fluent-form/ui-zorro';

@Component({
  selector: 'step-by-step-form-example',
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class StepByStepFormExampleComponent {
  readonly schema = form(() => {
    steps().col(12).active(0).schemas(() => {
      step().title('Step 1').schemas(() => {
        textField('text-1').label('Please enter');
        textField('text-2').label('Please enter');
      });

      step().title('Step 2').schemas(() => {
        datePicker('date').label('Please enter');
        toggle('switch').label('Switch');
      });

      step().title('Step 3').schemas(() => {
        group('step3').schemas(() => {
          textArea('textarea').label('Please fill in');
        });

        button().type('primary').content('Submit').variants({ block: true }).col(12);
      });
    });
  });

  readonly model = signal({});
}
