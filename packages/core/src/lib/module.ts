import { NgModule } from '@angular/core';
import { FluentFormComponent } from './components';
import { FluentTemplateDirective } from './directives';

@NgModule({
  imports: [
    FluentFormComponent,
    FluentTemplateDirective,
  ],
  exports: [
    FluentFormComponent,
    FluentTemplateDirective,
  ]
})
export class FluentFormModule { }
