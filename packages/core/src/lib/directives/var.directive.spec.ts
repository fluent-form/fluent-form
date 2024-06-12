import { TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FluentVarDirective } from './var.directive';

describe('FluentVarDirective', () => {
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
    const directive = TestBed.runInInjectionContext(() => new FluentVarDirective());
    directive.fluentVar = true;
    FluentVarDirective.ngTemplateContextGuard(directive, {});
    expect(directive).toBeTruthy();
  });
});
