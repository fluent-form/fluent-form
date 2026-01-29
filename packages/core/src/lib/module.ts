import { NgModule } from '@angular/core';
import { FluentForm } from './components';
import { FluentNextWidgetWrapperOutlet, FluentTemplate } from './directives';

@NgModule({
  imports: [
    FluentForm,
    FluentTemplate,
    FluentNextWidgetWrapperOutlet
  ],
  exports: [
    FluentForm,
    FluentTemplate,
    FluentNextWidgetWrapperOutlet
  ]
})
export class FluentFormModule { }
