import { standardSchema } from '../utils';
import { buttonGroup } from './component-wrapper.builder';
import { button } from './component.builder';

describe('component-wrapper.builder', () => {
  it('buttonGroup', () => {
    const schema1 = standardSchema(buttonGroup().schemas());
    const schema2 = standardSchema(buttonGroup().schemas(button()));
    expect(schema1).toEqual({ kind: 'button-group', schemas: [] });
    expect(schema2).toEqual({ kind: 'button-group', schemas: [{ kind: 'button' }] });
  });
});
