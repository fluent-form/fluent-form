import { EnvironmentInjector, Type, createComponent, inject } from '@angular/core';

export function withStyle(component: Type<unknown>): void {
  const environmentInjector = inject(EnvironmentInjector);
  createComponent(component, { environmentInjector });
}
