import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FluentFormComponent, form } from '@fluent-form/core';
import { inputGroup, text } from '@fluent-form/ui-zorro';

@Component({
  selector: 'control-validation-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class ControlValidationExampleComponent {
  schema = form(() => {
    text('username')
      .label('Username')
      .required(true)
      .length({ min: 3, max: 10 })
      .feedback(true)
      .tips({
        auto: {
          default: {
            minlength: 'Username is too short!',
            maxlength: 'Username is too long!',
            required: 'Please enter your username!'
          }
        }
      })
      .col(6);

    text('email')
      .label('Email')
      .type('email')
      .required(true)
      .feedback(true)
      .tips({ success: 'Verification passed!', error: 'Verification failed' })
      .col(6);

    text('password')
      .label('Password')
      .type('password')
      .required(true)
      .col(6)
      .feedback(true)
      .validators([Validators.pattern(/[A-Z]{3}/)])
      .tips({ error: 'Please enter three capital letters!' });

    inputGroup()
      .label('InputGroup')
      .primary('lastName')
      .col(6)
      .schemas(() => {
        text('firstName').col(4);
        text('lastName')
          .required(true)
          .tips({ error: 'Please enter your lastName!' })
          .col(8);
      });
  });

  model = {};
}
