import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFluentForm } from '../provide';
import { FluentWidgetTemplateRefPipe } from './widget-template-ref.pipe';

describe('FluentWidgetTemplateRefPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideFluentForm()]
    });
  });

  it('create an instance', () => {
    const environmentInjector = TestBed.inject(EnvironmentInjector);
    const pipe = environmentInjector.runInContext(() => new FluentWidgetTemplateRefPipe());
    expect(pipe).toBeTruthy();
  });
});
