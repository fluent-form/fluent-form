import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideFluentForm } from '../provider';
import { withTesting } from '../testing';
import { TEMPLATE_DIRECTIVES } from '../tokens';
import { FluentWidgetTemplatePipe } from './widget-template.pipe';

describe('FluentWidgetTemplatePipe', () => {
  let pipe: FluentWidgetTemplatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withTesting()
        ),
        {
          provide: TEMPLATE_DIRECTIVES,
          useValue: signal({  // mock QueryList
            find(fn: Function) {
              const dir = { name: 'named', templateRef: {} }; // mock FluentTemplateDirective
              return fn(dir) ? dir : null;
            }
          })
        }
      ]
    });

    pipe = TestBed.runInInjectionContext(() => new FluentWidgetTemplatePipe());
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be not found template (with template schema)', () => {
    expect(() => pipe.transform({ kind: 'template', key: 'unnamed' }))
      .toThrow(`The custom 'unnamed' template was not found`);
  });

  it('should be not found template (with headful schema)', () => {
    expect(() => pipe.transform({ kind: 'headful', key: 'headful', template: 'unnamed' }))
      .toThrow(`The custom 'unnamed' template was not found`);
  });

  it('should be find template (with template schema)', () => {
    const value = pipe.transform({ kind: 'template', key: 'named' });
    expect(value).toBeTruthy();
  });

  it('should be find template (with headful schema)', () => {
    const value = pipe.transform({ kind: 'headful', key: 'headful', template: 'named' });
    expect(value).toBeTruthy();
  });
});
