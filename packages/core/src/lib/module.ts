import { NgModule } from '@angular/core';
import { FluentForm } from './components';
import { FluentTemplate } from './directives';

@NgModule({
  imports: [
    FluentForm,
    FluentTemplate,
  ],
  exports: [
    FluentForm,
    FluentTemplate,
  ]
})
export class FluentFormModule { }
