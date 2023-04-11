import { EnvironmentInjector, Injector, TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FluentInjectDirective } from './inject.directive';

describe('FluentInjectDirective', () => {
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
  });

  it('should create an instance', () => {
    const environmentInjector = TestBed.inject(EnvironmentInjector);
    const directive = environmentInjector.runInContext(() => new FluentInjectDirective());
    FluentInjectDirective.ngTemplateContextGuard(directive, {});

    expect(directive).toBeTruthy();
  });

  it('fluentInjectHost', () => {
    const environmentInjector = TestBed.inject(EnvironmentInjector);
    const directive = environmentInjector.runInContext(() => new FluentInjectDirective());
    directive.fluentInject = Injector;
    directive.fluentInjectHost = true;
    directive.ngOnChanges();

    expect(directive).toBeTruthy();
  });

  it('fluentInjectSelf', () => {
    const environmentInjector = TestBed.inject(EnvironmentInjector);
    const directive = environmentInjector.runInContext(() => new FluentInjectDirective());
    directive.fluentInject = Injector;
    directive.fluentInjectSelf = true;
    directive.ngOnChanges();

    expect(directive).toBeTruthy();
  });

  it('fluentInjectSkipSelf', () => {
    const environmentInjector = TestBed.inject(EnvironmentInjector);
    const directive = environmentInjector.runInContext(() => new FluentInjectDirective());
    directive.fluentInject = Injector;
    directive.fluentInjectSkipSelf = true;
    directive.ngOnChanges();

    expect(directive).toBeTruthy();
  });

  it('fluentInjectOptional', () => {
    const environmentInjector = TestBed.inject(EnvironmentInjector);
    const directive = environmentInjector.runInContext(() => new FluentInjectDirective());
    directive.fluentInject = Injector;
    directive.fluentInjectOptional = true;
    directive.ngOnChanges();

    expect(directive).toBeTruthy();
  });
});
