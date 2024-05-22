import { NgTemplateOutlet } from '@angular/common';
import { Directive, inject, Injector, ViewContainerRef } from '@angular/core';
import { ControlContainer } from '@angular/forms';

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
      providers: [
        // 顶替掉 ControlContainer，
        // 因为有的组件内部会使用 ngModel，这会触发 NG1350，NGMODEL_IN_FORM_GROUP
        {
          provide: ControlContainer,
          useValue: null
        }
      ], parent: injector
    });
  }

}
