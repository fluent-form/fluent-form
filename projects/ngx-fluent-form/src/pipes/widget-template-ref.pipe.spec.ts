import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withAllWidgets } from '../features';
import { provideFluentForm } from '../provider';
import { FluentWidgetTemplateRefPipe } from './widget-template-ref.pipe';

describe('FluentWidgetTemplateRefPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withAllWidgets()
        )
      ]
    });
  });

  it('create an instance', () => {
    const environmentInjector = TestBed.inject(EnvironmentInjector);
    const pipe = environmentInjector.runInContext(() => new FluentWidgetTemplateRefPipe());
    expect(pipe).toBeTruthy();
  });
});
