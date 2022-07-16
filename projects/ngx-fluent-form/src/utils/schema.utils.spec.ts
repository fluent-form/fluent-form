import { AbstractControl, AsyncValidatorFn, Validators } from '@angular/forms';
import { of } from 'rxjs';
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

    it('文本图示', () => {
      const schema1 = standardSchema(input('name').length(1));
      const schema2 = standardSchema(input('name').length({ min: 1, max: 2 }));

      expect(schema1.validator?.length).toBe(2);
      expect(schema2.validator?.length).toBe(2);
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
      it('required', () => {
        const value: AnySchema[] = [{
          type: 'input',
          name: 'name',
          required: true,
          validator: [Validators.required]
        }];
        const schemas = standardSchemas([input('name').required(true)]);

        expect(schemas).toEqual(value);
      });

      it('email', () => {
        const value: AnySchema[] = [{
          type: 'input',
          subtype: 'email',
          name: 'name',
          required: true,
          validator: [Validators.email, Validators.required]
        }];
        const schemas = standardSchemas([input('name').subtype('email').required(true)]);

        expect(schemas).toEqual(value);
      });
    });
  });

  describe('使用 ControlUtils 添加验证器', () => {
    it('同步验证器', () => {
      const schema = standardSchema(input('name'));
      controlSchemaUtils(schema).addValidator(Validators.required);

      expect(schema.validator?.length).toEqual(1);

      controlSchemaUtils(schema).addValidator([Validators.email]);

      expect(schema.validator?.length).toEqual(2);
    });

    it('异步验证器', () => {
      const validator1: AsyncValidatorFn = (ctrl: AbstractControl) => of(null);
      const validator2: AsyncValidatorFn = (ctrl: AbstractControl) => Promise.resolve(null);
      const schema = standardSchema(input('name'));
      controlSchemaUtils(schema).addAsyncValidator(validator1);

      expect(schema.asyncValidator?.length).toEqual(1);

      controlSchemaUtils(schema).addAsyncValidator([validator2]);

      expect(schema.asyncValidator?.length).toEqual(2);
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

      expect(schema).toBe(undefined);
    });

    it('不存在的双字段图示', () => {
      const schemas = standardSchemas([slider(['begin', 'end'])]);
      const schema = schemasUtils(schemas).find([['begin', 'e']]);

      expect(schema).toBe(undefined);
    });
  });
});
