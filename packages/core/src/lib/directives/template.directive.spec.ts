import { TemplateRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FluentTemplate } from './template.directive';

describe('FluentTemplateDirective', () => {
  beforeEach(() => {
    TestBed.overrideProvider(TemplateRef, { useValue: {} });
  });

  it('should create an instance', () => {
    const directive = TestBed.runInInjectionContext(() => new FluentTemplate());
    directive.name = 'named';
    expect(directive).toBeTruthy();
  });
});
