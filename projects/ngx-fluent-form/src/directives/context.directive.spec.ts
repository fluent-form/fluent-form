import { EnvironmentInjector, TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FluentContextDirective } from './context.directive';

describe('FluentContextDirective', () => {
  beforeEach(() => {
    TestBed.overrideProvider(TemplateRef, { useValue: {} });
    TestBed.overrideProvider(ViewContainerRef, {
      useValue: {
        // eslint-disable-next-line
        createEmbeddedView() { }
      }
    });
  });

  it('should create an instance', () => {
    const environmentInjector = TestBed.inject(EnvironmentInjector);
    const directive = environmentInjector.runInContext(() => new FluentContextDirective());
    directive.fluentContext = class { };
    FluentContextDirective.ngTemplateContextGuard(directive, {});
    expect(directive).toBeTruthy();
  });
});
