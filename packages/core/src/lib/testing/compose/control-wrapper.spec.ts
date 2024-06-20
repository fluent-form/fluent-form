import { form } from '../../compose';
import { inputGroup } from './control-wrapper';

describe('control-wrapper', () => {
  it('inputGroup', () => {
    const { schemas } = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      inputGroup().schemas(() => { });
    });
    expect(schemas).toEqual([{
      kind: 'input-group',
      schemas: []
    }]);
  });
});
