import { Component, inject } from '@angular/core';
import { button, buttonGroup, form, FormArraySchema, FormGroupSchema, group, input, SchemaUtil } from 'ngx-fluent-form';
import { AbstractFluentFormWrapperComponent, defineMeta, defineStory } from 'stories/storybook';
import dedent from 'ts-dedent';

@Component({
  selector: 'fluent-form-wrapper',
  template: `
    <div nz-row nzGutter="20">
      <fluent-form
        nz-col
        nzFlex="2"
        [(model)]="model"
        [schema]="schema"
        [layout]="layout"
        [colon]="colon"
        [gutter]="gutter"></fluent-form>
      <div nz-col nzFlex="1">
        <pre>{{ model | json }}</pre>
      </div>
    </div>
  `,
  styles: [`
    pre { padding: 5px; background: #f5f5f5; border: 1px solid #e0e0e0 }
  `]
})
class FluentFormWrapperComponent extends AbstractFluentFormWrapperComponent {
  private readonly schemaUtil = inject(SchemaUtil);

  constructor() {
    super();

    this.schema = form(() => {
      group('users').col(24).schemas(() => {
        input('user1').label('用户').col(12);
      });
      buttonGroup().schemas(() => {
        button().type('primary').content('添加控件').listeners({
          click: () => this.add()
        });
        button().content('移除控件').listeners({
          click: () => this.remove()
        });
      });
    });

    this.model = {};
  }

  add() {
    const group = this.schemaUtil.find(this.schema, 'users') as FormGroupSchema;
    group.schemas.push(
      input(`user${group.schemas.length + 1}`).label('用户').col(12).build()
    );
    this.schema = { ...this.schema };
  }

  remove() {
    const array = this.schemaUtil.find(this.schema, 'users') as FormArraySchema;
    array.schemas.pop();
    this.schema = { ...this.schema };
  }
}

export const meta = defineMeta({
  component: FluentFormWrapperComponent
});

export const story = defineStory();

export const source = dedent`
  import { Component, inject } from '@angular/core';
  import { array, button, buttonGroup, form, FormArraySchema, input, SchemaUtil } from 'ngx-fluent-form';

  @Component({
    selector: 'example-component',
    template: \`
      <fluent-form [(model)]="model" [schema]="schema"></fluent-form>
    \`
  })
  export class ExampleComponent {
    schema = form(() => {
      group('users').col(24).schemas(() => {
        input('user1').label('用户').col(12);
      });
      buttonGroup().schemas(() => {
        button().type('primary').content('添加控件').listeners({
          click: () => this.add()
        });
        button().content('移除控件').listeners({
          click: () => this.remove()
        });
      });
    });

    model = {};

    add() {
      const group = this.schemaUtil.find(this.schema, 'users') as FormGroupSchema;
      group.schemas.push(
        input(\`user\${group.schemas.length + 1}\`).label('用户').col(12).build()
      );
      this.schema = { ...this.schema };
    }

    remove() {
      const array = this.schemaUtil.find(this.schema, 'users') as FormArraySchema;
      array.schemas.pop();
      this.schema = { ...this.schema };
    }
  }
`;
