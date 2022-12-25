import { form, input } from 'ngx-fluent-form';
import { defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

export const story = defineStory({
  args: {
    schemas: form(it => it.updateOn('blur').schemas(
      input('username').label('Username'),
      input('password').label('Password').type('password')
    )),
    model: {}
  }
});

export const source = dedent`
  import { Component } from '@angular/core';
  import { Validators } from '@angular/forms';
  import { form, input } from 'ngx-fluent-form';

  @Component({
    selector: 'example-component',
    template: \`<fluent-form [schemas]="schemas" [(model)]="model"></fluent-form>\`
  })
  export class ExampleComponent {
    schemas = form(it => it.updateOn('blur').schemas(
      input('username').label('Username'),
      input('password').label('Password').type('password')
    ));

    model = {};
  }
`;