import { TestBed } from '@angular/core/testing';
import { form } from '../compose';
import { withAllWidgets } from '../features';
import { provideFluentForm } from '../provider';
import { FluentSchemaPipe } from './schema.pipe';

describe('FluentSchemaPipe', () => {
  let pipe: FluentSchemaPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withAllWidgets()
        )
      ]
    });

    pipe = TestBed.runInInjectionContext(() => new FluentSchemaPipe());
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be can find schema by key', () => {
    const schema = form([{ kind: 'input', key: 'text' }]);
    expect(pipe.transform('text', schema)).toBe(schema.schemas[0]);
  });
});
