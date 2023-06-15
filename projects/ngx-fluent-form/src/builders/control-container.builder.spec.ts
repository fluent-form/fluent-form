import { standardSchema, standardSchemas } from '../utils';
import { array, form, group } from './control-container.builder';
import { input } from './control.builder';

describe('control-container.builder', () => {
  describe('form', () => {
    it('factory', () => {
      const builder = form(it => it.updateOn('blur').schemas());
      expect(standardSchema(builder)).toEqual({ kind: 'group', updateOn: 'blur', schemas: [] });
    });

    it('json', () => {
      const schema = form({ kind: 'input', key: 'input' });
      expect(standardSchemas(schema)).toEqual([{ kind: 'input', key: 'input' }]);
    });

    it('builder', () => {
      const schema = form(input('input'));
      expect(standardSchemas(schema)).toEqual([{ kind: 'input', key: 'input' }]);
    });
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
