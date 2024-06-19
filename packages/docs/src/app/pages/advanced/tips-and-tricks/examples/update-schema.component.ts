import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractFormGroupSchema, FluentFormComponent, SchemaUtil, form } from '@fluent-form/core';
import { button, buttonGroup, group, text } from '@fluent-form/ui-zorro';

@Component({
  selector: 'update-schema-example',
  standalone: true,
  imports: [FluentFormComponent, JsonPipe],
  template: `
    <fluent-form [schema]="schema" [(model)]="model" />
    <pre>{{ model | json }}</pre>
  `
})
export class UpdateSchemaExampleComponent {
  schemaUtil = inject(SchemaUtil);

  schema = form(() => {
    buttonGroup().schemas(() => {
      button().type('primary').content('添加控件').listeners({
        click: () => this.add()
      });
      button().content('移除控件').listeners({
        click: () => this.remove()
      });
    });
    group('users').col(12).schemas(() => {
      text('user-1').label('用户').col(6);
    });
  });

  model = {};

  add() {
    const group = this.schemaUtil.find(this.schema, 'users') as AbstractFormGroupSchema;
    group.schemas.push(
      text(`user-${group.schemas.length + 1}`).label('用户').col(6).build()
    );
    this.schema = { ...this.schema };
  }

  remove() {
    const group = this.schemaUtil.find(this.schema, 'users') as AbstractFormGroupSchema;
    group.schemas.pop();
    this.schema = { ...this.schema };
  }
}
