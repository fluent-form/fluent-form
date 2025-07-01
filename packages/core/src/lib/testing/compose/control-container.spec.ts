import { signal } from '@angular/core';
import { textField } from './control';
import { array, form, group } from './control-container';

describe('control-container', () => {
  it('form', () => {
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

  it('group', () => {
    const schema = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      group().schemas(() => { });
    });
    expect(schema().schemas).toEqual([
      {
        kind: 'group',
        schemas: []
      }
    ]);
  });

  it('array', () => {
    const schema = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      array().schemas(() => { });
    });
    expect(schema().schemas).toEqual([
      {
        kind: 'array',
        schemas: []
      }
    ]);
  });
});
