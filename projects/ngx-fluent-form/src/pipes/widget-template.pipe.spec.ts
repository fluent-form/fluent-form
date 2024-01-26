import { TestBed } from '@angular/core/testing';
import { withAllWidgets } from '../features';
import { provideFluentForm } from '../provider';
import { TEMPLATE_DIRECTIVES } from '../tokens';
import { FluentWidgetTemplatePipe } from './widget-template.pipe';

describe('FluentWidgetTemplatePipe', () => {
  let pipe: FluentWidgetTemplatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withAllWidgets()
        ),
        {
          provide: TEMPLATE_DIRECTIVES,
          useValue: {  // mock QueryList
            find(fn: Function) {
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
      .toThrowError(`The custom 'unnamed' template was not found`);
  });

  it('should be not found template (with headless schema)', () => {
    expect(() => pipe.transform({ kind: 'headless', key: 'headless', template: 'unnamed' }))
      .toThrowError(`The custom 'unnamed' template was not found`);
  });

  it('should be find template (with template schema)', () => {
    const value = pipe.transform({ kind: 'template', key: 'named' });
    expect(value).toBeTruthy();
  });

  it('should be find template (with headless schema)', () => {
    const value = pipe.transform({ kind: 'headless', key: 'headless', template: 'named' });
    expect(value).toBeTruthy();
  });
});
