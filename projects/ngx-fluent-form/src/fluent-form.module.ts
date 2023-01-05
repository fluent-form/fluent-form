import { NgModule } from '@angular/core';
import { FluentFormComponent } from './components';
import { FluentFormDirective, FluentFormNameDirective } from './directives';
import { FluentOutletDirective } from './directives/outlet.directive';
import { provideFluentForm } from './provide';

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
    provideFluentForm()
  ]
})
export class FluentFormModule { }
