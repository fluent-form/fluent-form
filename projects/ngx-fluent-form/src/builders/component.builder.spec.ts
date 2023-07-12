import { ButtonComponentSchema, TemplateSchema, TextComponentSchema } from '../schemas';
import { standardSchema } from '../utils';
import { button, template, text } from './component.builder';

describe('component.builder', () => {
  it('template', () => {
    const schema = standardSchema(template('named'));
    const value: TemplateSchema<'named'> = { kind: 'template', key: 'named' };
    expect(schema).toEqual(value);
  });

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
