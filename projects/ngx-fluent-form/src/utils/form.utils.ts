import { AbstractControl, AbstractControlOptions, FormArray, FormControl, FormGroup } from '@angular/forms';
import { FluentCallPipe } from '../pipes/call.pipe';
import { FormArraySchema, FormGroupSchema } from '../schemas';
import { AnyControlOrControlContainerSchema, AnyControlSchema, AnySchema } from '../schemas/index.schema';
import { AnyArray, AnyObject } from '../types';
import { controlSchemaUtils, isComponentContainerSchema, isComponentSchema, isComponentWrapperSchema, isControlContainerSchema, isControlWrapperSchema, isDoubleKeyControlSchema } from './schema.utils';
import { valueUtils } from './value.utils';

/**
 * 将图示转换为控件
 * @param schema
 */
export function createFormControl(schema: AnyControlSchema): FormControl {
  const validators = controlSchemaUtils(schema).getExtraValidators();

  return new FormControl(
    // 如果有传入映射器，则默认值也需要经过映射
    schema.mapper ? schema.mapper.input(schema.defaultValue) : schema.defaultValue,
    {
      nonNullable: schema.defaultValue !== undefined,
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
function createFormControls(schemas: AnySchema[], controls: Record<string, AbstractControl> = {}) {
  return schemas.reduce((controls, schema) => {
    if (isComponentSchema(schema) || isComponentWrapperSchema(schema)) {
      return controls;
    }

    if (schema.kind === 'group') {
      controls[schema.name!.toString()] = createFormGroup(schema);
    } else if (schema.kind === 'array') {
      controls[schema.name!.toString()] = createFormArray(schema);
    } else if (isControlWrapperSchema(schema) || isComponentContainerSchema(schema)) {
      createFormControls(schema.schemas as AnySchema[], controls);
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
export function createFormGroup(schema: FormGroupSchema): FormGroup;
/**
 * 将图示组转换为表单组
 * @param schemas
 */
export function createFormGroup(schemas: | AnySchema[]): FormGroup;
export function createFormGroup(schemaOrSchemas: FormGroupSchema | AnySchema[]): FormGroup;
export function createFormGroup(schemaOrSchemas: FormGroupSchema | AnySchema[]): FormGroup {
  let schemas: AnySchema[], options: AbstractControlOptions = {};

  if (Array.isArray(schemaOrSchemas)) {
    schemas = schemaOrSchemas;
  } else {
    schemas = schemaOrSchemas.schemas as AnySchema[];
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
export function createFormArray(schema: FormArraySchema): FormArray {
  return new FormArray(
    (schema.schemas as AnyControlOrControlContainerSchema[]).map(schema => {
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

export function formUtils<F extends FormGroup | FormArray>(form: F, schemas: AnySchema[]) {
  return new FormUtils(form, schemas);
}

const callPipe = new FluentCallPipe();

export class FormUtils<F extends FormGroup | FormArray> {
  constructor(
    private readonly form: F,
    private readonly schemas: AnySchema[],
  ) { }

  /**
   * 将表单值分配到模型
   * @param model
   * @returns model
   */
  assign<T extends (F extends FormGroup ? AnyObject : AnyArray)>(model: T): T {
    this.schemas.forEach(schema => {
      // 这些图示不包含控件图示，直接跳过
      if (isComponentSchema(schema) || isComponentWrapperSchema(schema)) { return; }

      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      const control = this.form.get([schema.name?.toString()!])!;

      if (schema.kind === 'group') {
        formUtils(control as FormGroup, schema.schemas as AnySchema[]).assign(
          (model[schema.name as keyof T] = {} as T[keyof T]) as AnyObject,
        );
        return;
      }

      if (schema.kind === 'array') {
        formUtils(control as FormArray, schema.schemas as AnySchema[]).assign(
          (model[schema.name as keyof T] = [] as T[keyof T]) as AnyArray,
        );
        return;
      }

      if (isControlContainerSchema(schema) || isControlWrapperSchema(schema) || isComponentContainerSchema(schema)) {
        formUtils(this.form, schema.schemas as AnySchema[]).assign(model);
        return;
      }

      const value = valueUtils(control, schema).getValue();

      // 双字段情况
      if (isDoubleKeyControlSchema(schema)) {
        schema.name!.map((prop, idx) => {
          model[prop as keyof T] = ((value as [unknown, unknown])?.[idx] ?? null) as T[keyof T];
        });
      } else {
        model[schema.name as keyof T] = value as T[keyof T];
      }
    });

    return model;
  }

  /**
   * 更新表单控件状态，目前只有 disabled 选项
   * @param model
   */
  change<T>(model: T) {
    this.schemas.forEach(schema => {
      // 这些图示不包含控件图示，直接跳过
      if (isComponentSchema(schema) || isComponentWrapperSchema(schema)) { return; }

      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      const control = this.form.get([schema.name?.toString()!])!;

      if (schema.kind === 'group') {
        return formUtils(control as FormGroup, schema.schemas as AnySchema[]).change(model[schema.name as keyof T]);
      }

      if (schema.kind === 'array') {
        return formUtils(control as FormArray, schema.schemas as AnySchema[]).change(model[schema.name as keyof T]);
      }

      if (isControlContainerSchema(schema) || isControlWrapperSchema(schema) || isComponentContainerSchema(schema)) {
        return formUtils(this.form, schema.schemas as AnySchema[]).change(model);
      }

      const disabled = callPipe.transform(
        schema.disabled,
        model,
        schema,
        control
      );

      if (disabled !== control.disabled) {
        const options = { emitEvent: false };
        disabled ? control.disable(options) : control.enable(options);
      }
    });
  }

}
