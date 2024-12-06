import { Directive, inject, Input, OnChanges, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AnyArray, AnyObject } from '@ngify/types';
import { AbstractSchema, SingleSchemaKey } from '../../schemas';
import { WidgetTemplateRegistry } from '../../services';
import { WidgetTemplateContext } from '../../widgets';
import { FluentControlContainer } from './models/control-container';

@Directive({
  selector: 'fluent-outlet',
  exportAs: 'fluentOutlet',
  standalone: true
})
export class FluentOutletDirective<T extends AnyObject | AnyArray> implements OnInit, OnChanges, OnDestroy, WidgetTemplateContext<AbstractSchema, AbstractControl> {
  private readonly registry = inject(WidgetTemplateRegistry);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly controlContainer: FluentControlContainer<T> = inject(FluentControlContainer<T>, { host: true, skipSelf: true });
  private _schema!: AbstractSchema;

  /** @internal */
  set schema(value: AbstractSchema) {
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

  @Input() key!: SingleSchemaKey;

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
