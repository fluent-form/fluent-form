import { form } from '../../compose';
import { headless, range, text } from './control';

describe('control', () => {
  it('headless', () => {
    const { schemas } = form(() => {
      headless();
    });
    expect(schemas).toEqual([{
      kind: 'headless',
    }]);
  });

  it('text', () => {
    const { schemas } = form(() => {
      text();
    });
    expect(schemas).toEqual([{
      kind: 'text',
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
