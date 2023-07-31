import { ButtonComponentSchema, TemplateSchema, TextComponentSchema } from '../schemas';
import { standardSchema } from '../utils';
import { button, heading1, heading2, heading3, heading4, heading5, heading6, template, text } from './component.builder';

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

  it('heading', () => {
    expect(standardSchema(heading1().content(''))).toEqual({ kind: 'heading', level: 1, content: '' });
    expect(standardSchema(heading2().content(''))).toEqual({ kind: 'heading', level: 2, content: '' });
    expect(standardSchema(heading3().content(''))).toEqual({ kind: 'heading', level: 3, content: '' });
    expect(standardSchema(heading4().content(''))).toEqual({ kind: 'heading', level: 4, content: '' });
    expect(standardSchema(heading5().content(''))).toEqual({ kind: 'heading', level: 5, content: '' });
    expect(standardSchema(heading6().content(''))).toEqual({ kind: 'heading', level: 6, content: '' });
  });
});
