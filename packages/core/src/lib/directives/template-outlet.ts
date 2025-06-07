import { Directive, effect, EmbeddedViewRef, inject, input, TemplateRef, untracked, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[fluentTemplateOutlet]'
})
export class FluentTemplateOutlet<C = unknown> {
  readonly fluentTemplateOutlet = input.required<TemplateRef<C> | string | undefined | null>();
  readonly fluentTemplateOutletContext = input<C | null>(null);

  constructor() {
    const viewContainerRef = inject(ViewContainerRef);
    const templateRef = inject(TemplateRef);
    let viewRef: EmbeddedViewRef<C> | null = null;

    effect(() => {
      const textOrTemplate = this.fluentTemplateOutlet();
      untracked(() => {
        if (viewRef) {
          viewContainerRef.remove(viewContainerRef.indexOf(viewRef));
        }
        const viewContext = this.createContextProxy();
        if (textOrTemplate instanceof TemplateRef) {
          viewRef = viewContainerRef.createEmbeddedView(textOrTemplate, viewContext);
        } else {
          viewRef = viewContainerRef.createEmbeddedView(templateRef, viewContext);
        }
      });
    });
  }

  /**
   * For a given outlet instance, we create a proxy object that delegates
   * to the user-specified context. This allows changing, or swapping out
   * the context object completely without having to destroy/re-create the view.
   */
  private createContextProxy(): C {
    return new Proxy(
      {},
      {
        set: (_target, prop, newValue) => {
          const context = this.fluentTemplateOutletContext();
          if (!context) {
            return false;
          }
          return Reflect.set(context, prop, newValue);
        },
        get: (_target, prop, receiver) => {
          const context = this.fluentTemplateOutletContext();
          if (!context) {
            return undefined;
          }
          return Reflect.get(context, prop, receiver);
        }
      }
    ) as C;
  }
}
