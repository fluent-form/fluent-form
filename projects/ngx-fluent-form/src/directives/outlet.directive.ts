import { ComponentFactoryResolver, Directive, Host, Injector, Input, OnChanges, OnDestroy, OnInit, SkipSelf, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FluentControlOutletComponent, FluentControlTemplateContext } from '../components';
import { ComponentSchema, ControlSchema } from '../schemas';
import { AnyArray, AnyObject } from '../types';
import { ControlContainer } from './models/control-container';

@Directive({
  // eslint-disable-next-line
  selector: 'fluent-outlet',
  exportAs: 'fluentOutlet',
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
  classful: boolean = true;
  /** @internal */
  get model(): T {
    return this.controlContainer.directive.immutableModel as T;
  }

  constructor(
    injector: Injector,
    viewContainerRef: ViewContainerRef,
    componentFactoryResolver: ComponentFactoryResolver,
    @Host() @SkipSelf()
    private controlContainer: ControlContainer<T>,
  ) {
    // TODO v14.1 后使用 createComponent() 替代 ComponentFactoryResolver
    const { instance } = componentFactoryResolver.resolveComponentFactory(FluentControlOutletComponent).create(injector);
    viewContainerRef.createEmbeddedView(instance.controlTemplateRef, this);
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
