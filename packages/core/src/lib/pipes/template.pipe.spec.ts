import { TestBed } from '@angular/core/testing';
import { SafeAny } from '@ngify/core';
import { NAMED_TEMPLATES } from '../tokens';
import { FluentTemplatePipe } from './template.pipe';

describe('FluentTemplatePipe', () => {
  let pipe: FluentTemplatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
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

    pipe = TestBed.runInInjectionContext(() => new FluentTemplatePipe());
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the original value', () => {
    expect(pipe.transform('text')).toEqual('text');
  });

  it('should be not found template', () => {
    expect(pipe.transform('#x')).toEqual('#x');
  });

  it('should be find template', () => {
    expect(pipe.transform('#named')).toBeTruthy();
  });
});
