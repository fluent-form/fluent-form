import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FluentTemplateComponent } from '../components/fluent-template/fluent-template.component';
import { ComponentSchema, ControlSchema } from '../schemas';

@Directive({
  selector: '[fluentControlOutlet]'
})
export class ControlOutletDirective<T extends Record<string, unknown>> implements OnInit {
  @Input('fluentControlOutlet') control!: AbstractControl;
  @Input('fluentControlOutletSchema') schema!: ControlSchema | ComponentSchema;
  @Input('fluentControlOutletModel') model!: T;

  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    const { instance } = this.viewContainerRef.createComponent(FluentTemplateComponent);
    this.viewContainerRef.createEmbeddedView(instance.componentTemplate, this);
  }

}
