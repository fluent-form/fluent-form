import { form } from '../testing';
import { headless } from './control';

describe('control', () => {
  it('headless', () => {
    const schema = form(() => {
      headless();
    });
    expect(schema().schemas).toEqual([
      {
        kind: 'headless'
      }
    ]);
  });
});
