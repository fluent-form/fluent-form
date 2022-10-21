import { SafeAny } from '@ngify/types';
import { FormGroupSchema } from '../schemas';
import { standardSchema } from '../utils';
import { array, form, group } from './control-container.builder';

describe('control-container.builder', () => {
  it('form', () => {
    const schema = form(it => it.updateOn('blur').schemas());
    const value = { type: 'group', updateOn: 'blur', schemas: [] } as FormGroupSchema;
    expect(schema).toEqual(value);
  });

  it('group', () => {
    const schema = standardSchema(group('group').schemas());
    const value = { type: 'group', name: 'group', schemas: [] } as SafeAny;
    expect(schema).toEqual(value);
  });

  it('array', () => {
    const schema = standardSchema(array('array').schemas());
    const value = { type: 'array', name: 'array', schemas: [] } as SafeAny;
    expect(schema).toEqual(value);
  });
});