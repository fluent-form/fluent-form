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
import { FluentFormComponent, FluentFormRowComponent, FluentTemplateComponent } from './components';
import { ControlOutletDirective } from './directives/control-outlet.directive';
import { EventBinderDirective } from './directives/event-binder.directive';
import { PropertyBinderDirective } from './directives/property-binder.directive';
import { HiddenPipe } from './pipes/hidden.pipe';
import { TypeofPipe } from './pipes/typeof.pipe';

@NgModule({
  declarations: [
    FluentFormComponent,
    FluentFormRowComponent,
    FluentTemplateComponent,
    EventBinderDirective,
    PropertyBinderDirective,
    ControlOutletDirective,
    TypeofPipe,
    HiddenPipe,
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
    FluentFormRowComponent
  ]
})
export class FluentFormModule { }
