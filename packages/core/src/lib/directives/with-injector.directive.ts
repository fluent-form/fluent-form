import { NgTemplateOutlet } from '@angular/common';
import { Directive, inject, Injector } from '@angular/core';

/**
 * @internal
 */
@Directive({
  selector: '[ngTemplateOutlet][fluentWithInjector]'
})
export class FluentWithInjectorDirective {
  constructor() {
    const outlet = inject(NgTemplateOutlet);
    outlet.ngTemplateOutletInjector = Injector.create({
      providers: [],
      parent: inject(Injector)
    });
  }
}
