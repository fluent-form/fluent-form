import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { FluentFormComponent, FluentTemplateComponent } from './components';
import { ControlOutletDirective, EventBinderDirective, FluentControlOutletDirective, FluentFormDirective, FluentFormNameDirective, PropertyBinderDirective } from './directives';
import { BoolPipe } from './pipes/bool.pipe';
import { TypeofPipe } from './pipes/typeof.pipe';

@NgModule({
  declarations: [
    FluentFormComponent,
    FluentTemplateComponent,
    FluentFormDirective,
    FluentFormNameDirective,
    FluentControlOutletDirective,
    EventBinderDirective,
    PropertyBinderDirective,
    ControlOutletDirective,
    TypeofPipe,
    BoolPipe,
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
    NzRadioModule,
    NzRateModule,
    NzIconModule,
    NzOutletModule
  ],
  exports: [
    FluentFormComponent,
    FluentFormDirective,
    FluentFormNameDirective,
    FluentControlOutletDirective,
  ]
})
export class FluentFormModule { }
