import { NgTemplateOutlet } from '@angular/common';
import { Directive, Injector, effect, inject, input, untracked } from '@angular/core';
import type { SafeAny } from '@ngify/core';
import type { WidgetWrapperContext } from '../components';
import type { SchemaContext } from '../schemas';
import { WidgetWrapperTemplateRegistry } from '../services';
import { FLUENT_WIDGET_WRAPPER } from '../tokens';

@Directive({
  selector: '[fluentWidgetWrapperOutlet]',
  hostDirectives: [NgTemplateOutlet]
})
export class FluentWidgetWrapperOutlet<C extends SchemaContext> {
  readonly fluentWidgetWrapperOutlet = input.required<C>();

  constructor() {
    const outlet = inject(NgTemplateOutlet);
    const injector = inject(Injector);
    const wrappers = inject(FLUENT_WIDGET_WRAPPER, { optional: true }) ?? [];
    const wrapperMap = inject(WidgetWrapperTemplateRegistry);

    // Initialize wrapper components and cache their templateRefs
    const effectRef = effect(() => {
      const context = this.fluentWidgetWrapperOutlet();

      untracked(() => {
        const finalWrappers = context.schema.wrappers || wrappers;

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
        const finalWrappers = baseContext.schema.wrappers || wrappers;
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
