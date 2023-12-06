import { input, number } from './control';
import { form } from './control-container';
import { inputGroup, numberGroup } from './control-wrapper';

describe('control-wrapper', () => {
  it('inputGroup', () => {
    const { schemas } = form(() => {
      inputGroup().schemas(() => {
        input();
      });
    });
    expect(schemas).toEqual([{
      kind: 'input-group',
      schemas: [
        { kind: 'input' }
      ]
    }]);
  });

  it('numberGroup', () => {
    const { schemas } = form(() => {
      numberGroup().schemas(() => {
        number();
      });
    });
    expect(schemas).toEqual([{
      kind: 'number-group',
      schemas: [
        { kind: 'number' }
      ]
    }]);
  });
});
