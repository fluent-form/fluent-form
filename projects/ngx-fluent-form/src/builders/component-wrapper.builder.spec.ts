import { ButtonGroupComponentSchema } from '../schemas';
import { standardSchema } from '../utils';
import { buttonGroup } from './component-wrapper.builder';

describe('component-wrapper.builder', () => {
  it('buttonGroup', () => {
    const schema = standardSchema(buttonGroup().schemas());
    const value: ButtonGroupComponentSchema = { kind: 'button-group', schemas: [] };
    expect(schema).toEqual(value);
  });
})