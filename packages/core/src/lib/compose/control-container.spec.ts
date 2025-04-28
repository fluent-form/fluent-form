import { signal } from '@angular/core';
import { group, textField } from '../testing';
import { applyRoot } from './builder';
import { fluentForm, form } from './control-container';

describe('control-container', () => {
  describe('form', () => {
    it('factory', () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const scheam = form(group().updateOn('blur').schemas(() => { }));
      expect(scheam).toEqual({ kind: 'group', key: 'root', updateOn: 'blur', schemas: [] });
    });

    it('schemas', () => {
      const { schemas } = form([{ kind: 'text-field', key: 'input' }]);
      expect(schemas).toEqual([{ kind: 'text-field', key: 'input' }]);
    });

    it('compose', () => {
      const schema = form(() => {
        textField('input');
      });
      expect(schema).toEqual({
        kind: 'group',
        key: 'root',
        schemas: [
          { kind: 'text-field', key: 'input' }
        ]
      });
    });
  });

  it('fluentForm', () => {
    const key = signal('input');
    const schema = fluentForm(() => {
      textField(key());
    });
    expect(schema()).toEqual({
      kind: 'group',
      key: 'root',
      schemas: [
        { kind: 'text-field', key: 'input' }
      ]
    });
    key.set('input2');
    expect(schema()).toEqual({
      kind: 'group',
      key: 'root',
      schemas: [
        { kind: 'text-field', key: 'input2' }
      ]
    });
  });

  it('applyRoot', () => {
    const schema = fluentForm(() => {
      applyRoot({ updateOn: 'blur' });
      textField('input');
    });
    expect(schema()).toEqual({
      kind: 'group',
      key: 'root',
      updateOn: 'blur',
      schemas: [
        { kind: 'text-field', key: 'input' }
      ]
    });
  });
});
