import { Validators } from '@angular/forms';
import { AnySchema } from '../schemas';
import { StandardSchema } from '../schemas/types';
import { createFormArray, createFormControl, createFormGroup, formUtils } from './form.utils';

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
          input: (value: number) => value.toString(),
          output: value => Number(value)
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
        { kind: 'headless', name: 'headless' }
      ];
      const group = createFormGroup(schemas);

      expect(group.value).toEqual({ headless: null });
    });

    it('with control', () => {
      const schemas: StandardSchema<AnySchema>[] = [
        { kind: 'input', name: 'text' }
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
          { kind: 'input', name: 'text' }
        ]
      };
      const group = createFormGroup(schema);

      expect(group.value).toEqual({ text: null });
    });

    it('with nested', () => {
      const schemas: StandardSchema<AnySchema>[] = [
        {
          kind: 'group',
          name: 'obj',
          schemas: [
            { kind: 'input', name: 'text' }
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
          name: 'obj',
          schemas: [
            {
              kind: 'array',
              name: 'arr',
              schemas: [
                { kind: 'input', name: 0 }
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
          { kind: 'input', name: 0 }
        ]
      };
      const array = createFormArray(schema);

      expect(array.value).toEqual([null]);
    });

    it('with group', () => {
      const schema: StandardSchema<AnySchema> = {
        kind: 'array',
        schemas: [
          { kind: 'group', name: 0, schemas: [] }
        ]
      };
      const array = createFormArray(schema);

      expect(array.value).toEqual([{}]);
    });

    it('with nested', () => {
      const schema: StandardSchema<AnySchema> = {
        kind: 'array',
        schemas: [
          { kind: 'array', name: 0, schemas: [] }
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
            name: 0,
            schemas: [
              { kind: 'input', name: 'text' }
            ]
          }
        ]
      };
      const array = createFormArray(schema);

      expect(array.value).toEqual([{ text: null }]);
    });
  });

  describe('FormUtils', () => {
    describe('assign', () => {
      it('with control', () => {
        const schemas: StandardSchema<AnySchema>[] = [{ kind: 'number', name: 'num', defaultValue: 1 }];
        const form = createFormGroup(schemas);

        expect(formUtils(form, schemas).assign({})).toEqual({ num: 1 });
      });

      it('with double key control', () => {
        const schemas: StandardSchema<AnySchema>[] = [{ kind: 'slider', name: ['start', 'end'] }];
        const form = createFormGroup(schemas);

        expect(formUtils(form, schemas).assign({})).toEqual({ start: null, end: null });
      });

      it('with double key control (with default value)', () => {
        const schemas: StandardSchema<AnySchema>[] = [{ kind: 'slider', name: ['start', 'end'], defaultValue: [0, 100] }];
        const form = createFormGroup(schemas);

        expect(formUtils(form, schemas).assign({})).toEqual({ start: 0, end: 100 });
      });

      it('with component', () => {
        const schemas: StandardSchema<AnySchema>[] = [{ kind: 'button' }];
        const form = createFormGroup(schemas);

        expect(formUtils(form, schemas).assign({})).toEqual({});
      });

      it('with component wrapper', () => {
        const schemas: StandardSchema<AnySchema>[] = [{ kind: 'button-group', schemas: [] }];
        const form = createFormGroup(schemas);

        expect(formUtils(form, schemas).assign({})).toEqual({});
      });

      it('with group (empty)', () => {
        const schemas: StandardSchema<AnySchema>[] = [
          {
            kind: 'group',
            name: 'obj',
            schemas: []
          }
        ];
        const form = createFormGroup(schemas);

        expect(formUtils(form, schemas).assign({})).toEqual({ obj: {} });
      });

      it('with group', () => {
        const schemas: StandardSchema<AnySchema>[] = [
          {
            kind: 'group',
            name: 'obj',
            schemas: [
              { kind: 'number', name: 'num', defaultValue: 1 }
            ]
          }
        ];
        const form = createFormGroup(schemas);

        expect(formUtils(form, schemas).assign({})).toEqual({ obj: { num: 1 } });
      });

      it('with array (empty)', () => {
        const schemas: StandardSchema<AnySchema>[] = [
          {
            kind: 'array',
            name: 'arr',
            schemas: []
          }
        ];
        const form = createFormGroup(schemas);

        expect(formUtils(form, schemas).assign({})).toEqual({ arr: [] });
      });

      it('with array', () => {
        const schemas: StandardSchema<AnySchema>[] = [
          {
            kind: 'array',
            name: 'arr',
            schemas: [
              { kind: 'number', name: 0, defaultValue: 1 }
            ]
          }
        ];
        const form = createFormGroup(schemas);

        expect(formUtils(form, schemas).assign({})).toEqual({ arr: [1] });
      });

      it('with mix', () => {
        const schemas: StandardSchema<AnySchema>[] = [
          {
            kind: 'group',
            name: 'obj',
            schemas: [
              {
                kind: 'array',
                name: 'arr',
                schemas: [
                  { kind: 'number', name: 0, defaultValue: 1 }
                ]
              }
            ]
          },
          {
            kind: 'array',
            name: 'arr',
            schemas: [
              {
                kind: 'group',
                name: 0,
                schemas: [
                  { kind: 'number', name: 'num', defaultValue: 1 }
                ]
              },
            ]
          }
        ];
        const form = createFormGroup(schemas);

        expect(formUtils(form, schemas).assign({})).toEqual({
          obj: { arr: [1] },
          arr: [{ num: 1 }]
        });
      });
    });

    describe('change', () => {
      it('normal', () => {
        const schemas: StandardSchema<AnySchema>[] = [
          { kind: 'toggle', name: 'bool', disabled: ({ model }) => model.bool },
        ];
        const form = createFormGroup(schemas);

        formUtils(form, schemas).change({ bool: true });
        expect(form.get('bool')!.disabled).toBeTrue();
      });

      it('with component', () => {
        const schemas: StandardSchema<AnySchema>[] = [
          { kind: 'button' },
          { kind: 'toggle', name: 'bool', disabled: ({ model }) => model.bool },
        ];
        const form = createFormGroup(schemas);

        formUtils(form, schemas).change({ bool: true });
        expect(form.get('bool')!.disabled).toBeTrue();

        formUtils(form, schemas).change({ bool: false });
        expect(form.get('bool')!.enabled).toBeTrue();
      });

      it('with group', () => {
        const schemas: StandardSchema<AnySchema>[] = [
          {
            kind: 'group',
            name: 'obj',
            schemas: [
              { kind: 'toggle', name: 'bool', disabled: ({ model }) => model.bool },
            ]
          }
        ];
        const form = createFormGroup(schemas);

        formUtils(form, schemas).change({ obj: { bool: true } });
        expect(form.get('obj.bool')!.disabled).toBeTrue();
      });

      it('with array', () => {
        const schemas: StandardSchema<AnySchema>[] = [
          {
            kind: 'array',
            name: 'arr',
            schemas: [
              { kind: 'toggle', name: 0, disabled: ({ model }) => model[0] },
            ]
          }
        ];
        const form = createFormGroup(schemas);

        formUtils(form, schemas).change({ arr: [true] });
        expect(form.get(['arr', 0])!.disabled).toBeTrue();
      });
    });
  });
});
