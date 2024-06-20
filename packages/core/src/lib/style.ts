import { DestroyRef, EnvironmentInjector, Type, createComponent, inject } from '@angular/core';

export function withStyle(component: Type<unknown>): void {
  const environmentInjector = inject(EnvironmentInjector);
  const destroyRef = inject(DestroyRef);
  const componentRef = createComponent(component, { environmentInjector });
  destroyRef.onDestroy(() => componentRef.destroy());
}
