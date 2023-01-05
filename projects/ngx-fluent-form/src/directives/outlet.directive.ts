import { createComponent, Directive, EnvironmentInjector, Host, Injector, Input, OnChanges, OnDestroy, OnInit, SkipSelf, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FluentControlOutletComponent, FluentControlTemplateContext } from '../components';
import { ComponentSchema, ControlSchema } from '../schemas';
import { AnyArray, AnyObject } from '../types';
import { ControlContainer } from './models/control-container';

// 为避免与 FluentControlOutletComponent 产生依赖循环，该指令需要单独导出

@Directive({
  // eslint-disable-next-line
  selector: 'fluent-outlet',
  exportAs: 'fluentOutlet',
  standalone: true,
  host: {
    '[style.display]': `'none'`
  }
})
export class FluentOutletDirective<T extends AnyObject | AnyArray> implements OnInit, OnChanges, OnDestroy, FluentControlTemplateContext<T> {
  @Input() name!: string | number;
  /** @internal */
  schema!: ComponentSchema | ControlSchema;
  /** @internal */
  control!: AbstractControl;
  /** @internal */
  get model(): T {
    return this.controlContainer.directive.model as T;
  }

  constructor(
    injector: Injector,
    environmentInjector: EnvironmentInjector,
    viewContainerRef: ViewContainerRef,
    @Host() @SkipSelf()
    private controlContainer: ControlContainer<T>,
  ) {
    const { instance } = createComponent(FluentControlOutletComponent, { environmentInjector });
    viewContainerRef.createEmbeddedView(instance.templateRef, this, { injector });
  }

  ngOnInit() {
    this.controlContainer.directive.addDirective(this);
  }

  ngOnChanges() {
    this.controlContainer.directive.assignDirective(this);
  }

  ngOnDestroy() {
    this.controlContainer.directive.removeDirective(this);
  }

}
