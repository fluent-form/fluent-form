import { NgTemplateOutlet } from '@angular/common';
import { Directive, EnvironmentInjector, Injector, createComponent, inject } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { SafeAny } from '@ngify/types';
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
      providers: [
        {
          provide: ControlContainer,
          useValue: null
        }
      ], parent: injector
    });
    outlet.ngOnChanges({ ngTemplateOutlet: {} as SafeAny });
  }
}
