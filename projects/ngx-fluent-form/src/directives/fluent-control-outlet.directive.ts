import { ComponentRef, Directive, Host, Input, OnChanges, OnDestroy, OnInit, SkipSelf, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FluentOutletComponent } from '../components';
import { ComponentSchema, ControlSchema } from '../schemas';
import { Arr, Obj } from '../types';
import { ControlContainer } from './control-container';

@Directive({
  // eslint-disable-next-line
  selector: 'fluent-control-outlet'
})
export class FluentControlOutletDirective<T extends Obj | Arr> implements OnInit, OnChanges, OnDestroy {
  @Input() name!: string | number;

  schema!: ComponentSchema | ControlSchema;
  control!: AbstractControl;

  get model(): T {
    return this.controlContainer.directive.model as T;
  }

  private readonly componentRef!: ComponentRef<FluentOutletComponent<Obj | Arr>>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    @Host() @SkipSelf()
    private controlContainer: ControlContainer<T>,
  ) {
    this.componentRef = this.viewContainerRef.createComponent(FluentOutletComponent);
  }

  ngOnInit() {
    this.controlContainer.directive.addDirective(this);
  }

  ngOnChanges() {
    this.controlContainer.directive.assignDirective(this);
    this.componentRef.instance.control = this.control;
    this.componentRef.instance.schema = this.schema;
    this.componentRef.instance.model = this.model;
  }

  ngOnDestroy() {
    this.controlContainer.directive.removeDirective(this);
  }

}
