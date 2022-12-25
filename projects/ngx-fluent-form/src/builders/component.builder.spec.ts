import { SafeAny } from '@ngify/types';
import { ButtonComponentSchema, StepsComponentSchema, TabsetComponentSchema, TextComponentSchema } from '../schemas';
import { standardSchema } from '../utils';
import { button, buttonGroup, inputGroup, step, steps, tab, tabset, text } from './component.builder';
import { input } from './control.builder';

describe('component.builder', () => {
  it('inputGroup', () => {
    const schema = standardSchema(inputGroup().schemas());
    const value = { kind: 'input-group', schemas: [] } as SafeAny;
    expect(schema).toEqual(value);
  });

  it('text', () => {
    const schema = standardSchema(text().content(''));
    const value = { kind: 'text', content: '' } as TextComponentSchema;
    expect(schema).toEqual(value);
  });

  it('buttonGroup', () => {
    const schema = standardSchema(buttonGroup().schemas());
    const value = { kind: 'button-group', schemas: [] } as SafeAny;
    expect(schema).toEqual(value);
  });

  it('button', () => {
    const schema = standardSchema(button());
    const value = { kind: 'button' } as ButtonComponentSchema;
    expect(schema).toEqual(value);
  });

  it('steps', () => {
    const schema = standardSchema(
      steps().schemas(
        step().title('title').schemas(
          input('ipt')
        )
      )
    );
    const value = {
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
    } as StepsComponentSchema;
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
    const value = {
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
    } as TabsetComponentSchema;
    expect(schema).toEqual(value);
  });
});