import { StepsComponentSchema, TabsetComponentSchema } from '../schemas';
import { standardSchema } from '../utils';
import { step, steps, tab, tabset } from './component-container.builder';
import { input } from './control.builder';

describe('component-container.builder', () => {
  it('steps', () => {
    const schema = standardSchema(
      steps().schemas(
        step().title('title').schemas(
          input('ipt')
        )
      )
    );
    const value: StepsComponentSchema = {
      kind: 'steps',
      schemas: [
        {
          kind: 'step',
          title: 'title',
          schemas: [
            { kind: 'input', name: 'ipt' }
          ]
        }
      ]
    };
    expect(schema).toEqual(value);
  });

  it('tabset', () => {
    const schema = standardSchema(
      tabset().schemas(
        tab().title('title').schemas(
          input('ipt')
        )
      )
    );
    const value: TabsetComponentSchema = {
      kind: 'tabset',
      schemas: [
        {
          kind: 'tab',
          title: 'title',
          schemas: [
            { kind: 'input', name: 'ipt' }
          ]
        }
      ]
    };
    expect(schema).toEqual(value);
  });
})