import { form } from '../../compose';
import { buttonGroup } from './component-wrapper';

describe('component-wrapper', () => {
  it('row', () => {
    const schema = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      buttonGroup().schemas(() => { });
    });
    expect(schema().schemas).toEqual([{
      kind: 'button-group',
      schemas: []
    }]);
  });
});
