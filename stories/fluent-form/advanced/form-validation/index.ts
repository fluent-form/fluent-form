import { Validators } from '@angular/forms';
import { form, input, inputGroup } from 'ngx-fluent-form';
import { defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

export const story = defineStory({
  args: {
    schemas: form(
      input('username')
        .label('Username')
        .required(true)
        .length({ min: 3, max: 10 })
        .span(12)
        .feedback(true)
        .tips({
          auto: {
            default: {
              minlength: 'Username is too short!',
              maxlength: 'Username is too long!',
              required: 'Please enter your username!'
            }
          }
        }),
      input('email')
        .label('Email')
        .subtype('email')
        .required(true)
        .span(12)
        .feedback(true)
        .tips({
          auto: {
            default: {
              required: 'Please enter your Email!',
              email: 'The enter is not valid E-mail!',
            }
          }
        }),
      input('password')
        .label('Password')
        .subtype('password')
        .required(true)
        .span(12)
        .feedback(true)
        .tips({ error: 'Please enter your password!' }),
      inputGroup().label('First & Last name').span(12).primary('lastName').schemas(
        input('firstName').span(8),
        input('lastName')
          .span(16)
          .required(true)
          .validators(Validators.pattern(/[A-Z]{3}/))
          .tips({ error: 'Please enter three capital letters!' }),
      ),
    ),
    model: {}
  }
});

export const source = dedent`
  import { Component } from '@angular/core';
  import { Validators } from '@angular/forms';
  import { form, input, inputGroup } from 'ngx-fluent-form';

  @Component({
    selector: 'example-component',
    template: \`<fluent-form [schemas]="schemas" [(model)]="model"></fluent-form>\`
  })
  export class ExampleComponent {
    schemas = form(
      input('username')
        .label('Username')
        .required(true)
        .length({ min: 3, max: 10 })
        .span(12)
        .feedback(true)
        .tips({
          auto: {
            default: {
              minlength: 'Username is too short!',
              maxlength: 'Username is too long!',
              required: 'Please enter your username!'
            }
          }
        }),
      input('email')
        .label('Email')
        .subtype('email')
        .required(true)
        .span(12)
        .feedback(true)
        .tips({
          auto: {
            default: {
              required: 'Please enter your Email!',
              email: 'The enter is not valid E-mail!',
            }
          }
        }),
      input('password')
        .label('Password')
        .subtype('password')
        .required(true)
        .span(12)
        .feedback(true)
        .tips({ error: 'Please enter your password!' }),
      inputGroup().label('First & Last name').span(12).primary('lastName').schemas(
        input('firstName').span(8),
        input('lastName')
          .span(16)
          .required(true)
          .validators(Validators.pattern(/[A-Z]{3}/))
          .tips({ error: 'Please enter three capital letters!' }),
      ),
    );

    model = {};
  }
`;