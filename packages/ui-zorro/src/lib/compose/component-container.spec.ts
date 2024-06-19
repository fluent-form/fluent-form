import { form } from '@fluent-form/core';
import { step, steps, tab, tabs } from './component-container';
import { text } from './control';

describe('component-container', () => {
  it('steps', () => {
    const { schemas } = form(() => {
      steps().schemas(() => {
        step().title('title').schemas(() => {
          text('ipt');
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
            { kind: 'text', key: 'ipt' }
          ]
        }
      ]
    }]);
  });

  it('tabs', () => {
    const { schemas } = form(() => {
      tabs().schemas(() => {
        tab().title('title').schemas(() => {
          text('ipt');
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
            { kind: 'text', key: 'ipt' }
          ]
        }
      ]
    }]);
  });
});
