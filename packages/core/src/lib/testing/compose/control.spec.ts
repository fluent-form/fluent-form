import { form } from '../../compose';
import { headless, input, range } from './control';

describe('control', () => {
  it('headless', () => {
    const { schemas } = form(() => {
      headless();
    });
    expect(schemas).toEqual([{
      kind: 'headless',
    }]);
  });

  it('input', () => {
    const { schemas } = form(() => {
      input();
    });
    expect(schemas).toEqual([{
      kind: 'input',
    }]);
  });

  it('range', () => {
    const { schemas } = form(() => {
      range();
    });
    expect(schemas).toEqual([{
      kind: 'range',
    }]);
  });
});
