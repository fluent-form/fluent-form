import { Directive, inject, Input, OnChanges, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AnyArray, AnyObject } from '@ngify/types';
import { AnyComponentSchema, AnyControlSchema, SchemaKey } from '../../schemas';
import { WidgetTemplateRegistry } from '../../services';
import { WidgetTemplateContext } from '../../widgets';
import { FluentControlContainer } from './models/control-container';

@Directive({
  // eslint-disable-next-line
  selector: 'fluent-outlet',
  exportAs: 'fluentOutlet',
  standalone: true
})
export class FluentOutletDirective<T extends AnyObject | AnyArray> implements OnInit, OnChanges, OnDestroy, WidgetTemplateContext<AnyComponentSchema | AnyControlSchema, AbstractControl> {
  private readonly registry = inject(WidgetTemplateRegistry);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly controlContainer: FluentControlContainer<T> = inject(FluentControlContainer<T>, { host: true, skipSelf: true });
  private _schema!: AnyComponentSchema | AnyControlSchema;

  /** @internal */
  set schema(value: AnyComponentSchema | AnyControlSchema) {
    this._schema = value;
    this.viewContainerRef.length && this.viewContainerRef.clear();
    this.viewContainerRef.createEmbeddedView(this.registry.get(value.kind), this);
  }
  /** @internal */
  get schema() {
    return this._schema;
  }
  /** @internal */
  control!: AbstractControl;
  /** @internal */
  get model() {
    return this.controlContainer.directive.model;
  }

  @Input() key!: SchemaKey;

  ngOnInit() {
    this.controlContainer.directive.addOutlet(this);
  }

  ngOnChanges() {
    this.controlContainer.directive.updateOutlet(this);
  }

  ngOnDestroy() {
    this.controlContainer.directive.removeOutlet(this);
  }
}
