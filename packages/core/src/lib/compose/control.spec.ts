import { headless } from './control';
import { form } from './control-container';

describe('control', () => {
  it('headless', () => {
    const { schemas } = form(() => {
      headless();
    });
    expect(schemas).toEqual([{
      kind: 'headless'
    }]);
  });
});
