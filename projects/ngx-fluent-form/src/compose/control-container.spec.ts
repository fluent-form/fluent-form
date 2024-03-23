import { input } from './control';
import { array, form, group, tabsArray } from './control-container';

describe('control-container', () => {
  describe('form', () => {
    it('factory', () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const scheam = form(group().updateOn('blur').schemas(() => { }));
      expect(scheam).toEqual({ kind: 'group', key: 'root', updateOn: 'blur', schemas: [] });
    });

    it('schemas', () => {
      const { schemas } = form([{ kind: 'input', key: 'input' }]);
      expect(schemas).toEqual([{ kind: 'input', key: 'input' }]);
    });

    it('compose', () => {
      const schema = form(() => {
        input('input');
      });
      expect(schema).toEqual({
        kind: 'group',
        key: 'root',
        schemas: [
          { kind: 'input', key: 'input' }
        ]
      });
    });
  });

  it('group', () => {
    const { schemas } = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      group('group').schemas(() => { });
    });
    expect(schemas).toEqual([{
      kind: 'group',
      key: 'group',
      schemas: []
    }]);
  });

  it('array', () => {
    const { schemas } = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      array('array').schemas(() => { });
    });
    expect(schemas).toEqual([{
      kind: 'array',
      key: 'array',
      schemas: []
    }]);
  });

  it('tabs-array', () => {
    const { schemas } = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      tabsArray('tabs-array').schemas(() => { });
    });
    expect(schemas).toEqual([{
      kind: 'tabs-array',
      key: 'tabs-array',
      schemas: []
    }]);
  });
});
