import { EnvironmentInjector, TemplateRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FluentTemplateDirective } from './template.directive';

describe('FluentTemplateDirective', () => {
  beforeEach(() => {
    TestBed.overrideProvider(TemplateRef, { useValue: {} });
  });

  it('should create an instance', () => {
    const environmentInjector = TestBed.inject(EnvironmentInjector);
    const directive = environmentInjector.runInContext(() => new FluentTemplateDirective());
    directive.name = 'named';
    expect(directive).toBeTruthy();
  });
});
