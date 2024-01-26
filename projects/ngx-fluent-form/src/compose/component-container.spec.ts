import { row, step, steps, tab, tabs } from './component-container';
import { input } from './control';
import { form } from './control-container';

describe('component-container', () => {
  it('steps', () => {
    const { schemas } = form(() => {
      steps().schemas(() => {
        step().title('title').schemas(() => {
          input('ipt');
        });
      });
    });
    expect(schemas).toEqual([{
      kind: 'steps',
      schemas: [
        {
          kind: 'step',
          title: 'title',
          schemas: [
            { kind: 'input', key: 'ipt' }
          ]
        }
      ]
    }]);
  });

  it('tabs', () => {
    const { schemas } = form(() => {
      tabs().schemas(() => {
        tab().title('title').schemas(() => {
          input('ipt');
        });
      });
    });
    expect(schemas).toEqual([{
      kind: 'tabs',
      schemas: [
        {
          kind: 'tab',
          title: 'title',
          schemas: [
            { kind: 'input', key: 'ipt' }
          ]
        }
      ]
    }]);
  });

  it('row', () => {
    const { schemas } = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      row().schemas(() => { });
    });
    expect(schemas).toEqual([{
      kind: 'row',
      schemas: []
    }]);
  });
});
