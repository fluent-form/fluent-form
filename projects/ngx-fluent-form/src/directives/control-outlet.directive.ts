import { Directive, Input, OnChanges, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FluentTemplateComponent } from '../components/fluent-template/fluent-template.component';
import { ComponentSchema, ControlSchema } from '../schemas';

@Directive({
  selector: '[fluentControlOutlet]'
})
export class ControlOutletDirective implements OnChanges {
  @Input('fluentControlOutlet') control!: AbstractControl;
  @Input('fluentControlOutletSchema') schema!: ControlSchema | ComponentSchema;

  private readonly componentTemplate: FluentTemplateComponent['componentTemplate'];

  constructor(private viewContainerRef: ViewContainerRef) {
    const { instance } = viewContainerRef.createComponent(FluentTemplateComponent);
    this.componentTemplate = instance.componentTemplate;
  }

  ngOnChanges() {
    this.viewContainerRef.clear();
    this.viewContainerRef.createEmbeddedView(this.componentTemplate, {
      control: this.control,
      schema: this.schema
    });
  }
}
