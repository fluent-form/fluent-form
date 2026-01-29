import { createComponent, EnvironmentInjector, inject, Injectable, TemplateRef, Type } from '@angular/core';
import type { AbstractWidgetWrapper, WidgetWrapperContext } from '../components';

@Injectable({ providedIn: 'root' })
export class WidgetWrapperTemplateRegistry extends Map<Type<AbstractWidgetWrapper>, TemplateRef<WidgetWrapperContext>> {
  private readonly envInjector = inject(EnvironmentInjector);

  override get(type: Type<AbstractWidgetWrapper>): TemplateRef<WidgetWrapperContext> {
    return super.get(type) ?? this.register(type);
  }

  register(type: Type<AbstractWidgetWrapper>) {
    const { templateRef } = createComponent(type, {
      environmentInjector: this.envInjector
    }).instance;

    this.set(type, templateRef);

    return templateRef;
  }
}
