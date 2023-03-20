import { createComponent, Directive, EnvironmentInjector, Host, Injector, Input, OnChanges, OnDestroy, OnInit, SkipSelf, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AnyArray, AnyObject } from '@ngify/types';
import { FluentWidgetTemplateContext } from '../components';
import { FluentWidgetOutletComponent } from '../components/widget-outlet/widget-outlet.component';
import { AnyComponentSchema, AnyControlSchema } from '../schemas';
import { StandardSchema } from '../schemas/types';
import { ControlContainer } from './models/control-container';

@Directive({
  // eslint-disable-next-line
  selector: 'fluent-outlet',
  exportAs: 'fluentOutlet',
  standalone: true,
  host: {
    '[style.display]': `'none'`
  }
})
export class FluentOutletDirective<T extends AnyObject | AnyArray> implements OnInit, OnChanges, OnDestroy, FluentWidgetTemplateContext<T> {
  @Input() name!: string | number;
  /** @internal */
  schema!: StandardSchema<AnyComponentSchema | AnyControlSchema>;
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
    const { instance } = createComponent(FluentWidgetOutletComponent, { environmentInjector });
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
