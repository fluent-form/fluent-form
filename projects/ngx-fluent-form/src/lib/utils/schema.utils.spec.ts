import { array, group, text } from '../fluent-form.control';
import { AnyControlSchema } from '../models/schema.model';
import { standardSchemas } from './schema.utils';

describe('schema.utils', () => {
  it('应该能正确标准化不同的图示', () => {
    const value: AnyControlSchema[] = [{ type: 'text', name: 'name' }];
    const schemas = standardSchemas([text('name')]);

    expect(schemas).toEqual(value);
  });

  it('应该能正确标准化嵌套图示（group）', () => {
    const value: AnyControlSchema[] = [{
      type: 'group',
      name: 'name',
      schemas: [
        { type: 'text', name: 'name' }
      ]
    }];

    const schemas = standardSchemas([
      group('name').schemas([
        text('name')
      ])
    ]);

    expect(schemas).toEqual(value);
  });

  it('应该能正确标准化嵌套图示（array）', () => {
    const value: AnyControlSchema[] = [{
      type: 'array',
      name: 'name',
      schemas: [{
        type: 'group',
        name: 'name',
        schemas: [
          { type: 'text', name: 'name' }
        ]
      }]
    }];

    const schemas = standardSchemas([
      array('name').schemas([
        group('name').schemas([
          text('name')
        ])
      ])
    ]);

    expect(schemas).toEqual(value);
  });
});