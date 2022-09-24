import { ElementRef } from '@angular/core';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { FluentBinderDirective } from './fluent-binder.directive';

describe('FluentBinderDirective', () => {
  it('should create an instance', () => {
    const directive = new FluentBinderDirective(
      new ElementRef({} as HTMLElement),
      new NzDestroyService()
    );
    expect(directive).toBeTruthy();
  });
});
