import { signal } from '@angular/core';
import { textField } from '../testing';
import { applyRoot } from './builder';
import { form } from './control-container';

describe('control-container', () => {
  it('form', () => {
    const key = signal('input');
    const schema = form(() => {
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

  it('schemas', () => {
    const { schemas } = form([{ kind: 'text-field', key: 'input' }]);
    expect(schemas).toEqual([{ kind: 'text-field', key: 'input' }]);
  });

  it('applyRoot', () => {
    const schema = form(() => {
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
