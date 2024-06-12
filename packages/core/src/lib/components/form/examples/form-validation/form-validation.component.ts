import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FluentFormComponent, FluentGridModule, form, input, inputGroup } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent, FluentGridModule, JsonPipe],
  templateUrl: './form-validation.component.html'
})
export class FormValidationExampleComponent {
  schema = form(() => {
    input('username')
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

    input('email')
      .label('Email')
      .type('email')
      .required(true)
      .feedback(true)
      .tips({ success: 'Verification passed!', error: 'Verification failed' })
      .col(6);

    input('password')
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
        input('firstName').col(4);
        input('lastName')
          .required(true)
          .tips({ error: 'Please enter your lastName!' })
          .col(8);
      });
  });

  model = {};
}
