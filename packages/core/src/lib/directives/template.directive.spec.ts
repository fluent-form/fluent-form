import { TemplateRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FluentTemplateDirective } from './template.directive';

describe('FluentTemplateDirective', () => {
  beforeEach(() => {
    TestBed.overrideProvider(TemplateRef, { useValue: {} });
  });

  it('should create an instance', () => {
    const directive = TestBed.runInInjectionContext(() => new FluentTemplateDirective());
    directive.name = 'named';
    expect(directive).toBeTruthy();
  });
});
