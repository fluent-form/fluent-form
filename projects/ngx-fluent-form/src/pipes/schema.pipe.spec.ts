import { AnySchema, ControlSchema } from '../schemas';
import { FluentSchemaPipe } from './schema.pipe';

describe('FluentSchemaPipe', () => {
  let pipe: FluentSchemaPipe;

  beforeEach(() => {
    pipe = new FluentSchemaPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be can find schema by name', () => {
    const schemas: AnySchema[] = [{ kind: 'input', name: 'text' }];
    const schema = pipe.transform('text', schemas, 'control');
    expect(schema).toBe(schemas[0] as ControlSchema);
  });
});
