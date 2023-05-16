import { ModuleWithProviders, NgModule } from '@angular/core';
import { FluentFormComponent } from './components';
import { FluentFormDirective, FluentFormNameDirective, FluentOutletDirective, FluentTemplateDirective } from './directives';
import { FluentFormFeature, FluentFormFeatureKind } from './features';
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
  ]
})
export class FluentFormModule {
  static forRoot(...features: FluentFormFeature<FluentFormFeatureKind>[]): ModuleWithProviders<FluentFormModule> {
    return {
      ngModule: FluentFormModule,
      providers: [
        provideFluentForm(...features)
      ]
    };
  }
}
