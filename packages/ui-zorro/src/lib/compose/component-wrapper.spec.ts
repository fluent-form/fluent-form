import { form } from '@fluent-form/core';
import { button } from './component';
import { buttonGroup } from './component-wrapper';

describe('component-wrapper', () => {
  it('buttonGroup', () => {
    const { schemas } = form(() => {
      buttonGroup().schemas(() => {
        button();
      });
    });
    expect(schemas).toEqual([{
      kind: 'button-group',
      schemas: [
        { kind: 'button' }
      ]
    }]);
  });
});
