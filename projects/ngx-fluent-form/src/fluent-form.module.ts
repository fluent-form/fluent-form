import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
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
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { FluentFormComponent, OutletComponent } from './components';
import { FluentBinderDirective, FluentControlOutletDirective, FluentFormDirective, FluentFormNameDirective } from './directives';
import { CallPipe, ControlPipe, SchemaPipe, TypeofPipe } from './pipes';

@NgModule({
  declarations: [
    FluentFormComponent,
    OutletComponent,
    FluentFormDirective,
    FluentFormNameDirective,
    FluentControlOutletDirective,
    FluentBinderDirective,
    TypeofPipe,
    CallPipe,
    ControlPipe,
    SchemaPipe
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
    NzOutletModule,
    NzStepsModule,
    NzTabsModule,
    NzAutocompleteModule,
    NzTreeSelectModule
  ],
  exports: [
    FluentFormComponent,
    FluentFormDirective,
    FluentFormNameDirective,
    FluentControlOutletDirective,
  ]
})
export class FluentFormModule { }
