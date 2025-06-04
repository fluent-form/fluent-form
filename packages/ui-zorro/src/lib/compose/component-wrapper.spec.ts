import { form } from '@fluent-form/core';
import { buttonGroup } from './component-wrapper';

describe('component-wrapper', () => {
  it('buttonGroup', () => {
    const schema = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      buttonGroup().schemas(() => { });
    });
    expect(schema().schemas).toEqual([
      {
        kind: 'button-group',
        schemas: []
      }
    ]);
  });
});
