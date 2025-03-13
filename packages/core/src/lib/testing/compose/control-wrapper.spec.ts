import { form } from '../../compose';
import { fieldGroup } from './control-wrapper';

describe('control-wrapper', () => {
  it('fieldGroup', () => {
    const { schemas } = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      fieldGroup().schemas(() => { });
    });
    expect(schemas).toEqual([{
      kind: 'field-group',
      schemas: []
    }]);
  });
});
