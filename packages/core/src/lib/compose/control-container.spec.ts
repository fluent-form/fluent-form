import { group, text } from '../testing';
import { form } from './control-container';

describe('control-container', () => {
  describe('form', () => {
    it('factory', () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const scheam = form(group().updateOn('blur').schemas(() => { }));
      expect(scheam).toEqual({ kind: 'group', key: 'root', updateOn: 'blur', schemas: [] });
    });

    it('schemas', () => {
      const { schemas } = form([{ kind: 'text', key: 'input' }]);
      expect(schemas).toEqual([{ kind: 'text', key: 'input' }]);
    });

    it('compose', () => {
      const schema = form(() => {
        text('input');
      });
      expect(schema).toEqual({
        kind: 'group',
        key: 'root',
        schemas: [
          { kind: 'text', key: 'input' }
        ]
      });
    });
  });
});
