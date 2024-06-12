import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FluentFormComponent, FluentGridModule, form, group, input } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentFormComponent, FluentGridModule, JsonPipe],
  templateUrl: './layout-type.component.html'
})
export class LayoutTypeExampleComponent {
  schema1 = form(
    group().layout('vertical').schemas(() => {
      input('text-1').label('控件标签').col(6);
      input('text-2').label('控件标签').col(6);
      input('text-3').label('控件标签').col(6);
    })
  );
  schema2 = form(
    group().layout('horizontal').schemas(() => {
      input('text-1').label('控件标签').col(6);
      input('text-2').label('控件标签').col(6);
      input('text-3').label('控件标签').col(6);
    })
  );
  schema3 = form(
    group().layout('inline').schemas(() => {
      input('text-1').label('控件标签').col(6);
      input('text-2').label('控件标签').col(6);
      input('text-3').label('控件标签').col(6);
    })
  );

  model1 = {};
  model2 = {};
  model3 = {};
}
