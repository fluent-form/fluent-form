import { inject, Injectable } from '@angular/core';
import { AbstractControl, type AbstractControlOptions, FormArray, FormControl, FormGroup, type ValidatorFn, Validators } from '@angular/forms';
import type { AnyArray, AnyObject, SafeAny } from '@ngify/types';
import type { AbstractControlSchema, AbstractFormArraySchema, AbstractFormGroupSchema, AbstractSchema, SchemaKey } from '../schemas';
import { ValueTransformer } from '../services';
import type { Indexable } from '../types';
import { isArray, isNumber, isUndefined } from './is.utils';
import { SchemaUtil } from './schema.utils';
import { ValueUtil } from './value.utils';

/**
 * @internal
 */
@Injectable({
  providedIn: 'root'
})
export class FormUtil {
  private readonly schemaUtil = inject(SchemaUtil);
  private readonly valueUtil = inject(ValueUtil);
  private readonly valueTransformer = inject(ValueTransformer);

  createFormControl(schema: AbstractControlSchema, model: AnyObject): FormControl {
    const validators: ValidatorFn[] = this.schemaUtil.validatorsOf(schema);
    const value = this.valueUtil.valueOfModel(model, schema) ?? schema.defaultValue;

    return new FormControl(value, {
      nonNullable: !isUndefined(schema.defaultValue),
      validators: schema.validators ? validators.concat(schema.validators) : validators,
      asyncValidators: schema.asyncValidators,
      updateOn: schema.updateOn
    });
  }

  createFormGroup(schema: AbstractFormGroupSchema, model: AnyObject): FormGroup;
  createFormGroup(schemas: Indexable<AbstractSchema>[], model: AnyObject): FormGroup;
  createFormGroup(schemaOrSchemas: AbstractFormGroupSchema | Indexable<AbstractSchema>[], model: AnyObject): FormGroup;
  createFormGroup(schemaOrSchemas: AbstractFormGroupSchema | Indexable<AbstractSchema>[], model: AnyObject): FormGroup {
    let schemas: Indexable<AbstractSchema>[];
    let options: AbstractControlOptions = {};

    if (isArray(schemaOrSchemas)) {
      schemas = schemaOrSchemas;
    } else {
      schemas = schemaOrSchemas.schemas;
      options = {
        validators: schemaOrSchemas.validators,
        asyncValidators: schemaOrSchemas.asyncValidators,
        updateOn: schemaOrSchemas.updateOn
      };
    }

    return new FormGroup(
      this.createControlMap(schemas, model),
      options
    );
  }

  private createControlMap(schemas: Indexable<AbstractSchema>[], model: AnyObject) {
    return schemas.reduce((controls, schema) => {
      if (this.schemaUtil.isControlGroup(schema)) {
        const key = schema.key!.toString();
        controls[key] = this.createFormGroup(schema, model[key] ?? {});
      } else if (this.schemaUtil.isControlArray(schema)) {
        const key = schema.key!.toString();
        controls[key] = this.createFormArray(schema, model[key] ?? []);
      } else if (this.schemaUtil.isControlWrapper(schema) || this.schemaUtil.isComponentContainer(schema)) {
        Object.assign(controls, this.createControlMap(schema.schemas, model));
      } else if (this.schemaUtil.isControl(schema)) {
        if (this.schemaUtil.isPathKeySchema(schema)) {
          const paths = this.schemaUtil.parsePathKey(schema.key as string);
          const key = paths.pop()!;

          const parent: FormGroup = paths.reduce((previousGroup, path) => {
            let group = previousGroup.get(path) as FormGroup;

            if (!group) {
              group = new FormGroup({});
              previousGroup.addControl(path, group);
            }

            return group;
          }, (controls[paths.shift()!] ??= new FormGroup({})) as FormGroup);
          parent.addControl(key, this.createFormControl(schema, model));
        } else {
          controls[schema.key!.toString()] = this.createFormControl(schema, model);
        }
      }

      return controls;
    }, {} as Record<string, AbstractControl>);
  }

  createFormArray(schema: AbstractFormArraySchema, model: AnyArray): FormArray {
    const controls = this.createFormArrayElements(schema.schemas, model);
    const validators: ValidatorFn[] = schema.validators ?? [];

    if (schema.length) {
      validators.push(Validators.required);
      if (isNumber(schema.length)) {
        validators.push(
          Validators.minLength(schema.length),
          Validators.maxLength(schema.length),
        );
      } else {
        if (schema.length.min) {
          validators.push(Validators.minLength(schema.length.min));
        }
        if (schema.length.max) {
          validators.push(Validators.maxLength(schema.length.max));
        }
      }
    }

    return new FormArray<SafeAny>(controls, {
      validators,
      asyncValidators: schema.asyncValidators,
      updateOn: schema.updateOn
    });
  }

  createFormArrayElements(schemas: Indexable<AbstractSchema>[], model: AnyArray) {
    // 只拿第一个，其他的忽略
    const [schema] = this.schemaUtil.filterControls(schemas);

    if (!schema) {
      throw Error('FormArray element control schema not found');
    }

    return model.map((_, index) => {
      return this.createAnyControl({ ...schema, key: index }, model);
    });
  }

  createAnyControl(schema: AbstractControlSchema, model: AnyObject | AnyArray): AbstractControl {
    if (this.schemaUtil.isControlGroup(schema)) {
      return this.createFormGroup(schema, (model as AnyObject)[schema.key!] ?? {});
    }

    if (this.schemaUtil.isControlArray(schema)) {
      return this.createFormArray(schema, (model as AnyArray)[schema.key as number] ?? []);
    }

    return this.createFormControl(schema, model);
  }

  /**
   * Update the form state, currently includes:
   * - Updating validators
   * - Updating status - enabled / disabled
   * - Updating value
   * @param form
   * @param model
   * @param schemas
   */
  updateForm(form: FormGroup, model: AnyObject, schemas: AbstractSchema[]): void;
  updateForm(form: FormArray, model: AnyArray, schemas: AbstractSchema[]): void;
  updateForm(form: FormGroup | FormArray, model: AnyObject, schemas: AbstractSchema[]): void {
    for (const schema of schemas) {
      if (this.schemaUtil.isControlGroup(schema)) {
        const key = schema.key!;
        const formGroup = getChildControl(form, key) as FormGroup;

        this.updateForm(formGroup, model[key], schema.schemas);
        continue;
      }

      if (this.schemaUtil.isControlArray(schema)) {
        const key = schema.key!;
        const formArray = getChildControl(form, key) as FormArray;
        const [elementSchema] = this.schemaUtil.filterControls(schema.schemas);
        const elementSchemas = formArray.controls.map((_, index) => ({ ...elementSchema, key: index }));

        this.updateForm(formArray, model[schema.key!], elementSchemas);
        continue;
      }

      if (this.schemaUtil.isControlWrapper(schema) || this.schemaUtil.isComponentContainer(schema)) {
        this.updateForm(form as FormGroup, model, schema.schemas);
        continue;
      }

      if (this.schemaUtil.isControl(schema)) {
        const control = getChildControl(form, schema.key!)!;

        if (schema.value) {
          const value = this.valueTransformer.transform(schema.value, { model, schema, control });
          control.setValue(value, { onlySelf: true });
        }
        // update disabled
        const disabled = this.valueTransformer.transform(schema.disabled, { model, schema, control });
        if (control.enabled !== !disabled) { // Update only if inconsistent
          if (disabled) {
            // Using `onlySelf: true` here instead of `emitEvent: false` because the
            // control's own value/statusChanges events need to trigger properly.
            control.disable({ onlySelf: true });
          } else {
            control.enable({ onlySelf: true });
          }
        }
        // update required validator
        const required = this.valueTransformer.transform(schema.required, { model, schema, control });
        if (required) {
          control.addValidators(Validators.required);
        } else {
          control.removeValidators(Validators.required);
        }

        control.updateValueAndValidity({ emitEvent: false });
      }
    }
  }

  /**
   * 从 form 赋值到 model
   * @param model
   * @param form
   * @param schemas
   */
  updateModel(model: AnyObject, form: FormGroup, schemas: AbstractSchema[]): AnyObject;
  updateModel(model: AnyArray, form: FormArray, schemas: AbstractSchema[]): AnyArray;
  updateModel(model: AnyObject, form: FormGroup | FormArray, schemas: AbstractSchema[]): AnyObject | AnyArray {
    for (const schema of schemas) {
      if (this.schemaUtil.isControlGroup(schema)) {
        const key = schema.key!;
        const formGroup = getChildControl(form, key) as FormGroup;

        this.updateModel(model[key] = {}, formGroup, schema.schemas);
        continue;
      }

      if (this.schemaUtil.isControlArray(schema)) {
        const key = schema.key!;
        const formArray = getChildControl(form, key) as FormArray;
        const [elementSchema] = this.schemaUtil.filterControls(schema.schemas);
        const elementSchemas = formArray.controls.map((_, index) => ({ ...elementSchema, key: index }));

        this.updateModel(model[key] = [], formArray, elementSchemas);
        continue;
      }

      if (this.schemaUtil.isControlWrapper(schema) || this.schemaUtil.isComponentContainer(schema)) {
        this.updateModel(model, form as FormGroup, schema.schemas);
        continue;
      }

      if (this.schemaUtil.isControl(schema)) {
        const key = schema.key!.toString();
        const control = getChildControl(form, key)!;
        const disabled = this.valueTransformer.transform(schema.disabled, { model, schema, control });

        // skip disabled controls
        if (disabled) continue;

        const value = this.valueUtil.valueOfControl(control, schema);

        // 多字段情况
        if (this.schemaUtil.isMultiKeySchema(schema)) {
          (schema.key as string[]).map((prop, idx) => {
            model[prop] = (value as [unknown, unknown])?.[idx] ?? null;
          });
        } else if (this.schemaUtil.isPathKeySchema(schema)) {
          const paths = this.schemaUtil.parsePathKey(schema.key as string);
          let _model = model;
          for (let i = 0; i < paths.length - 1; i++) {
            const path = paths[i];
            _model = _model[path] ??= {};
          }
          _model[paths.pop()!] = value;
        } else {
          model[key] = value;
        }
      }
    }

    return model;
  }
}

/**
 * Automatically choose to use `.get()` or `.at()` to get a child control
 * based on the type of the form.
 * @param form
 * @param key
 * @returns
 */
export function getChildControl(form: FormGroup | FormArray, key: SchemaKey): AbstractControl | null {
  return form instanceof FormArray ? form.at(key as number) : form.get(key.toString() as string);
}
