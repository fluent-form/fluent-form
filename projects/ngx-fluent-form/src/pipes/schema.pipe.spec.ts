import { AnyControlSchema } from '../schemas';
import { FluentSchemaPipe } from './schema.pipe';

describe('FluentSchemaPipe', () => {
  let pipe: FluentSchemaPipe;

  beforeEach(() => {
    pipe = new FluentSchemaPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be can find schema by key', () => {
    const schemas: AnyControlSchema[] = [{ kind: 'input', key: 'text' }];
    const schema = pipe.transform('text', schemas, 'control');
    expect(schema).toBe(schemas[0]);
  });
});
