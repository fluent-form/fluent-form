import { SafeAny } from '@ngify/types';
import { ButtonComponentSchema, StepsComponentSchema } from '../schemas';
import { standardSchema } from '../utils';
import { button, buttonGroup, inputGroup, step, steps } from './component.builder';
import { input } from './control.builder';

describe('component.builder', () => {
  it('inputGroup', () => {
    const schema = standardSchema(inputGroup().schemas());
    const value = { type: 'input-group', schemas: [] } as SafeAny;
    expect(schema).toEqual(value);
  });

  it('buttonGroup', () => {
    const schema = standardSchema(buttonGroup().schemas());
    const value = { type: 'button-group', schemas: [] } as SafeAny;
    expect(schema).toEqual(value);
  });

  it('button', () => {
    const schema = standardSchema(button());
    const value = { type: 'button' } as ButtonComponentSchema;
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
      type: 'steps',
      schemas: [
        {
          type: 'step',
          title: 'title',
          schemas: [
            { type: 'input', name: 'ipt' }
          ]
        }
      ]
    } as StepsComponentSchema;
    expect(schema).toEqual(value);
  });
});