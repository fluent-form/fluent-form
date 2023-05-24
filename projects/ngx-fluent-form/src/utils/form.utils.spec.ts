import { TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';
import { AnySchema } from '../schemas';
import { StandardSchema } from '../schemas/types';
import { createFormArray, createFormControl, createFormGroup, FormUtil } from './form.utils';

describe('form.utils', () => {
  describe('createFormControl', () => {
    it('normal', () => {
      const schema: AnySchema = { kind: 'input' };
      const control = createFormControl(schema);

      expect(control).toBeTruthy();
      expect(control.value).toBeNull();
    });

    it('with mapper', () => {
      const schema: AnySchema = {
        kind: 'input',
        mapper: {
          parser: (value: number) => value.toString(),
          formatter: value => Number(value)
        },
        defaultValue: 1
      };
      const control = createFormControl(schema);

      expect(control.value).toEqual('1');
    });

    it('with validator', () => {
      const emailValidator = Validators.email;
      const schema: AnySchema = { kind: 'input', validators: [emailValidator] };
      const control = createFormControl(schema);

      expect(control.hasValidator(emailValidator)).toBeTrue();
    });
  });

  describe('createFormGroup', () => {
    it('normal', () => {
      const schemas: StandardSchema<AnySchema>[] = [];
      const group = createFormGroup(schemas);

      expect(group).toBeTruthy();
      expect(group.value).toEqual({});
    });

    it('with headless control', () => {
      const schemas: StandardSchema<AnySchema>[] = [
        { kind: 'headless', key: 'headless' }
      ];
      const group = createFormGroup(schemas);

      expect(group.value).toEqual({ headless: null });
    });

    it('with control', () => {
      const schemas: StandardSchema<AnySchema>[] = [
        { kind: 'input', key: 'text' }
      ];
      const group = createFormGroup(schemas);

      expect(group.value).toEqual({ text: null });
    });

    it('with component', () => {
      const schemas: StandardSchema<AnySchema>[] = [
        { kind: 'button' }
      ];
      const group = createFormGroup(schemas);

      expect(group.value).toEqual({});
    });

    it('with component wrapper', () => {
      const schemas: StandardSchema<AnySchema>[] = [
        { kind: 'button-group', schemas: [] }
      ];
      const group = createFormGroup(schemas);

      expect(group.value).toEqual({});
    });

    it('with template', () => {
      const schemas: StandardSchema<AnySchema>[] = [
        { kind: 'template' }
      ];
      const group = createFormGroup(schemas);

      expect(group.value).toEqual({});
    });

    it('with group', () => {
      const schema: StandardSchema<AnySchema> = {
        kind: 'group',
        schemas: [
          { kind: 'input', key: 'text' }
        ]
      };
      const group = createFormGroup(schema);

      expect(group.value).toEqual({ text: null });
    });

    it('with nested', () => {
      const schemas: StandardSchema<AnySchema>[] = [
        {
          kind: 'group',
          key: 'obj',
          schemas: [
            { kind: 'input', key: 'text' }
          ]
        }
      ];
      const group = createFormGroup(schemas);

      expect(group.value).toEqual({ obj: { text: null } });
    });

    it('with mix', () => {
      const schemas: StandardSchema<AnySchema>[] = [
        {
          kind: 'group',
          key: 'obj',
          schemas: [
            {
              kind: 'array',
              key: 'arr',
              schemas: [
                { kind: 'input', key: 0 }
              ]
            }
          ]
        }
      ];
      const group = createFormGroup(schemas);

      expect(group.value).toEqual({ obj: { arr: [null] } });
    });
  });

  describe('createFormArray', () => {
    it('normal', () => {
      const schema: StandardSchema<AnySchema> = { kind: 'array', schemas: [] };
      const array = createFormArray(schema);

      expect(array).toBeTruthy();
      expect(array.value).toEqual([]);
    });

    it('with control', () => {
      const schema: StandardSchema<AnySchema> = {
        kind: 'array',
        schemas: [
          { kind: 'input', key: 0 }
        ]
      };
      const array = createFormArray(schema);

      expect(array.value).toEqual([null]);
    });

    it('with group', () => {
      const schema: StandardSchema<AnySchema> = {
        kind: 'array',
        schemas: [
          { kind: 'group', key: 0, schemas: [] }
        ]
      };
      const array = createFormArray(schema);

      expect(array.value).toEqual([{}]);
    });

    it('with nested', () => {
      const schema: StandardSchema<AnySchema> = {
        kind: 'array',
        schemas: [
          { kind: 'array', key: 0, schemas: [] }
        ]
      };
      const array = createFormArray(schema);

      expect(array.value).toEqual([[]]);
    });

    it('with mix', () => {
      const schema: StandardSchema<AnySchema> = {
        kind: 'array',
        schemas: [
          {
            kind: 'group',
            key: 0,
            schemas: [
              { kind: 'input', key: 'text' }
            ]
          }
        ]
      };
      const array = createFormArray(schema);

      expect(array.value).toEqual([{ text: null }]);
    });
  });

  describe('FormUtil', () => {
    let util: FormUtil;

    beforeEach(() => {
      TestBed.configureTestingModule({});
      util = TestBed.inject(FormUtil);
    });

    describe('assign', () => {
      it('with control', () => {
        const schemas: StandardSchema<AnySchema>[] = [{ kind: 'number', key: 'num', defaultValue: 1 }];
        const form = createFormGroup(schemas);

        expect(util.updateModel(form, schemas, {})).toEqual({ num: 1 });
      });

      it('with double key control', () => {
        const schemas: StandardSchema<AnySchema>[] = [{ kind: 'slider', key: ['start', 'end'] }];
        const form = createFormGroup(schemas);

        expect(util.updateModel(form, schemas, {})).toEqual({ start: null, end: null });
      });

      it('with double key control (with default value)', () => {
        const schemas: StandardSchema<AnySchema>[] = [{ kind: 'slider', key: ['start', 'end'], defaultValue: [0, 100] }];
        const form = createFormGroup(schemas);

        expect(util.updateModel(form, schemas, {})).toEqual({ start: 0, end: 100 });
      });

      it('with component', () => {
        const schemas: StandardSchema<AnySchema>[] = [{ kind: 'button' }];
        const form = createFormGroup(schemas);

        expect(util.updateModel(form, schemas, {})).toEqual({});
      });

      it('with component wrapper', () => {
        const schemas: StandardSchema<AnySchema>[] = [{ kind: 'button-group', schemas: [] }];
        const form = createFormGroup(schemas);

        expect(util.updateModel(form, schemas, {})).toEqual({});
      });

      it('with group (empty)', () => {
        const schemas: StandardSchema<AnySchema>[] = [
          {
            kind: 'group',
            key: 'obj',
            schemas: []
          }
        ];
        const form = createFormGroup(schemas);

        expect(util.updateModel(form, schemas, {})).toEqual({ obj: {} });
      });

      it('with group', () => {
        const schemas: StandardSchema<AnySchema>[] = [
          {
            kind: 'group',
            key: 'obj',
            schemas: [
              { kind: 'number', key: 'num', defaultValue: 1 }
            ]
          }
        ];
        const form = createFormGroup(schemas);

        expect(util.updateModel(form, schemas, {})).toEqual({ obj: { num: 1 } });
      });

      it('with array (empty)', () => {
        const schemas: StandardSchema<AnySchema>[] = [
          {
            kind: 'array',
            key: 'arr',
            schemas: []
          }
        ];
        const form = createFormGroup(schemas);

        expect(util.updateModel(form, schemas, {})).toEqual({ arr: [] });
      });

      it('with array', () => {
        const schemas: StandardSchema<AnySchema>[] = [
          {
            kind: 'array',
            key: 'arr',
            schemas: [
              { kind: 'number', key: 0, defaultValue: 1 }
            ]
          }
        ];
        const form = createFormGroup(schemas);

        expect(util.updateModel(form, schemas, {})).toEqual({ arr: [1] });
      });

      it('with mix', () => {
        const schemas: StandardSchema<AnySchema>[] = [
          {
            kind: 'group',
            key: 'obj',
            schemas: [
              {
                kind: 'array',
                key: 'arr',
                schemas: [
                  { kind: 'number', key: 0, defaultValue: 1 }
                ]
              }
            ]
          },
          {
            kind: 'array',
            key: 'arr',
            schemas: [
              {
                kind: 'group',
                key: 0,
                schemas: [
                  { kind: 'number', key: 'num', defaultValue: 1 }
                ]
              },
            ]
          }
        ];
        const form = createFormGroup(schemas);

        expect(util.updateModel(form, schemas, {})).toEqual({
          obj: { arr: [1] },
          arr: [{ num: 1 }]
        });
      });
    });

    describe('change', () => {
      it('normal', () => {
        const schemas: StandardSchema<AnySchema>[] = [
          { kind: 'toggle', key: 'bool', disabled: ({ model }) => model.bool },
        ];
        const form = createFormGroup(schemas);

        util.updateForm(form, schemas, { bool: true });
        expect(form.get('bool')!.disabled).toBeTrue();
      });

      it('with component', () => {
        const schemas: StandardSchema<AnySchema>[] = [
          { kind: 'button' },
          { kind: 'toggle', key: 'bool', disabled: ({ model }) => model.bool },
        ];
        const form = createFormGroup(schemas);

        util.updateForm(form, schemas, { bool: true });
        expect(form.get('bool')!.disabled).toBeTrue();

        util.updateForm(form, schemas, { bool: false });
        expect(form.get('bool')!.enabled).toBeTrue();
      });

      it('with group', () => {
        const schemas: StandardSchema<AnySchema>[] = [
          {
            kind: 'group',
            key: 'obj',
            schemas: [
              { kind: 'toggle', key: 'bool', disabled: ({ model }) => model.bool },
            ]
          }
        ];
        const form = createFormGroup(schemas);

        util.updateForm(form, schemas, { obj: { bool: true } });
        expect(form.get('obj.bool')!.disabled).toBeTrue();
      });

      it('with array', () => {
        const schemas: StandardSchema<AnySchema>[] = [
          {
            kind: 'array',
            key: 'arr',
            schemas: [
              { kind: 'toggle', key: 0, disabled: ({ model }) => model[0] },
            ]
          }
        ];
        const form = createFormGroup(schemas);

        util.updateForm(form, schemas, { arr: [true] });
        expect(form.get(['arr', 0])!.disabled).toBeTrue();
      });
    });
  });
});
