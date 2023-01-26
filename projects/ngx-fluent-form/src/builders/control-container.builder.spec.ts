import { standardSchema } from '../utils';
import { array, form, group } from './control-container.builder';

describe('control-container.builder', () => {
  it('form', () => {
    const schema = form(it => it.updateOn('blur').schemas());

    expect(schema).toEqual({ kind: 'group', updateOn: 'blur', schemas: [] });
  });

  it('group', () => {
    const schema = standardSchema(group('group').schemas());

    expect(schema).toEqual({ kind: 'group', name: 'group', schemas: [] });
  });

  it('array', () => {
    const schema = standardSchema(array('array').schemas());

    expect(schema).toEqual({ kind: 'array', name: 'array', schemas: [] });
  });
});