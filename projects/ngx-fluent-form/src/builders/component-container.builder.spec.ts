import { standardSchema } from '../utils';
import { row, step, steps, tab, tabs } from './component-container.builder';
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
    expect(schema).toEqual({
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
    });
  });

  it('tabs', () => {
    const schema = standardSchema(
      tabs().schemas(
        tab().title('title').schemas(
          input('ipt')
        )
      )
    );
    expect(schema).toEqual({
      kind: 'tabs',
      schemas: [
        {
          kind: 'tab',
          title: 'title',
          schemas: [
            { kind: 'input', name: 'ipt' }
          ]
        }
      ]
    });
  });

  it('row', () => {
    const schema = standardSchema(
      row().schemas()
    );
    expect(schema).toEqual({
      kind: 'row',
      schemas: []
    });
  });
});
