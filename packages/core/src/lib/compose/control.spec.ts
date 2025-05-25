import { headless } from './control';
import { form } from './control-container';

describe('control', () => {
  it('headless', () => {
    const schema = form(() => {
      headless();
    });
    expect(schema().schemas).toEqual([{
      kind: 'headless'
    }]);
  });
});
