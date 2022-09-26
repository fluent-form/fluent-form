import { Validators } from '@angular/forms';
import { schemasUtils, standardSchema, standardSchemas } from '.';
import { array, group, input, inputGroup, slider } from '../builders';
import { AnySchema } from '../schemas/index.schema';
import { controlSchemaUtils } from './schema.utils';

describe('schema.utils', () => {
  describe('应该能正确标准化图示', () => {
    it('普通图示', () => {
      const value: AnySchema[] = [{ type: 'input', name: 'name' }];
      const schemas = standardSchemas([input('name')]);

      expect(schemas).toEqual(value);
    });

    describe('嵌套图示', () => {
      it('group', () => {
        const value: AnySchema[] = [{
          type: 'group',
          name: 'name',
          schemas: [
            { type: 'input', name: 'name' }
          ]
        }];

        const schemas = standardSchemas([
          group('name').schemas(
            input('name')
          )
        ]);

        expect(schemas).toEqual(value);
      });

      it('array', () => {
        const value: AnySchema[] = [{
          type: 'array',
          name: 'name',
          schemas: [{
            type: 'group',
            name: 0,
            schemas: [
              { type: 'input', name: 'name' }
            ]
          }]
        }];

        const schemas = standardSchemas([
          array('name').schemas(
            group().schemas(
              input('name')
            )
          )
        ]);

        expect(schemas).toEqual(value);
      });

      it('input-group', () => {
        const value: AnySchema[] = [{
          type: 'input-group',
          schemas: [
            { type: 'input', name: 'name' }
          ]
        }];

        const schemas = standardSchemas([
          inputGroup().schemas(
            input('name')
          )
        ]);

        expect(schemas).toEqual(value);
      });
    });

    describe('带验证器的图示', () => {
      it('length', () => {
        const schema = standardSchema(input('name').length(1));
        const validators = controlSchemaUtils(schema).getExtraValidators();

        expect(validators.length).toBe(2);
      });

      it('min/max', () => {
        const schema = standardSchema(input('name').length({ min: 1, max: 2 }));
        const validators = controlSchemaUtils(schema).getExtraValidators();

        expect(validators.length).toBe(2);
      });

      it('required', () => {
        const schema = standardSchema(input('name').required(true));
        const validators = controlSchemaUtils(schema).getExtraValidators();

        expect(validators).toEqual([Validators.required]);
      });

      it('email', () => {
        const schema = standardSchema(input('name').subtype('email').required(true));
        const validators = controlSchemaUtils(schema).getExtraValidators();

        expect(validators.length).toBe(2);
        expect(validators).toContain(Validators.email);
        expect(validators).toContain(Validators.required);
      });
    });
  });

  describe('应该能在图示列表中找到目标图示', () => {
    it('普通图示', () => {
      const target = standardSchema(input('name'));
      const schemas = [target];
      schemasUtils(schemas).find('name');
      const schema = schemasUtils(schemas).find('name');

      expect(schema).toEqual(target);
    });

    it('二级图示', () => {
      const target = standardSchema(input('name'));
      const schemas = standardSchemas([
        group('group').schemas(target)
      ]);
      const schema = schemasUtils(schemas).find(['group', 'name']);

      expect(schema).toEqual(target);
    });

    it('多级图示', () => {
      const target = standardSchema(input('name'));
      const schemas = standardSchemas([
        group('group').schemas(
          group('group').schemas(target)
        )
      ]);
      const schema = schemasUtils(schemas).find(['group', 'group', 'name']);

      expect(schema).toEqual(target);
    });

    it('一维数组图示', () => {
      const target = standardSchema(input(0));
      const schemas = standardSchemas([
        array('array').schemas(target)
      ]);
      const schema = schemasUtils(schemas).find(['array', 0]);

      expect(schema).toEqual(target);
    });

    it('多维数组图示', () => {
      const target = standardSchema(input(0));
      const schemas = standardSchemas([
        array('array').schemas(
          array().schemas(target)
        )
      ]);
      const schema = schemasUtils(schemas).find(['array', 0, 0]);

      expect(schema).toEqual(target);
    });

    it('对象嵌套数组图示', () => {
      const target = standardSchema(input(0));
      const schemas = standardSchemas([
        group('group').schemas(
          array('array').schemas(target)
        )
      ]);
      const schema = schemasUtils(schemas).find(['group', 'array', 0]);


      expect(schema).toEqual(target);
    });

    it('数组嵌套对象图示', () => {
      const target = standardSchema(input('name'));
      const schemas = standardSchemas([
        array('array').schemas(
          group(0).schemas(target)
        )
      ]);
      const schema = schemasUtils(schemas).find(['array', 0, 'name']);

      expect(schema).toEqual(target);
    });

    it('双字段图示', () => {
      const target = standardSchema(slider(['begin', 'end']));
      const schemas = [target];
      const schema = schemasUtils(schemas).find([['begin', 'end']]);

      expect(schema).toEqual(target);
    });

    it('不存在的图示', () => {
      const schemas = standardSchemas([input('name')]);
      const schema = schemasUtils(schemas).find('n');

      expect(schema).toBe(null);
    });

    it('不存在的双字段图示', () => {
      const schemas = standardSchemas([slider(['begin', 'end'])]);
      const schema = schemasUtils(schemas).find([['begin', 'e']]);

      expect(schema).toBe(null);
    });
  });
});
