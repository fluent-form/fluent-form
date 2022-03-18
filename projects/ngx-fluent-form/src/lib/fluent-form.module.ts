import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { FluentEventBinderDirective } from './directives/fluent-event-binder.directive';
import { FluentPropertyBinderDirective } from './directives/fluent-property-binder.directive';
import { FluentFormComponent } from './fluent-form.component';

@NgModule({
  declarations: [
    FluentFormComponent,
    FluentEventBinderDirective,
    FluentPropertyBinderDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzSpinModule,
    NzButtonModule,
    NzInputModule,
    NzInputNumberModule,
    NzCascaderModule,
    NzDatePickerModule,
    NzFormModule,
    NzCheckboxModule,
    NzSwitchModule,
    NzDividerModule,
    NzSelectModule,
    NzTimePickerModule,
    NzSliderModule,
    NzRadioModule
  ],
  exports: [
    FluentFormComponent
  ]
})
export class FluentFormModule { }
