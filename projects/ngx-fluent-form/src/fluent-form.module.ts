import { NgModule } from '@angular/core';
import { FluentFormComponent } from './components';
import { FluentFormDirective, FluentFormNameDirective } from './directives';
import { FluentOutletDirective } from './directives/outlet.directive';
import { withAllWidgets } from './features';
import { provideFluentForm } from './provider';

@NgModule({
  imports: [
    FluentFormComponent,
    FluentFormDirective,
    FluentFormNameDirective,
    FluentOutletDirective,
  ],
  exports: [
    FluentFormComponent,
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
