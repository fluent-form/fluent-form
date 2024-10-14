import { form } from '@fluent-form/core';
import { text } from './control';
import { inputAddon, inputGroup, space, spaceCompact } from './control-wrapper';

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

  it('inputAddon', () => {
    const { schemas } = form(() => {
      inputAddon().schemas(() => {
        text();
      });
    });
    expect(schemas).toEqual([{
      kind: 'input-addon',
      schemas: [
        { kind: 'text' }
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

  it('spaceCompact', () => {
    const { schemas } = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      spaceCompact().schemas(() => { });
    });
    expect(schemas).toEqual([{
      kind: 'space-compact',
      schemas: []
    }]);
  });
});
