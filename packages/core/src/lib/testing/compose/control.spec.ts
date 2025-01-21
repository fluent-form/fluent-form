import { form } from '../../compose';
import { headful, number, range, text } from './control';

describe('control', () => {
  it('headful', () => {
    const { schemas } = form(() => {
      headful();
    });
    expect(schemas).toEqual([{
      kind: 'headful',
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

  it('number', () => {
    const { schemas } = form(() => {
      number();
    });
    expect(schemas).toEqual([{
      kind: 'number',
    }]);
  });
});
