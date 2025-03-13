import { TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { provideFluentForm } from '../provider';
import { AbstractControlSchema, AbstractSchema } from '../schemas';
import { withTesting } from '../testing';
import { Indexable } from '../types';
import { FormUtil, getChildControl } from './form.utils';

describe('form.utils', () => {
  let util: FormUtil;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withTesting()
        )
      ]
    });

    util = TestBed.inject(FormUtil);
  });

  describe('FormUtil', () => {
    describe('createFormControl', () => {
      it('normal', () => {
        const control = util.createFormControl({ kind: 'text-field' }, {});
        expect(control).toBeTruthy();
      });

      describe('with mulit key control', () => {
        it('normal', () => {
          const form = util.createFormControl({ kind: 'slider', key: ['start', 'end'] }, {});

          expect(form.value).toEqual(null);
        });

        it('with model default value', () => {
          const form = util.createFormControl(
            { kind: 'slider', key: ['start', 'end'] },
            { start: 1, end: 100 }
          );

          expect(form.value).toEqual([1, 100]);
        });
      });

      it('with mapper', () => {
        const control = util.createFormControl({
          kind: 'text-field',
          key: 'input',
          mapper: {
            parser: (value: number) => value?.toString(),
            formatter: (value: string | null) => value?.toString()
          }
        }, { input: 1 });
        expect(control.value).toEqual('1');
      });

      it('with validators', () => {
        const control = util.createFormControl({
          kind: 'text-field',
          validators: [Validators.email]
        }, {});
        expect(control.hasValidator(Validators.email)).toBe(true);
      });
    });

    describe('createFormGroup', () => {
      it('normal', () => {
        const form = util.createFormGroup({
          kind: 'group',
          schemas: [
            { kind: 'text-field', key: 'input' }
          ]
        }, {});

        expect(form.value).toEqual({ input: null });
      });

      it('with control default value', () => {
        const form = util.createFormGroup([
          { kind: 'text-field', key: 'input', defaultValue: 'control default value' }
        ], {});

        expect(form.value).toEqual({ input: 'control default value' });
      });

      it('with model default value', () => {
        const form = util.createFormGroup([
          { kind: 'text-field', key: 'input', defaultValue: 'control default value' }
        ], { input: 'model value' });

        expect(form.value).toEqual({ input: 'model value' });
      });

      describe('with mulit key control', () => {
        it('normal', () => {
          const form = util.createFormGroup([
            { kind: 'range', key: ['start', 'end'] }
          ], {});

          expect(form.value).toEqual({ 'start,end': null });
        });

        it('with model default value', () => {
          const form = util.createFormGroup([
            { kind: 'range', key: ['start', 'end'] }
          ], { start: 1, end: 100 });

          expect(form.value).toEqual({ 'start,end': [1, 100] });
        });
      });

      it('nested group', () => {
        const form = util.createFormGroup([
          { kind: 'text-field', key: 'input' },
          {
            kind: 'group',
            key: 'group',
            schemas: [
              { kind: 'text-field', key: 'input' }
            ]
          }
        ], {});

        expect(form.value).toEqual({
          input: null,
          group: {
            input: null
          }
        });
      });

      it('nested array', () => {
        const form = util.createFormGroup([
          { kind: 'text-field', key: 'input' },
          {
            kind: 'array',
            key: 'array',
            schemas: [
              { kind: 'text-field' }
            ]
          }
        ], {});

        expect(form.value).toEqual({
          input: null,
          array: []
        });
      });

      it('with control wrapper', () => {
        const form = util.createFormGroup([
          {
            kind: 'input-group',
            schemas: [
              { kind: 'text-field', key: 'input' }
            ]
          }
        ], {});

        expect(form.value).toEqual({ input: null });
      });

      it('with component', () => {
        const form = util.createFormGroup([
          { kind: 'text-field', key: 'input' },
          { kind: 'button' }
        ], {});

        expect(form.value).toEqual({ input: null });
      });

      it('with component wrapper', () => {
        const form = util.createFormGroup([
          { kind: 'text-field', key: 'input' },
          {
            kind: 'button-group',
            schemas: [
              { kind: 'button' }
            ]
          }
        ], {});

        expect(form.value).toEqual({ input: null });
      });

      it('with component container', () => {
        const form = util.createFormGroup([
          {
            kind: 'row',
            schemas: [
              { kind: 'text-field', key: 'input' },
            ]
          }
        ], {});

        expect(form.value).toEqual({ input: null });
      });

      it('with path key schema', () => {
        const form = util.createFormGroup([
          { kind: 'text-field', key: 'a.b.c', defaultValue: 'hello' },
          { kind: 'text-field', key: 'a.b.d', defaultValue: 'world' },
          { kind: 'text-field', key: 'a.b.e.f', defaultValue: '!' },
        ], {});

        expect(form.value).toEqual({
          a: {
            b: {
              c: 'hello',
              d: 'world',
              e: { f: '!' }
            }
          }
        });
      });
    });

    describe('createFormArray', () => {
      it('normal', () => {
        const form = util.createFormArray({
          kind: 'array',
          schemas: [
            { kind: 'text-field' }
          ]
        }, []);

        expect(form.value).toEqual([]);
      });

      it('with length', () => {
        const form1 = util.createFormArray({
          kind: 'array',
          length: 1,
          schemas: [
            { kind: 'text-field' }
          ]
        }, []);
        const form2 = util.createFormArray({
          kind: 'array',
          length: { min: 1, max: 5 },
          schemas: [
            { kind: 'text-field' }
          ]
        }, []);
        const form3 = util.createFormArray({
          kind: 'array',
          length: { min: 1 },
          schemas: [
            { kind: 'text-field' }
          ]
        }, ['']);
        const form4 = util.createFormArray({
          kind: 'array',
          length: { max: 1 },
          schemas: [
            { kind: 'text-field' }
          ]
        }, ['']);

        expect(form1.valid).toEqual(false);
        expect(form2.valid).toEqual(false);
        expect(form3.valid).toEqual(true);
        expect(form4.valid).toEqual(true);
      });

      it('not element schema', () => {
        expect(() => {
          util.createFormArray({
            kind: 'array',
            schemas: []
          }, []);
        }).toThrowError('FormArray element control schema not found');
      });

      it('with model value', () => {
        const form = util.createFormArray({
          kind: 'array',
          schemas: [
            { kind: 'text-field' }
          ]
        }, ['hello', 'world']);

        expect(form.value).toEqual(['hello', 'world']);
      });

      it('with control wrapper', () => {
        const form = util.createFormArray({
          kind: 'array',
          schemas: [
            {
              kind: 'input-group',
              schemas: [
                { kind: 'text-field' }
              ]
            }
          ]
        }, ['hello', 'world']);

        expect(form.value).toEqual(['hello', 'world']);
      });

      it('with component', () => {
        const form = util.createFormArray({
          kind: 'array',
          schemas: [
            { kind: 'text-field' },
            { kind: 'button' }
          ]
        }, ['hello', 'world']);

        expect(form.value).toEqual(['hello', 'world']);
      });

      it('with component wrapper', () => {
        const form = util.createFormArray({
          kind: 'array',
          schemas: [
            { kind: 'text-field' },
            {
              kind: 'button-group',
              schemas: [
                { kind: 'button' }
              ]
            }
          ]
        }, ['hello', 'world']);

        expect(form.value).toEqual(['hello', 'world']);
      });

      it('with component container', () => {
        const form = util.createFormArray({
          kind: 'array',
          schemas: [
            {
              kind: 'row',
              schemas: [
                { kind: 'text-field' }
              ]
            }
          ]
        }, ['hello', 'world']);

        expect(form.value).toEqual(['hello', 'world']);
      });

      it('nested group', () => {
        const form = util.createFormArray({
          kind: 'array',
          schemas: [
            {
              kind: 'group',
              schemas: [
                { kind: 'text-field', key: 'input' }
              ]
            }
          ]
        }, [{ input: 'input' }]);

        expect(form.value).toEqual([{ input: 'input' }]);
      });

      it('nested array', () => {
        const form = util.createFormArray({
          kind: 'array',
          schemas: [
            {
              kind: 'array',
              schemas: [
                { kind: 'text-field' }
              ]
            }
          ]
        }, [['hello', 'world']]);

        expect(form.value).toEqual([['hello', 'world']]);
      });
    });

    describe('createAnyControl', () => {
      it('normal', () => {
        const schema: Indexable<AbstractSchema> = { kind: 'text-field', key: 'input' };
        const control = util.createAnyControl(schema, {});
        expect(control.value).toEqual(null);
      });

      it('group', () => {
        const schema: Indexable<AbstractSchema> = {
          kind: 'group',
          key: 'group',
          schemas: [
            { kind: 'text-field', key: 'input' }
          ]
        };
        const control = util.createAnyControl(schema, {});
        expect(control.value).toEqual({ input: null });
      });

      it('array', () => {
        const schema: Indexable<AbstractSchema> = {
          kind: 'array',
          key: 'array',
          schemas: [
            { kind: 'text-field' }
          ]
        };
        const control = util.createAnyControl(schema, {});
        expect(control.value).toEqual([]);
      });
    });

    describe('updateModel', () => {
      it('with control', () => {
        const schemas: Indexable<AbstractSchema>[] = [
          { kind: 'text-field', key: 'txt', defaultValue: '1' }
        ];
        const form = util.createFormGroup(schemas, {});

        expect(util.updateModel({}, form, schemas)).toEqual({ txt: '1' });
      });

      it('should be skip disabled controls', () => {
        const schemas: Indexable<AbstractSchema>[] = [
          { kind: 'text-field', key: 'txt', disabled: true },
          { kind: 'text-field', key: 'txt2' }
        ];
        const form = util.createFormGroup(schemas, {});

        expect(util.updateModel({}, form, schemas)).toEqual({ txt2: null });
      });

      describe('with mulit key control', () => {
        it('normal', () => {
          const schemas: Indexable<AbstractSchema>[] = [
            { kind: 'range', key: ['start', 'end'] }
          ];
          const form = util.createFormGroup(schemas, {});

          expect(util.updateModel({}, form, schemas)).toEqual({ start: null, end: null });
        });

        it('with default value', () => {
          const schemas: Indexable<AbstractSchema>[] = [
            { kind: 'range', key: ['start', 'end'], defaultValue: [0, 10] }
          ];
          const form = util.createFormGroup(schemas, {});

          expect(util.updateModel({}, form, schemas)).toEqual({ start: 0, end: 10 });
        });
      });

      it('with component', () => {
        const schemas: Indexable<AbstractSchema>[] = [
          { kind: 'button' }
        ];
        const form = util.createFormGroup(schemas, {});

        expect(util.updateModel({}, form, schemas)).toEqual({});
      });

      it('with component wrapper', () => {
        const schemas: Indexable<AbstractSchema>[] = [
          { kind: 'button-group', schemas: [] }
        ];
        const form = util.createFormGroup(schemas, {});

        expect(util.updateModel({}, form, schemas)).toEqual({});
      });

      it('with group', () => {
        const schemas: Indexable<AbstractSchema>[] = [
          {
            kind: 'group',
            key: 'obj',
            schemas: [
              { kind: 'text-field', key: 'txt', defaultValue: '1' }
            ]
          }
        ];
        const form = util.createFormGroup(schemas, {});

        expect(util.updateModel({}, form, schemas)).toEqual({ obj: { txt: '1' } });
      });

      it('with array', () => {
        const schemas: Indexable<AbstractSchema>[] = [
          {
            kind: 'array',
            key: 'array',
            schemas: [
              { kind: 'text-field' }
            ]
          }
        ];
        const form = util.createFormGroup(schemas, { array: [1, 2] });

        expect(util.updateModel({}, form, schemas)).toEqual({ array: [1, 2] });
      });

      it('with path key schema', () => {
        const schemas: Indexable<AbstractSchema>[] = [
          { kind: 'text-field', key: 'a.b.c', defaultValue: 'hello' },
          { kind: 'text-field', key: 'a.b.d', defaultValue: 'world' },
          { kind: 'text-field', key: 'a.b.e.f', defaultValue: '!' },
        ];
        const form = util.createFormGroup(schemas, {});

        expect(util.updateModel({}, form, schemas)).toEqual({
          a: {
            b: {
              c: 'hello',
              d: 'world',
              e: { f: '!' }
            }
          }
        });
      });
    });

    describe('updateForm', () => {
      it('value', () => {
        const schemas: Indexable<AbstractControlSchema>[] = [
          { kind: 'text-field', key: 'txt' },
          { kind: 'text-field', key: 'txt2', value: ctx => ctx.model.txt },
        ];
        const form = util.createFormGroup(schemas, {});

        expect(form.value).toEqual({ txt: null, txt2: null });

        util.updateForm(form, { txt: true }, schemas);
        expect(form.get('txt2')?.value).toEqual(true);
      });

      describe('disbaled', () => {
        it('normal', () => {
          const schemas: Indexable<AbstractSchema>[] = [
            { kind: 'text-field', key: 'txt', disabled: (ctx: SafeAny) => ctx.model.txt },
            { kind: 'text-field', key: 'txt2' },
          ];
          const form = util.createFormGroup(schemas, {});

          util.updateForm(form, { txt: true }, schemas);
          expect(form.get('txt')!.disabled).toBe(true);
          expect(form.value).toEqual({ txt2: null });

          util.updateForm(form, { txt: false }, schemas);
          expect(form.get('txt')!.enabled).toBe(true);
          expect(form.value).toEqual({ txt: null, txt2: null });
        });

        it('with component', () => {
          const schemas: Indexable<AbstractSchema>[] = [
            { kind: 'button' },
            { kind: 'text-field', key: 'txt', disabled: (ctx: SafeAny) => ctx.model.txt },
          ];
          const form = util.createFormGroup(schemas, {});

          util.updateForm(form, { txt: 'true' }, schemas);
          expect(form.get('txt')!.disabled).toBe(true);
        });

        it('with group', () => {
          const schemas: Indexable<AbstractSchema>[] = [
            {
              kind: 'group',
              key: 'obj',
              schemas: [
                { kind: 'text-field', key: 'txt', disabled: (ctx: SafeAny) => ctx.model.txt },
              ]
            }
          ];
          const form = util.createFormGroup(schemas, {});

          util.updateForm(form, { obj: { txt: 'true' } }, schemas);
          expect(form.get('obj.txt')!.disabled).toBe(true);
        });

        it('with array', () => {
          const schemas: Indexable<AbstractSchema>[] = [
            {
              kind: 'array',
              key: 'arr',
              schemas: [
                { kind: 'text-field', key: 0, disabled: (ctx: SafeAny) => ctx.model[0] },
              ]
            }
          ];
          const form = util.createFormGroup(schemas, { arr: [true] });

          util.updateForm(form, { arr: [true] }, schemas);
          expect(form.get(['arr', 0])!.disabled).toBe(true);
        });
      });

      describe('required', () => {
        it('normal', () => {
          const schemas: Indexable<AbstractSchema>[] = [
            { kind: 'toggle', key: 'required' },
            { kind: 'text-field', key: 'text', required: (ctx: SafeAny) => ctx.model.required },
          ];
          const form = util.createFormGroup(schemas, {});

          form.patchValue({ required: true });
          util.updateForm(form, { required: true }, schemas);
          expect(form.get('text')!.hasValidator(Validators.required)).toBe(true);
          expect(form.valid).toBe(false);

          form.patchValue({ required: false });
          util.updateForm(form, { required: false }, schemas);
          expect(form.get('text')!.hasValidator(Validators.required)).toBe(false);
          expect(form.valid).toBe(true);
        });

        it('with component', () => {
          const schemas: Indexable<AbstractSchema>[] = [
            { kind: 'button' },
            { kind: 'text-field', key: 'txt', required: (ctx: SafeAny) => ctx.model.txt },
          ];
          const form = util.createFormGroup(schemas, {});

          util.updateForm(form, { txt: 'true' }, schemas);
          expect(form.get('txt')!.hasValidator(Validators.required)).toBe(true);
        });

        it('with group', () => {
          const schemas: Indexable<AbstractSchema>[] = [
            {
              kind: 'group',
              key: 'obj',
              schemas: [
                { kind: 'toggle', key: 'required' },
                { kind: 'text-field', key: 'text', required: (ctx: SafeAny) => ctx.model.required },
              ]
            }
          ];
          const form = util.createFormGroup(schemas, {});

          form.patchValue({ obj: { required: true } });
          util.updateForm(form, { obj: { required: true } }, schemas);
          expect(form.get('obj.text')!.hasValidator(Validators.required)).toBe(true);
          expect(form.valid).toBe(false);

          form.patchValue({ obj: { required: false } });
          util.updateForm(form, { obj: { required: false } }, schemas);
          expect(form.get('obj.text')!.hasValidator(Validators.required)).toBe(false);
          expect(form.valid).toBe(true);
        });

        it('with array', () => {
          const schemas: Indexable<AbstractSchema>[] = [
            {
              kind: 'array',
              key: 'arr',
              schemas: [
                { kind: 'text-field', key: 0, required: (ctx: SafeAny) => ctx.model[0] },
              ]
            }
          ];
          const form = util.createFormGroup(schemas, { arr: [true] });

          util.updateForm(form, { arr: [true] }, schemas);
          expect(form.get(['arr', 0])!.hasValidator(Validators.required)).toBe(true);
        });
      });
    });
  });

  it('getChildControl', () => {
    const group = util.createFormGroup([
      { kind: 'text-field', key: 'input' }
    ], {});
    const array = util.createFormArray({
      kind: 'array',
      schemas: [
        { kind: 'text-field' }
      ]
    }, ['str']);

    expect(getChildControl(group, 'input')).toBeTruthy();
    expect(getChildControl(group, 'none')).toBeNull();
    expect(getChildControl(array, 0)).toBeTruthy();
    expect(getChildControl(array, 1)).toBeUndefined();
    expect(getChildControl(array, 'none')).toBeUndefined();
  });
});
