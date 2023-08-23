import { form, input } from 'ngx-fluent-form';
import { defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

export const story = defineStory({
  args: {
    schema: form(() => {
      input('username').label('Username');
      input('password').label('Password').type('password');
    }, { updateOn: 'blur' }),
    model: {}
  }
});

export const source = dedent`
  import { Component } from '@angular/core';
  import { Validators } from '@angular/forms';
  import { form, input } from 'ngx-fluent-form';

  @Component({
    selector: 'example-component',
    template: \`<fluent-form [(model)]="model" [schema]="schema"></fluent-form>\`
  })
  export class ExampleComponent {
    schema = form(() => {
      input('username').label('Username');
      input('password').label('Password').type('password');
    }, { updateOn: 'blur' });

    model = {};
  }
`;
