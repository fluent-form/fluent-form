import { NgTemplateOutlet } from '@angular/common';
import { Directive, EnvironmentInjector, Injector, createComponent, inject } from '@angular/core';
import type { SafeAny } from '@ngify/core';
import { FLUENT_FORM_ITEM_CONTENT } from '../tokens';

@Directive({
  selector: '[fluentFormItemOutlet]',
  standalone: true,
  hostDirectives: [
    {
      directive: NgTemplateOutlet,
      inputs: ['ngTemplateOutletContext: fluentFormItemOutlet']
    }
  ]
})
export class FluentFormItemOutletDirective {
  constructor() {
    const outlet = inject(NgTemplateOutlet);
    const injector = inject(Injector);
    const { templateRef } = createComponent(inject(FLUENT_FORM_ITEM_CONTENT), {
      environmentInjector: inject(EnvironmentInjector),
      elementInjector: injector
    }).instance;
    outlet.ngTemplateOutlet = templateRef;
    outlet.ngTemplateOutletInjector = Injector.create({
      providers: [],
      parent: injector
    });
    outlet.ngOnChanges({ ngTemplateOutlet: {} as SafeAny });
  }
}
