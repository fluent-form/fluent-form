import { NgTemplateOutlet } from '@angular/common';
import { Directive, Injector } from '@angular/core';

@Directive({
  // eslint-disable-next-line
  selector: '[ngTemplateOutlet][ngTemplateOutletWithInjector]',
  standalone: true
})
export class FluentTemplateOutletWithInjectorDirective {

  constructor(outlet: NgTemplateOutlet, injector: Injector) {
    outlet.ngTemplateOutletInjector = injector;
  }

}
