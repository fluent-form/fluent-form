import { Directive, Inject, Input, OnInit, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ComponentTemplateRef } from '../components/fluent-template/fluent-template.component';
import { COMPONENT_TEMPLATE_REF_TOKEN } from '../providers';
import { ComponentSchema, ControlSchema } from '../schemas';
import { Arr, Obj } from '../type';

@Directive({
  selector: '[fluentControlOutlet]'
})
export class ControlOutletDirective<T extends Obj | Arr> implements OnInit {
  /** 当前控件 */
  @Input('fluentControlOutlet') control!: AbstractControl;
  /** 当前图示 */
  @Input('fluentControlOutletSchema') schema!: ControlSchema | ComponentSchema;
  /** 当前模型 */
  @Input('fluentControlOutletModel') model!: T;

  constructor(
    @Inject(COMPONENT_TEMPLATE_REF_TOKEN)
    private componentTemplate: ComponentTemplateRef<T>,
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.componentTemplate, this);
  }

}
