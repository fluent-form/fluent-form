import { Injector, ProviderToken, TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SafeAny } from '@ngify/types';
import { FluentInjectDirective } from './inject.directive';

describe('FluentInjectDirective', () => {
  let directive: FluentInjectDirective<ProviderToken<SafeAny>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TemplateRef,
          useValue: {}
        },
        {
          provide: ViewContainerRef,
          useValue: {
            // eslint-disable-next-line
            createEmbeddedView() { }
          }
        }
      ]
    });

    directive = TestBed.runInInjectionContext(() => new FluentInjectDirective());
  });

  it('should create an instance', () => {
    FluentInjectDirective.ngTemplateContextGuard(directive, {});
    expect(directive).toBeTruthy();
  });

  it('fluentInjectHost', () => {
    directive.fluentInject = Injector;
    directive.fluentInjectHost = true;
    directive.ngOnChanges();

    expect(directive).toBeTruthy();
  });

  it('fluentInjectSelf', () => {
    directive.fluentInject = Injector;
    directive.fluentInjectSelf = true;
    directive.ngOnChanges();

    expect(directive).toBeTruthy();
  });

  it('fluentInjectSkipSelf', () => {
    directive.fluentInject = Injector;
    directive.fluentInjectSkipSelf = true;
    directive.ngOnChanges();

    expect(directive).toBeTruthy();
  });

  it('fluentInjectOptional', () => {
    directive.fluentInject = Injector;
    directive.fluentInjectOptional = true;
    directive.ngOnChanges();

    expect(directive).toBeTruthy();
  });
});
