import { signal } from '@angular/core';
import { textField } from '../testing';
import { form } from './control-container';

describe('control-container', () => {
  describe('form', () => {
    it('compose function', () => {
      const schema = form(() => {
        textField('input');
      });
      expect(schema()).toEqual({
        kind: 'group',
        key: 'root',
        schemas: [{ kind: 'text-field', key: 'input' }]
      });
    });

    it('signal', () => {
      const key = signal('input');
      const schema = form(() => {
        textField(key());
      });
      expect(schema()).toEqual({
        kind: 'group',
        key: 'root',
        schemas: [{ kind: 'text-field', key: 'input' }]
      });
      key.set('input2');
      expect(schema()).toEqual({
        kind: 'group',
        key: 'root',
        schemas: [{ kind: 'text-field', key: 'input2' }]
      });
    });

    it('schema array', () => {
      const { schemas } = form([{ kind: 'text-field', key: 'input' }]);
      expect(schemas).toEqual([{ kind: 'text-field', key: 'input' }]);
    });
  });
});
