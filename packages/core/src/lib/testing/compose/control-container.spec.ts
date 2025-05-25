import { form } from '../../compose';
import { array, group } from './control-container';

describe('control-container', () => {
  it('group', () => {
    const schema = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      group().schemas(() => { });
    });
    expect(schema().schemas).toEqual([{
      kind: 'group',
      schemas: []
    }]);
  });

  it('array', () => {
    const schema = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      array().schemas(() => { });
    });
    expect(schema().schemas).toEqual([{
      kind: 'array',
      schemas: []
    }]);
  });
});
