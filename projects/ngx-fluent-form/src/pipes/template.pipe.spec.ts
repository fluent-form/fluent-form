import { TestBed } from '@angular/core/testing';
import { WidgetTemplateRegistry } from '../services';
import { TEMPLATE_DIRECTIVES_CONTAINER } from '../tokens';
import { FluentTemplatePipe } from './template.pipe';

describe('FluentTemplatePipe', () => {
  let pipe: FluentTemplatePipe;

  beforeEach(() => {
    TestBed.overrideProvider(WidgetTemplateRegistry, {
      useValue: new Map()
    });

    TestBed.overrideProvider(TEMPLATE_DIRECTIVES_CONTAINER, {
      useValue: {
        templateDirectives: {
          find(fn: Function) {
            return fn({ name: 'named' }) ? { templateRef: {} } : null;
          }
        }
      }
    });

    pipe = TestBed.runInInjectionContext(() => new FluentTemplatePipe());
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
