import { form } from '../../compose';
import { button, template } from './component';

describe('component', () => {
  it('template', () => {
    const schema = form(() => {
      template();
    });
    expect(schema().schemas).toEqual([{
      kind: 'template',
    }]);
  });

  it('button', () => {
    const schema = form(() => {
      button();
    });
    expect(schema().schemas).toEqual([{
      kind: 'button',
    }]);
  });
});
