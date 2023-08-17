import { standardSchema } from '../utils';
import { inputGroup } from './control-wrapper.builder';
import { input } from './control.builder';

describe('control-wrapper.builder', () => {
  it('inputGroup', () => {
    const schema1 = standardSchema(inputGroup().schemas(input()));
    const schema2 = standardSchema(inputGroup().schemas());
    expect(schema1).toEqual({ kind: 'input-group', schemas: [{ kind: 'input' }] });
    expect(schema2).toEqual({ kind: 'input-group', schemas: [] });
  });
});
