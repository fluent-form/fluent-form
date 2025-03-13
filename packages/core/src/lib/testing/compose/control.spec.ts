import { form } from '../../compose';
import { headful, numberField, range, textField } from './control';

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
      textField();
    });
    expect(schemas).toEqual([{
      kind: 'text-field',
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
      numberField();
    });
    expect(schemas).toEqual([{
      kind: 'number-field',
    }]);
  });
});
