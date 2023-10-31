import { NgTemplateOutlet } from '@angular/common';
import { Directive, inject, ViewContainerRef } from '@angular/core';

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
    const { parentInjector } = inject(ViewContainerRef);
    outlet.ngTemplateOutletInjector = parentInjector;
  }

}
