import { NgModule } from '@angular/core';
import { FluentFormDirective } from './form.directive';
import { FluentOutletDirective } from './outlet.directive';

@NgModule({
  imports: [
    FluentFormDirective,
    FluentOutletDirective,
  ],
  exports: [
    FluentFormDirective,
    FluentOutletDirective,
  ]
})
export class FluentFormRenderModule { }
