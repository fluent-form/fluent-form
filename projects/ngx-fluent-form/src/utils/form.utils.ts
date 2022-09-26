import { AbstractControl, AbstractControlOptions, FormArray, FormControl, FormGroup } from '@angular/forms';
import { CallPipe } from '../pipes/call.pipe';
import { FormArraySchema, FormGroupSchema } from '../schemas';
import { AnyControlSchema, AnySchema, ControlSchema } from '../schemas/index.schema';
import { Arr, Obj } from '../types';
import { controlSchemaUtils, isComponentContainerSchema, isComponentSchema, isControlContainerSchema, isDoubleKeySchema } from './schema.utils';
import { valueUtils } from './value.utils';

/**
 * 将图示转换为控件
 * @param schema
 */
export function createFormControl(schema: ControlSchema): FormControl {
  const validators = controlSchemaUtils(schema).getExtraValidators();

  return new FormControl(schema.value, {
    validators: schema.validators ? validators.concat(schema.validators) : validators,
    asyncValidators: schema.asyncValidators,
    updateOn: schema.updateOn
  });
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

/**
 * 删除模型的字段
 * @param model
 * @param schema
 */
function deleteProperty<T>(model: T, schema: AnyControlSchema): T {
  if (isDoubleKeySchema(schema)) {
    schema.name!.forEach(name => delete model[name as keyof T]);
  } else {
    delete model[schema.name!.toString() as keyof T];
  }

  return model;
}

export function formUtils<F extends FormGroup | FormArray>(form: F, schemas: AnySchema[]) {
  return new FormUtils(form, schemas);
}

const callPipe = new CallPipe();

export class FormUtils<F extends FormGroup | FormArray> {
  constructor(
    private readonly form: F,
    private readonly schemas: AnySchema[],
  ) { }

  /**
   * 将表单值分配到模型
   * @param model
   * @param clear 是否清空模型，函数内部递归调用的时候将置为false，保证只会清空一次
   * @returns model
   */
  assign<T extends (F extends FormGroup ? Obj : Arr)>(model: T, clear: boolean = true): T {
    this.schemas.forEach(schema => {
      // 这些图示不包含控件图示，直接跳过
      if (isComponentSchema(schema) || isComponentContainerSchema(schema)) { return; }

      const control = this.form.get([schema.name?.toString()!])!;

      if (schema.type === 'group') {
        formUtils(control as FormGroup, schema.schemas as AnySchema[]).assign(
          (model[schema.name as keyof T] = ({} as T[keyof T])) as unknown as Obj,
          false
        );
        return;
      }

      if (schema.type === 'array') {
        formUtils(control as FormArray, schema.schemas as AnySchema[]).assign(
          (model[schema.name as keyof T] = ([] as unknown as T[keyof T])) as unknown as Arr,
          false
        );
        return;
      }

      if (isControlContainerSchema(schema)) {
        formUtils(this.form, schema.schemas as AnySchema[]).assign(model, false);
        return;
      }

      clear && deleteProperty(model, schema);

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

      const control = this.form.get([schema.name?.toString()!])!;

      if (schema.type === 'group') {
        return formUtils(control as FormGroup, schema.schemas as AnySchema[]).change(model[schema.name as keyof T]);
      }

      if (schema.type === 'array') {
        return formUtils(control as FormArray, schema.schemas as AnySchema[]).change(model[schema.name as keyof T]);
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
