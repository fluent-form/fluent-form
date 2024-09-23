import { form } from '@fluent-form/core';
import { number, text } from './control';
import { inputGroup, numberGroup, space } from './control-wrapper';

describe('control-wrapper', () => {
  it('inputGroup', () => {
    const { schemas } = form(() => {
      inputGroup().schemas(() => {
        text();
      });
    });
    expect(schemas).toEqual([{
      kind: 'input-group',
      schemas: [
        { kind: 'text' }
      ]
    }]);
  });

  it('numberGroup', () => {
    const { schemas } = form(() => {
      numberGroup().schemas(() => {
        number();
      });
    });
    expect(schemas).toEqual([{
      kind: 'number-group',
      schemas: [
        { kind: 'number' }
      ]
    }]);
  });

  it('space', () => {
    const { schemas } = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      space().schemas(() => { });
    });
    expect(schemas).toEqual([{
      kind: 'space',
      schemas: []
    }]);
  });
});
