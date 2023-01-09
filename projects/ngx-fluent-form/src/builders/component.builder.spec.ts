import { ButtonComponentSchema, TextComponentSchema } from '../schemas';
import { standardSchema } from '../utils';
import { button, text } from './component.builder';

describe('component.builder', () => {
  it('text', () => {
    const schema = standardSchema(text().content(''));
    const value = { kind: 'text', content: '' } as TextComponentSchema;
    expect(schema).toEqual(value);
  });

  it('button', () => {
    const schema = standardSchema(button());
    const value = { kind: 'button' } as ButtonComponentSchema;
    expect(schema).toEqual(value);
  });
});