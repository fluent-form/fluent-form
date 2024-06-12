import { row } from './component-container';
import { form } from './control-container';

describe('component-container', () => {
  it('row', () => {
    const { schemas } = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      row().schemas(() => { });
    });
    expect(schemas).toEqual([{
      kind: 'row',
      schemas: []
    }]);
  });
});
