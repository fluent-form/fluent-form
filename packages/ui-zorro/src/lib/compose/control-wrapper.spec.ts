import { form } from '@fluent-form/core';
import { space, spaceCompact } from './control-wrapper';

describe('control-wrapper', () => {
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
