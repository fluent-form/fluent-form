import { NgTemplateOutlet } from '@angular/common';
import { Directive, Injector, effect, inject, input, untracked } from '@angular/core';
import type { SafeAny } from '@ngify/core';
import type { WidgetWrapperContext } from '../components';
import type { AbstractSchema, SchemaContext } from '../schemas';
import { WidgetWrapperTemplateRegistry } from '../services';
import { FLUENT_WIDGET_WRAPPERS } from '../tokens';
import { FluentNextWidgetWrapper } from './next-widget-wrapper-outlet.directive';

@Directive({
  selector: '[fluentWidgetWrapperOutlet]',
  hostDirectives: [NgTemplateOutlet]
})
export class FluentWidgetWrapperOutlet<C extends SchemaContext> {
  readonly fluentWidgetWrapperOutlet = input.required<C>();

  constructor() {
    const outlet = inject(NgTemplateOutlet);
    const injector = inject(Injector);
    const wrappers = inject(FLUENT_WIDGET_WRAPPERS, { optional: true }) ?? [];
    const wrapperMap = inject(WidgetWrapperTemplateRegistry);

    function finalWrappersOf(schema: AbstractSchema) {
      const finalWrappers = schema.wrappers || wrappers;
      return finalWrappers.length ? finalWrappers : [FluentNextWidgetWrapper];
    }

    // Initialize wrapper components and cache their templateRefs
    const effectRef = effect(() => {
      const context = this.fluentWidgetWrapperOutlet();

      untracked(() => {
        const finalWrappers = finalWrappersOf(context.schema);

        outlet.ngTemplateOutlet = wrapperMap.get(finalWrappers[0])!;
        outlet.ngTemplateOutletInjector = Injector.create({
          providers: [],
          parent: injector
        });
        outlet.ngOnChanges({ ngTemplateOutlet: {} as SafeAny });

        effectRef.destroy();
      });
    });

    // Update the outlet context when context change
    effect(() => {
      const baseContext = this.fluentWidgetWrapperOutlet();

      untracked(() => {
        const finalWrappers = finalWrappersOf(baseContext.schema);
        // Build the chained context
        const context = finalWrappers.reduceRight<WidgetWrapperContext>(
          (nextContext, wrapper) => {
            return {
              ...baseContext,
              templateRef: wrapperMap.get(wrapper)!,
              next: nextContext
            };
          },
          undefined!
        );

        outlet.ngTemplateOutletContext = context;
      });
    });
  }
}
