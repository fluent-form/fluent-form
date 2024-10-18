import { form } from '@fluent-form/core';
import { buttonGroup } from './component-wrapper';

describe('component-wrapper', () => {
  it('buttonGroup', () => {
    const { schemas } = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      buttonGroup().schemas(() => { });
    });
    expect(schemas).toEqual([{
      kind: 'button-group',
      schemas: []
    }]);
  });
});
