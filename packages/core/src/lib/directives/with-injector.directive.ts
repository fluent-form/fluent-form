import { NgTemplateOutlet } from '@angular/common';
import { Directive, inject, Injector, ViewContainerRef } from '@angular/core';

/**
 * @internal
 */
@Directive({
  selector: '[ngTemplateOutlet][fluentWithInjector]',
  standalone: true
})
export class FluentWithInjectorDirective {

  constructor() {
    const outlet = inject(NgTemplateOutlet);
    const { injector } = inject(ViewContainerRef);
    outlet.ngTemplateOutletInjector = Injector.create({
      providers: [],
      parent: injector
    });
  }

}
