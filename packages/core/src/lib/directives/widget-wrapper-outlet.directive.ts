import { NgTemplateOutlet } from '@angular/common';
import { Directive, Injector, TemplateRef, Type, effect, inject, input, untracked } from '@angular/core';
import type { SafeAny } from '@ngify/core';
import type { WidgetWrapperContext } from '../components';
import { throwCustomTemplateNotFoundError } from '../errors';
import type { AbstractSchema, SchemaContext } from '../schemas';
import { WidgetWrapperTemplateRegistry } from '../services';
import { FLUENT_WIDGET_WRAPPERS, NAMED_TEMPLATES } from '../tokens';
import { FluentNextWidgetWrapper } from './next-widget-wrapper-outlet.directive';
import type { TemplateRefHolder } from './template-ref-holder.directive';

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
    const namedTemplates = inject(NAMED_TEMPLATES, { optional: true });
    const namedTemplateMap = new Map<string, TemplateRef<WidgetWrapperContext>>(
      namedTemplates?.map(o => [o.name, o.templateRef])
    );

    function finalWrappersOf(schema: AbstractSchema) {
      const finalWrappers = schema.wrappers || wrappers;
      return finalWrappers.length ? finalWrappers : [FluentNextWidgetWrapper];
    }

    function resolveWrapperTemplate(wrapper: Type<TemplateRefHolder<WidgetWrapperContext>> | string) {
      if (typeof wrapper === 'string') {
        const tmpl = namedTemplateMap.get(wrapper);

        if (typeof ngDevMode !== 'undefined' && ngDevMode && !tmpl) {
          throwCustomTemplateNotFoundError(wrapper);
        }

        return tmpl;
      }

      return wrapperMap.get(wrapper)!;
    }

    // Initialize wrapper components and cache their templateRefs
    const effectRef = effect(() => {
      const context = this.fluentWidgetWrapperOutlet();

      untracked(() => {
        const finalWrappers = finalWrappersOf(context.schema);

        outlet.ngTemplateOutlet = resolveWrapperTemplate(finalWrappers[0]);
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
              templateRef: resolveWrapperTemplate(wrapper)!,
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
