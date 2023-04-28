import { NgModule } from '@angular/core';
import { FluentFormComponent } from './components';
import { FluentFormDirective, FluentFormNameDirective, FluentOutletDirective, FluentTemplateDirective } from './directives';
import { withAllWidgets } from './features';
import { provideFluentForm } from './provider';

@NgModule({
  imports: [
    FluentFormComponent,
    FluentTemplateDirective,
    FluentFormDirective,
    FluentFormNameDirective,
    FluentOutletDirective,
  ],
  exports: [
    FluentFormComponent,
    FluentTemplateDirective,
    FluentFormDirective,
    FluentFormNameDirective,
    FluentOutletDirective,
  ],
  providers: [
    provideFluentForm(
      withAllWidgets()
    )
  ]
})
export class FluentFormModule { }
