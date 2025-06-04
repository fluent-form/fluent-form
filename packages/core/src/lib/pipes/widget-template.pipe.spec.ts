import { TestBed } from '@angular/core/testing';
import { SafeAny } from '@ngify/types';
import { provideFluentForm } from '../provider';
import { withTesting } from '../testing';
import { NAMED_TEMPLATES } from '../tokens';
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
          provide: NAMED_TEMPLATES,
          useValue: { // mock array.find
            find(fn: (...args: SafeAny) => SafeAny) {
              const dir = { name: 'named', templateRef: {} }; // mock FluentTemplateDirective
              return fn(dir) ? dir : null;
            }
          }
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

  it('should be not found template (with headed schema)', () => {
    expect(() => pipe.transform({ kind: 'headed', key: 'headed', template: 'unnamed' }))
      .toThrow(`The custom 'unnamed' template was not found`);
  });

  it('should be find template (with template schema)', () => {
    const value = pipe.transform({ kind: 'template', key: 'named' });
    expect(value).toBeTruthy();
  });

  it('should be find template (with headed schema)', () => {
    const value = pipe.transform({ kind: 'headed', key: 'headed', template: 'named' });
    expect(value).toBeTruthy();
  });
});
