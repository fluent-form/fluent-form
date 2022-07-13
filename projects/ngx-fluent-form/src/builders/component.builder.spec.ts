import { SafeAny } from '@ngify/types';
import { ButtonComponentSchema } from '../schemas';
import { standardSchema } from '../utils/schema.utils';
import { button, buttonGroup, inputGroup } from './component.builder';

describe('component.builder', () => {
  it('inputGroup', () => {
    const schema = standardSchema(inputGroup().schemas());
    const value = { type: 'input-group', schemas: [] } as SafeAny;
    expect(schema).toEqual(value);
  });

  it('buttonGroup', () => {
    const schema = standardSchema(buttonGroup().schemas());
    const value = { type: 'button-group', schemas: [] } as SafeAny;
    expect(schema).toEqual(value);
  });

  it('button', () => {
    const schema = standardSchema(button());
    const value = { type: 'button' } as ButtonComponentSchema;
    expect(schema).toEqual(value);
  });
});