import { row } from './component-container';
import { form } from './control-container';

describe('component-container', () => {
  it('row', () => {
    const schema = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      row().schemas(() => { });
    });
    expect(schema().schemas).toEqual([
      {
        kind: 'row',
        schemas: []
      }
    ]);
  });
});
