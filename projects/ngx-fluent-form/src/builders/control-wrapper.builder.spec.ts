import { InputGroupComponentSchema } from '../schemas';
import { standardSchema } from '../utils';
import { inputGroup } from './control-wrapper.builder';

describe('control-wrapper.builder', () => {
  it('inputGroup', () => {
    const schema = standardSchema(inputGroup().schemas());
    const value: InputGroupComponentSchema = { kind: 'input-group', schemas: [] };
    expect(schema).toEqual(value);
  });
});