import { headless } from './control';
import { form, group } from './control-container';

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
        headless('input');
      });
      expect(schema).toEqual({
        kind: 'group',
        key: 'root',
        schemas: [
          { kind: 'headless', key: 'input' }
        ]
      });
    });
  });
});
