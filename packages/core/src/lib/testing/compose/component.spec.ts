import { button, template } from './component';
import { form } from './control-container';

describe('component', () => {
  it('template', () => {
    const schema = form(() => {
      template();
    });
    expect(schema().schemas).toEqual([
      {
        kind: 'template'
      }
    ]);
  });

  it('button', () => {
    const schema = form(() => {
      button();
    });
    expect(schema().schemas).toEqual([
      {
        kind: 'button'
      }
    ]);
  });
});
