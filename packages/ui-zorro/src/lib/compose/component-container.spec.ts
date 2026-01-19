import { form } from '@fluent-form/core';
import { card, step, steps, tab, tabs } from './component-container';
import { textField } from './control';

describe('component-container', () => {
  it('steps', () => {
    const schema = form(() => {
      steps().schemas(() => {
        step().title('title').schemas(() => {
          textField('ipt');
        });
      });
    });
    expect(schema().schemas).toEqual([
      {
        kind: 'steps',
        schemas: [
          {
            kind: 'step',
            title: 'title',
            schemas: [{ kind: 'text-field', key: 'ipt' }]
          }
        ]
      }
    ]);
  });

  it('tabs', () => {
    const schema = form(() => {
      tabs().schemas(() => {
        tab().title('title').schemas(() => {
          textField('ipt');
        });
      });
    });
    expect(schema().schemas).toEqual([
      {
        kind: 'tabs',
        schemas: [
          {
            kind: 'tab',
            title: 'title',
            schemas: [{ kind: 'text-field', key: 'ipt' }]
          }
        ]
      }
    ]);
  });

  it('card', () => {
    const schema = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      card().schemas(() => { });
    });
    expect(schema().schemas).toEqual([
      {
        kind: 'card',
        schemas: []
      }
    ]);
  });
});
