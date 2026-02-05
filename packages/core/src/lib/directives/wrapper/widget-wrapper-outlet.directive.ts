import { NgTemplateOutlet } from '@angular/common';
import { Directive, Injector, TemplateRef, Type, computed, effect, inject, input, untracked } from '@angular/core';
import type { SafeAny } from '@ngify/core';
import type { WidgetWrapperContext } from '../../components';
import { throwCustomTemplateNotFoundError } from '../../errors';
import type { AbstractSchema, SchemaContext } from '../../schemas';
import { WidgetWrapperTemplateRegistry } from '../../services';
import { FLUENT_WIDGET_WRAPPERS, NAMED_TEMPLATES } from '../../tokens';
import type { TemplateRefHolder } from '../template-ref-holder.directive';
import { FluentNextWidgetWrapper } from './next-widget-wrapper-outlet.directive';

@Directive({
  selector: '[fluentWidgetWrapperOutlet]',
  hostDirectives: [NgTemplateOutlet]
})
export class FluentWidgetWrapperOutlet<C extends SchemaContext> {
  readonly context = input.required<C>({ alias: 'fluentWidgetWrapperOutlet' });

  readonly schema = computed(() => this.context().schema);

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
      const finalWrappers = schema.wrappers?.flat() || wrappers;
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
    effect(() => {
      const schema = this.schema();

      untracked(() => {
        const finalWrappers = finalWrappersOf(schema);

        outlet.ngTemplateOutlet = resolveWrapperTemplate(finalWrappers[0]);
        outlet.ngTemplateOutletInjector = Injector.create({
          providers: [],
          parent: injector
        });
        outlet.ngOnChanges({ ngTemplateOutlet: {} as SafeAny });
      });
    });

    // Update the outlet context when context change
    effect(() => {
      const baseContext = this.context();

      untracked(() => {
        const finalWrappers = finalWrappersOf(baseContext.schema);
        // Build the chained context
        const context = finalWrappers.reduceRight<WidgetWrapperContext | undefined>(
          (nextContext, wrapper) => {
            return {
              ...baseContext,
              templateRef: resolveWrapperTemplate(wrapper)!,
              next: nextContext
            };
          },
          undefined
        );

        outlet.ngTemplateOutletContext = context;
      });
    });
  }
}
