import { form } from '../../compose';
import { headed, numberField, range, textField } from './control';

describe('control', () => {
  it('headed', () => {
    const { schemas } = form(() => {
      headed();
    });
    expect(schemas).toEqual([{
      kind: 'headed',
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
