import { form } from '@fluent-form/core';
import { card, step, steps, tab, tabs } from './component-container';
import { textField } from './control';

describe('component-container', () => {
  it('steps', () => {
    const { schemas } = form(() => {
      steps().schemas(() => {
        step().title('title').schemas(() => {
          textField('ipt');
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
            { kind: 'text-field', key: 'ipt' }
          ]
        }
      ]
    }]);
  });

  it('tabs', () => {
    const { schemas } = form(() => {
      tabs().schemas(() => {
        tab().title('title').schemas(() => {
          textField('ipt');
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
            { kind: 'text-field', key: 'ipt' }
          ]
        }
      ]
    }]);
  });

  it('card', () => {
    const { schemas } = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      card().schemas(() => { });
    });
    expect(schemas).toEqual([{
      kind: 'card',
      schemas: []
    }]);
  });
});
