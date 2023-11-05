import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { button, buttonGroup, FluentFormComponent, form, FormGroupSchema, group, input, SchemaUtil } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent, NzGridModule, JsonPipe],
  templateUrl: './update-schema.component.html'
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
    group('users').col(24).schemas(() => {
      input('user-1').label('用户').col(12);
    });
  });

  model = {};

  add() {
    const group = this.schemaUtil.find(this.schema, 'users') as FormGroupSchema;
    group.schemas.push(
      input(`user-${group.schemas.length + 1}`).label('用户').col(12).build()
    );
    this.schema = { ...this.schema };
  }

  remove() {
    const group = this.schemaUtil.find(this.schema, 'users') as FormGroupSchema;
    group.schemas.pop();
    this.schema = { ...this.schema };
  }
}
