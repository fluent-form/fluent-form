import { ButtonComponentSchema, TextComponentSchema } from '../schemas';
import { standardSchema } from '../utils';
import { button, text } from './component.builder';

describe('component.builder', () => {
  it('text', () => {
    const schema = standardSchema(text().content(''));
    const value: TextComponentSchema = { kind: 'text', content: '' };
    expect(schema).toEqual(value);
  });

  it('button', () => {
    const schema = standardSchema(button());
    const value: ButtonComponentSchema = { kind: 'button' };
    expect(schema).toEqual(value);
  });
});
