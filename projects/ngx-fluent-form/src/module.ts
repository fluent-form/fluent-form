import { ModuleWithProviders, NgModule } from '@angular/core';
import { FluentFormComponent } from './components';
import { FluentTemplateDirective } from './directives';
import { FluentFormFeature, FluentFormFeatureKind } from './features';
import { provideFluentForm } from './provider';

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
