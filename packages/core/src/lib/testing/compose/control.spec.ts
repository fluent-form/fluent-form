import { headful, numberField, range, textField } from './control';
import { form } from './control-container';

describe('control', () => {
  it('headful', () => {
    const schema = form(() => {
      headful();
    });
    expect(schema().schemas).toEqual([
      {
        kind: 'headful'
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
