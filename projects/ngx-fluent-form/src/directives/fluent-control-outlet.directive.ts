import { Directive, Host, Inject, Input, OnChanges, OnDestroy, OnInit, SkipSelf, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ComponentTemplateRef } from '../components';
import { COMPONENT_TEMPLATE_REF_TOKEN } from '../providers';
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

  constructor(
    private viewContainerRef: ViewContainerRef,
    @Inject(COMPONENT_TEMPLATE_REF_TOKEN)
    private componentTemplate: ComponentTemplateRef<T>,
    @Host() @SkipSelf()
    private controlContainer: ControlContainer<T>,
  ) { }

  ngOnInit() {
    this.controlContainer.directive.addDirective(this);
    this.viewContainerRef.createEmbeddedView(this.componentTemplate, this);
  }

  ngOnChanges() {
    this.controlContainer.directive.assignDirective(this);
  }

  ngOnDestroy() {
    this.controlContainer.directive.removeDirective(this);
  }

}
