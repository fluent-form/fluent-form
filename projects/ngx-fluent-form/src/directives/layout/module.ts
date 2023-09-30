import { NgModule } from '@angular/core';
import { FluentFormKeyDirective } from './form-key.directive';
import { FluentFormDirective } from './form.directive';
import { FluentOutletDirective } from './outlet.directive';

@NgModule({
  imports: [
    FluentFormDirective,
    FluentFormKeyDirective,
    FluentOutletDirective,
  ],
  exports: [
    FluentFormDirective,
    FluentFormKeyDirective,
    FluentOutletDirective,
  ]
})
export class FluentFormLayoutModule { }
