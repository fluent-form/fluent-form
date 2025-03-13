import { TestBed } from '@angular/core/testing';
import { form } from '../compose';
import { provideFluentForm } from '../provider';
import { withTesting } from '../testing';
import { FluentSchemaPipe } from './schema.pipe';

describe('FluentSchemaPipe', () => {
  let pipe: FluentSchemaPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withTesting()
        )
      ]
    });

    pipe = TestBed.runInInjectionContext(() => new FluentSchemaPipe());
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be can find schema by key', () => {
    const schema = form([{ kind: 'text-field', key: 'text' }]);
    expect(pipe.transform('text', schema)).toBe(schema.schemas[0]);
  });
});
