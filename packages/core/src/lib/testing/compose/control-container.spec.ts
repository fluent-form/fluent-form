import { form } from '../../compose';
import { array, group } from './control-container';

describe('control-container', () => {
  it('group', () => {
    const { schemas } = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      group().schemas(() => { });
    });
    expect(schemas).toEqual([{
      kind: 'group',
      schemas: []
    }]);
  });

  it('array', () => {
    const { schemas } = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      array().schemas(() => { });
    });
    expect(schemas).toEqual([{
      kind: 'array',
      schemas: []
    }]);
  });
});
