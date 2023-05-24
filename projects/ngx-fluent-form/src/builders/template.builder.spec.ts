import { TemplateSchema } from '../schemas';
import { standardSchema } from '../utils';
import { template } from './template.builder';

describe('template.builder', () => {
  it('template', () => {
    const schema = standardSchema(template('named'));
    const value: TemplateSchema<'named'> = { kind: 'template', key: 'named' };
    expect(schema).toEqual(value);
  });
});
