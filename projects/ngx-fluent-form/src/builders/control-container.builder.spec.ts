import { FormGroupSchema } from '../schemas';
import { standardSchema } from '../utils';
import { array, form, group } from './control-container.builder';

describe('control-container.builder', () => {
  it('form', () => {
    const schema = form(it => it.updateOn('blur').schemas());
    const value: FormGroupSchema = { kind: 'group', updateOn: 'blur', schemas: [] };
    expect(schema).toEqual(value);
  });

  it('group', () => {
    const schema = standardSchema(group('group').schemas());
    expect(schema).toEqual({ kind: 'group', key: 'group', schemas: [] });
  });

  it('array', () => {
    const schema = standardSchema(array('array').schemas());
    expect(schema).toEqual({ kind: 'array', key: 'array', schemas: [] });
  });
});
