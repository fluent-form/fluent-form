import { button, form, group, input, step, steps, switcher, textarea } from 'ngx-fluent-form';
import { defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

export const story = defineStory({
  args: {
    schemas: form(
      steps().span(24).current(0).schemas(
        step().title('第一步').schemas(
          input('input1InStep1').label('文本输入框').span(12),
          input('input2InStep1').label('文本输入框').span(12),
        ),
        step().title('第二步').schemas(
          input('inputInStep2').label('文本输入框'),
          switcher('switchInStep2').label('开关')
        ),
        step().title('第三步').schemas(
          group('step3').span(24).schemas(
            textarea('textareaInStep3').label('文本域').span(24),
          ),
          button().subtype('submit').style('primary').content('提交').block(true).span(24)
        )
      )
    ),
    model: {}
  }
});

export const source = dedent`
  import { Component } from '@angular/core';
  import { button, form, group, input, step, steps, switcher, textarea } from 'ngx-fluent-form';

  @Component({
    selector: 'example-component',
    template: \`<fluent-form [schemas]="schemas" [(model)]="model"></fluent-form>\`
  })
  export class ExampleComponent {
    schemas: form(
      steps().span(24).current(0).schemas(
        step().title('第一步').schemas(
          input('input1InStep1').label('文本输入框').span(12),
          input('input2InStep1').label('文本输入框').span(12),
        ),
        step().title('第二步').schemas(
          input('inputInStep2').label('文本输入框'),
          switcher('switchInStep2').label('开关')
        ),
        step().title('第三步').schemas(
          group('step3').span(24).schemas(
            textarea('textareaInStep3').label('文本域').span(24),
          ),
          button().subtype('primary').content('提交').block(true).span(24)
        )
      )
    );

    model = { date: '2022/2/22' };
  }
`;