import { inject, Injectable } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormArraySchema, FormGroupSchema } from '../schemas';
import { AnyControlSchema, AnySchema } from '../schemas/index.schema';
import { StandardSchema } from '../schemas/types';
import { ValueTransformer } from '../services';
import { Model } from '../types';
import { isUndefined } from './is.utils';
import { controlSchemaUtils, isComponentContainerSchema, isControlWrapperSchema, isDoubleKeyControlSchema, isNonControlSchema } from './schema.utils';
import { ValueUtil } from './value.utils';

/**
 * 将图示转换为控件
 * @param schema
 */
export function createFormControl(schema: StandardSchema<AnyControlSchema>): FormControl {
  const validators = controlSchemaUtils(schema).getExtraValidators();

  return new FormControl(
    // 如果有传入映射器，则默认值也需要经过映射
    schema.mapper ? schema.mapper.input(schema.defaultValue) : schema.defaultValue,
    {
      nonNullable: !isUndefined(schema.defaultValue),
      validators: schema.validators ? validators.concat(schema.validators) : validators,
      asyncValidators: schema.asyncValidators,
      updateOn: schema.updateOn
    }
  );
}

/**
 * 创建 FormGroup 的 FormControl 配置
 * @internal
 * @param schemas
 * @param controls
 */
function createFormControls(schemas: StandardSchema<AnySchema>[], controls: Record<string, AbstractControl> = {}) {
  return schemas.reduce((controls, schema) => {
    if (isNonControlSchema(schema)) {
      return controls;
    }

    if (schema.kind === 'group') {
      controls[schema.name!.toString()] = createFormGroup(schema);
    } else if (schema.kind === 'array') {
      controls[schema.name!.toString()] = createFormArray(schema);
    } else if (isControlWrapperSchema(schema) || isComponentContainerSchema(schema)) {
      createFormControls(schema.schemas, controls);
    } else {
      controls[schema.name!.toString()] = createFormControl(schema);
    }

    return controls;
  }, controls);
}

/**
 * 将图示组转换为表单组
 * @param schema
 */
export function createFormGroup(schema: StandardSchema<FormGroupSchema>): FormGroup;
/**
 * 将图示组转换为表单组
 * @param schemas
 */
export function createFormGroup(schemas: | StandardSchema<AnySchema>[]): FormGroup;
export function createFormGroup(schemaOrSchemas: StandardSchema<FormGroupSchema> | StandardSchema<AnySchema>[]): FormGroup;
export function createFormGroup(schemaOrSchemas: StandardSchema<FormGroupSchema> | StandardSchema<AnySchema>[]): FormGroup {
  let schemas: StandardSchema<AnySchema>[], options: AbstractControlOptions = {};

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

  return new FormGroup(createFormControls(schemas), options);
}

/**
 * 将图示组转换为表单数组
 * @param schema
 */
export function createFormArray(schema: StandardSchema<FormArraySchema>): FormArray {
  return new FormArray(
    schema.schemas.map(schema => {
      switch (schema.kind) {
        case 'group':
          return createFormGroup(schema);

        case 'array':
          return createFormArray(schema);

        default:
          return createFormControl(schema);
      }
    }),
    {
      validators: schema.validators,
      asyncValidators: schema.asyncValidators,
      updateOn: schema.updateOn
    }
  );
}

@Injectable({
  providedIn: 'root'
})
export class FormUtil {
  private readonly valueUtil = inject(ValueUtil);
  private readonly valueTransformer = inject(ValueTransformer);

  updateForm<F extends FormGroup | FormArray, M extends Model<F>>(form: F, schemas: StandardSchema<AnySchema>[], model: M) {
    schemas.forEach(schema => {
      // 这些图示不包含控件图示，直接跳过
      if (isNonControlSchema(schema)) { return; }

      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      const control = form.get([schema.name?.toString()!])!;

      if (schema.kind === 'group') {
        return this.updateForm(control as FormGroup, schema.schemas, model[schema.name as keyof M] as Model<FormGroup>);
      }

      if (schema.kind === 'array') {
        return this.updateForm(control as FormArray, schema.schemas, model[schema.name as keyof M] as Model<FormArray>);
      }

      if (isControlWrapperSchema(schema) || isComponentContainerSchema(schema)) {
        return this.updateForm(form, schema.schemas, model);
      }

      const disabled = this.valueTransformer.transform(
        schema.disabled,
        { model, schema, control }
      );

      if (disabled !== control.disabled) {
        const options = { emitEvent: false };
        disabled ? control.disable(options) : control.enable(options);
      }
    });
  }

  updateModel<F extends FormGroup | FormArray, M extends Model<F>>(form: F, schemas: StandardSchema<AnySchema>[], model: M) {
    schemas.forEach(schema => {
      // 这些图示不包含控件图示，直接跳过
      if (isNonControlSchema(schema)) return;

      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      const control = form.get([schema.name?.toString()!])!;

      if (schema.kind === 'group') {
        this.updateModel(
          control as FormGroup,
          schema.schemas,
          (model[schema.name as keyof M] = {} as M[keyof M]) as Model<FormGroup>,
        );
        return;
      }

      if (schema.kind === 'array') {
        this.updateModel(
          control as FormArray,
          schema.schemas,
          (model[schema.name as keyof M] = [] as M[keyof M]) as Model<FormArray>,
        );
        return;
      }

      if (isControlWrapperSchema(schema) || isComponentContainerSchema(schema)) {
        this.updateModel(form, schema.schemas, model);
        return;
      }

      const value = this.valueUtil.valueOfControl(control, schema);

      // 双字段情况
      if (isDoubleKeyControlSchema(schema)) {
        schema.name!.map((prop, idx) => {
          model[prop as keyof M] = ((value as [unknown, unknown])?.[idx] ?? null) as M[keyof M];
        });
      } else {
        model[schema.name as keyof M] = value as M[keyof M];
      }
    });

    return model;
  }
}
