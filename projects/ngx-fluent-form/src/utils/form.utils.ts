import { inject, Injectable } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AnyArray, AnyObject, SafeAny } from '@ngify/types';
import { FormArraySchema, FormGroupSchema } from '../schemas';
import { AnyControlContainerSchema, AnyControlSchema, AnySchema } from '../schemas/index.schema';
import { SchemaKind } from '../schemas/interfaces';
import { ValueTransformer } from '../services';
import { isUndefined } from './is.utils';
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

  createFormControl(schema: AnyControlSchema, model: AnyObject): FormControl {
    const validators: ValidatorFn[] = this.schemaUtil.validatorsOf(schema);
    const value = this.valueUtil.valueOfModel(model, schema) ?? schema.defaultValue;

    return new FormControl(value, {
      nonNullable: !isUndefined(schema.defaultValue),
      validators: schema.validators ? validators.concat(schema.validators) : validators,
      asyncValidators: schema.asyncValidators,
      updateOn: schema.updateOn
    });
  }

  createFormGroup(schema: FormGroupSchema, model: AnyObject): FormGroup;
  createFormGroup(schemas: AnySchema[], model: AnyObject): FormGroup;
  createFormGroup(schemaOrSchemas: FormGroupSchema | AnySchema[], model: AnyObject): FormGroup;
  createFormGroup(schemaOrSchemas: FormGroupSchema | AnySchema[], model: AnyObject): FormGroup {
    let schemas: AnySchema[];
    let options: AbstractControlOptions = {};

    if (Array.isArray(schemaOrSchemas)) {
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

  private createControlMap(schemas: AnySchema[], model: AnyObject) {
    return schemas.reduce((controls, schema) => {
      if (this.schemaUtil.isNonControl(schema)) {
        return controls;
      }

      if (schema.kind === SchemaKind.Group) {
        const key = schema.key!.toString();
        controls[key] = this.createFormGroup(schema, model[key] ?? {});
      } else if (schema.kind === SchemaKind.Array) {
        const key = schema.key!.toString();
        controls[key] = this.createFormArray(schema, model[key] ?? []);
      } else if (this.schemaUtil.isControlWrapper(schema) || this.schemaUtil.isComponentContainer(schema)) {
        Object.assign(controls, this.createControlMap(schema.schemas, model));
      } else {
        controls[schema.key!.toString()] = this.createFormControl(schema, model);
      }

      return controls;
    }, {} as Record<string, AbstractControl>);
  }

  createFormArray(schema: FormArraySchema, model: AnyArray): FormArray {
    const controls = this.createFormArrayElements(schema.schemas, model);

    return new FormArray<SafeAny>(controls, {
      validators: schema.validators,
      asyncValidators: schema.asyncValidators,
      updateOn: schema.updateOn
    });
  }

  createFormArrayElements(schemas: AnySchema[], model: AnyArray) {
    // 只拿第一个，其他的忽略
    const [schema] = this.schemaUtil.filterControls(schemas);

    if (!schema) {
      throw Error('FormArray element control schema not found');
    }

    return model.map((_, index) => {
      return this.createAnyControl({ ...schema, key: index }, model);
    });
  }

  createAnyControl(schema: AnyControlSchema, model: AnyObject): FormControl;
  createAnyControl(schema: FormGroupSchema, model: AnyObject): FormGroup;
  createAnyControl(schema: FormArraySchema, model: AnyArray): FormArray;
  createAnyControl(schema: AnyControlSchema | AnyControlContainerSchema, model: AnyObject | AnyArray): AbstractControl;
  createAnyControl(schema: AnyControlSchema | AnyControlContainerSchema, model: AnyObject | AnyArray): AbstractControl {
    switch (schema.kind) {
      case SchemaKind.Group:
        return this.createFormGroup(schema, (model as AnyObject)[schema.key!] ?? {});

      case SchemaKind.Array:
        return this.createFormArray(schema, (model as AnyArray)[schema.key as number] ?? []);

      default:
        return this.createFormControl(schema as AnyControlSchema, model);
    }
  }

  /**
   * 更新表单状态，目前包括更新 validator 与 enabled / disabled
   * @param form
   * @param model
   * @param schemas
   * @param completed
   */
  updateForm(form: FormGroup, model: AnyObject, schemas: AnySchema[], completed?: boolean): void;
  updateForm(form: FormArray, model: AnyArray, schemas: AnySchema[], completed?: boolean): void;
  updateForm(form: FormGroup | FormArray, model: AnyObject, schemas: AnySchema[], completed = true): void {
    for (const schema of schemas) {
      // 这些图示不包含控件图示，直接跳过
      if (this.schemaUtil.isNonControl(schema)) continue;

      if (schema.kind === SchemaKind.Group) {
        const key = schema.key!;
        const formGroup = form.get([key]) as FormGroup;

        this.updateForm(formGroup, model[key], schema.schemas, false);
        continue;
      }

      if (schema.kind === SchemaKind.Array) {
        const key = schema.key!;
        const formArray = form.get([key]) as FormArray;
        const [elementSchema] = this.schemaUtil.filterControls(schema.schemas);
        const elementSchemas = formArray.controls.map((_, index) => ({ ...elementSchema, key: index }));

        this.updateForm(formArray, model[schema.key!], elementSchemas, false);
        continue;
      }

      if (this.schemaUtil.isControlWrapper(schema) || this.schemaUtil.isComponentContainer(schema)) {
        this.updateForm(form as FormGroup, model, schema.schemas, false);
        continue;
      }

      const control = form.get([schema.key!.toString()])!;

      // update disabled
      const disabled = this.valueTransformer.transform(schema.disabled, { model, schema, control });
      if (control.enabled !== !disabled) { // 不一致才更新
        if (disabled) {
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
    }

    completed && form.updateValueAndValidity({ emitEvent: false });
  }

  /**
   * 从 form 赋值到 model
   * @param model
   * @param form
   * @param schemas
   */
  updateModel(model: AnyObject, form: FormGroup, schemas: AnySchema[]): AnyObject;
  updateModel(model: AnyArray, form: FormArray, schemas: AnySchema[]): AnyArray;
  updateModel(model: AnyObject, form: FormGroup | FormArray, schemas: AnySchema[]): AnyObject | AnyArray {
    for (const schema of schemas) {
      // 这些图示不包含控件图示，直接跳过
      if (this.schemaUtil.isNonControl(schema)) continue;

      if (schema.kind === SchemaKind.Group) {
        const key = schema.key!;
        const formGroup = form.get([key]) as FormGroup;

        this.updateModel(model[key] = {}, formGroup, schema.schemas);
        continue;
      }

      if (schema.kind === SchemaKind.Array) {
        const key = schema.key!;
        const formArray = form.get([key]) as FormArray;
        const [elementSchema] = this.schemaUtil.filterControls(schema.schemas);
        const elementSchemas = formArray.controls.map((_, index) => ({ ...elementSchema, key: index }));

        this.updateModel(model[key] = [], formArray, elementSchemas);
        continue;
      }

      if (this.schemaUtil.isControlWrapper(schema) || this.schemaUtil.isComponentContainer(schema)) {
        this.updateModel(model, form as FormGroup, schema.schemas);
        continue;
      }

      const key = schema.key!.toString();
      const control = form.get([key])!;
      const value = this.valueUtil.valueOfControl(control, schema);

      // 多字段情况
      if (this.schemaUtil.isMultiKeyControl(schema)) {
        (schema.key as string[]).map((prop, idx) => {
          model[prop] = (value as [unknown, unknown])?.[idx] ?? null;
        });
      } else {
        model[key] = value;
      }
    }

    return model;
  }
}
