import { inject, Injectable } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormArray, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { FormArraySchema, FormGroupSchema, StandardSchema } from '../schemas';
import { AnyControlSchema, AnySchema } from '../schemas/index.schema';
import { ValueTransformer } from '../services';
import { Model } from '../types';
import { isUndefined } from './is.utils';
import { isDoubleKeyControlSchema, SchemaUtil } from './schema.utils';
import { ValueUtil } from './value.utils';

@Injectable({
  providedIn: 'root'
})
export class FormUtil {
  private readonly schemaUtil = inject(SchemaUtil);
  private readonly valueUtil = inject(ValueUtil);
  private readonly valueTransformer = inject(ValueTransformer);

  updateForm<F extends FormGroup | FormArray, M extends Model<F>>(form: F, schemas: StandardSchema<AnySchema>[], model: M) {
    schemas.forEach(schema => {
      // 这些图示不包含控件图示，直接跳过
      if (this.schemaUtil.isNonControlSchema(schema)) { return; }

      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      const control = form.get([schema.key?.toString()!])!;

      if (schema.kind === 'group') {
        return this.updateForm(control as FormGroup, schema.schemas, model[schema.key as keyof M] as Model<FormGroup>);
      }

      if (schema.kind === 'array') {
        return this.updateForm(control as FormArray, schema.schemas, model[schema.key as keyof M] as Model<FormArray>);
      }

      if (this.schemaUtil.isControlWrapperSchema(schema) || this.schemaUtil.isComponentContainerSchema(schema)) {
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
      if (this.schemaUtil.isNonControlSchema(schema)) return;

      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      const control = form.get([schema.key?.toString()!])!;

      if (schema.kind === 'group') {
        this.updateModel(
          control as FormGroup,
          schema.schemas,
          (model[schema.key as keyof M] = {} as M[keyof M]) as Model<FormGroup>,
        );
        return;
      }

      if (schema.kind === 'array') {
        this.updateModel(
          control as FormArray,
          schema.schemas,
          (model[schema.key as keyof M] = [] as M[keyof M]) as Model<FormArray>,
        );
        return;
      }

      if (this.schemaUtil.isControlWrapperSchema(schema) || this.schemaUtil.isComponentContainerSchema(schema)) {
        this.updateModel(form, schema.schemas, model);
        return;
      }

      const value = this.valueUtil.valueOfControl(control, schema);

      // 双字段情况
      if (isDoubleKeyControlSchema(schema)) {
        schema.key!.map((prop, idx) => {
          model[prop as keyof M] = ((value as [unknown, unknown])?.[idx] ?? null) as M[keyof M];
        });
      } else {
        model[schema.key as keyof M] = value as M[keyof M];
      }
    });

    return model;
  }

  createFormGroup(schema: StandardSchema<FormGroupSchema>): FormGroup;
  createFormGroup(schemas: StandardSchema<AnySchema>[]): FormGroup;
  createFormGroup(schemaOrSchemas: StandardSchema<FormGroupSchema> | StandardSchema<AnySchema>[]): FormGroup;
  createFormGroup(schemaOrSchemas: StandardSchema<FormGroupSchema> | StandardSchema<AnySchema>[]): FormGroup {
    let schemas: StandardSchema<AnySchema>[];
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

    return new FormGroup(this.createFormControls(schemas), options);
  }

  createFormArray(schema: StandardSchema<FormArraySchema>): FormArray {
    return new FormArray(
      schema.schemas.map(schema => {
        switch (schema.kind) {
          case 'group':
            return this.createFormGroup(schema);

          case 'array':
            return this.createFormArray(schema);

          default:
            return this.createFormControl(schema);
        }
      }),
      {
        validators: schema.validators,
        asyncValidators: schema.asyncValidators,
        updateOn: schema.updateOn
      }
    );
  }

  createFormControl(schema: StandardSchema<AnyControlSchema>): FormControl {
    const validators: ValidatorFn[] = this.schemaUtil.validatorsOf(schema);

    return new FormControl(
      // 如果有传入映射器，则默认值也需要经过映射
      schema.mapper ? schema.mapper.parser(schema.defaultValue) : schema.defaultValue,
      {
        nonNullable: !isUndefined(schema.defaultValue),
        validators: schema.validators ? validators.concat(schema.validators) : validators,
        asyncValidators: schema.asyncValidators,
        updateOn: schema.updateOn
      }
    );
  }

  createFormControls(schemas: StandardSchema<AnySchema>[], controls: Record<string, AbstractControl> = {}) {
    return schemas.reduce((controls, schema) => {
      if (this.schemaUtil.isNonControlSchema(schema)) {
        return controls;
      }

      if (schema.kind === 'group') {
        controls[schema.key!.toString()] = this.createFormGroup(schema);
      } else if (schema.kind === 'array') {
        controls[schema.key!.toString()] = this.createFormArray(schema);
      } else if (this.schemaUtil.isControlWrapperSchema(schema) || this.schemaUtil.isComponentContainerSchema(schema)) {
        this.createFormControls(schema.schemas, controls);
      } else {
        controls[schema.key!.toString()] = this.createFormControl(schema);
      }

      return controls;
    }, controls);
  }
}
