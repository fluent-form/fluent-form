import { form } from '../../compose';
import { headed, numberField, range, textField } from './control';

describe('control', () => {
  it('headed', () => {
    const schema = form(() => {
      headed();
    });
    expect(schema().schemas).toEqual([
      {
        kind: 'headed'
      }
    ]);
  });

  it('text', () => {
    const schema = form(() => {
      textField();
    });
    expect(schema().schemas).toEqual([
      {
        kind: 'text-field'
      }
    ]);
  });

  it('range', () => {
    const schema = form(() => {
      range();
    });
    expect(schema().schemas).toEqual([
      {
        kind: 'range'
      }
    ]);
  });

  it('number', () => {
    const schema = form(() => {
      numberField();
    });
    expect(schema().schemas).toEqual([
      {
        kind: 'number-field'
      }
    ]);
  });
});
