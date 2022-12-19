import { NgTemplateOutlet } from '@angular/common';
import { Directive, Injector } from '@angular/core';

@Directive({
  // eslint-disable-next-line
  selector: 'ng-template[withInjector]',
  standalone: true
})
export class FluentTemplateWithInjectorDirective {

  constructor(outlet: NgTemplateOutlet, injector: Injector) {
    outlet.ngTemplateOutletInjector = injector;
  }

}
