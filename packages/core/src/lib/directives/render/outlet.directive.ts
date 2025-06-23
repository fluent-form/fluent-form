import { computed, Directive, effect, inject, input, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import type { AnyArray, AnyObject } from '@ngify/core';
import type { AbstractSchema, SchemaKey, SingleSchemaKey } from '../../schemas';
import { WidgetTemplateRegistry } from '../../services';
import { SchemaUtil } from '../../utils';
import type { WidgetTemplateContext } from '../../widgets';
import { FluentControlContainer } from './models/control-container';

@Directive({
  selector: 'fluent-outlet,[fluentOutlet]',
  exportAs: 'fluentOutlet'
})
export class FluentOutletDirective<T extends AnyObject | AnyArray> implements WidgetTemplateContext<AbstractSchema, AbstractControl> {
  private readonly schemaUtil = inject(SchemaUtil);
  private readonly registry = inject(WidgetTemplateRegistry);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly controlContainer: FluentControlContainer<T> = inject(FluentControlContainer<T>, { host: true, skipSelf: true });
  private readonly _schema = computed(() => {
    return this.schemaUtil.find(this.controlContainer.patchedSchema(), this.key())!;
  });

  private readonly _control = computed(() => {
    const form = this.controlContainer.form();
    const paths = this.schemaUtil.norimalizePaths(this.key());
    return form.get(paths) ?? form;
  });

  private readonly _model = computed(() => {
    const rootModel = this.controlContainer.model();
    const paths = this.schemaUtil.norimalizePaths(this.key());
    // Delete the last key to get the parent model
    return paths
      .map(path => this.schemaUtil.parsePathKey(path))
      .flat()
      .slice(0, -1)
      .reduce((obj, key) => obj?.[key as keyof T] as T, rootModel);
  });

  get control(): AbstractControl {
    return this._control();
  }

  get schema() {
    return this._schema();
  }

  get model() {
    return this._model();
  }

  readonly key = input.required<SingleSchemaKey | SchemaKey[]>();

  constructor() {
    effect(() => {
      const schema = this.schema;
      this.viewContainerRef.length && this.viewContainerRef.clear();
      this.viewContainerRef.createEmbeddedView(this.registry.get(schema.kind), this);
    });
  }
}
