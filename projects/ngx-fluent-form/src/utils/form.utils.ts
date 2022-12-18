import { AbstractControl, AbstractControlOptions, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { FluentCallPipe } from '../pipes/call.pipe';
import { FormArraySchema, FormGroupSchema } from '../schemas';
import { AnyControlSchema, AnySchema, ControlSchema } from '../schemas/index.schema';
import { AnyArray, AnyObject } from '../types';
import { controlSchemaUtils, isComponentContainerSchema, isComponentSchema, isControlContainerSchema, isDoubleKeySchema } from './schema.utils';
import { valueUtils } from './value.utils';

/**
 * 将图示转换为控件
 * @param schema
 */
export function createFormControl(schema: ControlSchema): UntypedFormControl {
  const validators = controlSchemaUtils(schema).getExtraValidators();

  return new UntypedFormControl(
    // 如果有传入映射器，则默认值也需要经过映射
    schema.mapper ? schema.mapper.input(schema.defaultValue) : schema.defaultValue,
    {
      initialValueIsDefault: schema.defaultValue !== undefined,
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
  return schemas.filter(o => !isComponentSchema(o) && !isComponentContainerSchema(o)).reduce((controls, schema) => {
    switch (schema.type) {
      case 'group':
        controls[schema.name!.toString()] = createFormGroup(schema);
        break;

      case 'array':
        controls[schema.name!.toString()] = createFormArray(schema);
        break;

      case 'step':
      case 'steps':
      case 'tabset':
      case 'tab':
      case 'input-group':
        createFormControls(schema.schemas as AnySchema[], controls);
        break;

      default:
        controls[schema.name!.toString()] = createFormControl(schema as ControlSchema);
    }

    return controls;
  }, controls);
}

/**
 * 将图示组转换为表单组
 * @param schema
 */
export function createFormGroup(schema: FormGroupSchema): UntypedFormGroup;
/**
 * 将图示组转换为表单组
 * @param schemas
 */
export function createFormGroup(schemas: | AnySchema[]): UntypedFormGroup;
export function createFormGroup(schemaOrSchemas: FormGroupSchema | AnySchema[]): UntypedFormGroup;
export function createFormGroup(schemaOrSchemas: FormGroupSchema | AnySchema[]): UntypedFormGroup {
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

  return new UntypedFormGroup(createFormControls(schemas), options);
}

/**
 * 将图示组转换为表单数组
 * @param schema
 */
export function createFormArray(schema: FormArraySchema): UntypedFormArray {
  return new UntypedFormArray(
    (schema.schemas as AnyControlSchema[]).map(schema => {
      switch (schema.type) {
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

export function formUtils<F extends UntypedFormGroup | UntypedFormArray>(form: F, schemas: AnySchema[]) {
  return new FormUtils(form, schemas);
}

const callPipe = new FluentCallPipe();

export class FormUtils<F extends UntypedFormGroup | UntypedFormArray> {
  constructor(
    private readonly form: F,
    private readonly schemas: AnySchema[],
  ) { }

  /**
   * 将表单值分配到模型
   * @param model
   * @returns model
   */
  assign<T extends (F extends UntypedFormGroup ? AnyObject : AnyArray)>(model: T): T {
    this.schemas.forEach(schema => {
      // 这些图示不包含控件图示，直接跳过
      if (isComponentSchema(schema) || isComponentContainerSchema(schema)) { return; }

      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      const control = this.form.get([schema.name?.toString()!])!;

      if (schema.type === 'group') {
        formUtils(control as UntypedFormGroup, schema.schemas as AnySchema[]).assign(
          (model[schema.name as keyof T] = {} as T[keyof T]) as AnyObject,
        );
        return;
      }

      if (schema.type === 'array') {
        formUtils(control as UntypedFormArray, schema.schemas as AnySchema[]).assign(
          (model[schema.name as keyof T] = [] as T[keyof T]) as AnyArray,
        );
        return;
      }

      if (isControlContainerSchema(schema)) {
        formUtils(this.form, schema.schemas as AnySchema[]).assign(model);
        return;
      }

      const value = valueUtils(control, schema).getValue();

      // 双字段情况
      if (isDoubleKeySchema(schema)) {
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
      if (isComponentSchema(schema) || isComponentContainerSchema(schema)) { return; }

      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      const control = this.form.get([schema.name?.toString()!])!;

      if (schema.type === 'group') {
        return formUtils(control as UntypedFormGroup, schema.schemas as AnySchema[]).change(model[schema.name as keyof T]);
      }

      if (schema.type === 'array') {
        return formUtils(control as UntypedFormArray, schema.schemas as AnySchema[]).change(model[schema.name as keyof T]);
      }

      if (isControlContainerSchema(schema)) {
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
