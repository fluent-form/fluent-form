import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { withAllWidgets } from '../features';
import { provideFluentForm } from '../provider';
import { FluentTemplatePipe } from './template.pipe';

describe('FluentTemplatePipe', () => {
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
    // TODO: use TestBed.runInInjectionContext in ng v15
    const environmentInjector = TestBed.inject(EnvironmentInjector);
    const pipe = environmentInjector.runInContext(() => new FluentTemplatePipe());

    expect(pipe).toBeTruthy();
  });
});
