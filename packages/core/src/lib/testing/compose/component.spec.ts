import { form } from '../../compose';
import { button, template } from './component';

describe('component', () => {
  it('template', () => {
    const { schemas } = form(() => {
      template();
    });
    expect(schemas).toEqual([{
      kind: 'template',
    }]);
  });

  it('button', () => {
    const { schemas } = form(() => {
      button();
    });
    expect(schemas).toEqual([{
      kind: 'button',
    }]);
  });
});
