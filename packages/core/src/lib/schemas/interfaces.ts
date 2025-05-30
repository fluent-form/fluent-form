import { AbstractControl } from '@angular/forms';
import type { SafeAny } from '@ngify/types';
import type { AbstractSchema } from './abstract.schema';
import type { SchemaKey } from './types';

/**
 * @public
 */
export enum SchemaType {
  Control,
  ControlGroup,
  ControlArray,
  ControlWrapper,
  Component,
  ComponentContainer,
  ComponentWrapper
}

export const enum SchemaKind {
  Headless = 'headless',
  Headed = 'headed',
  Template = 'template',
  Row = 'row'
}

export interface SchemaLike<Key extends SchemaKey = SchemaKey> {
  kind: string;
  key?: Key;
}

export interface SchemaContext<S extends SchemaLike = AbstractSchema> {
  schema: S;
  /**
   * If there is no corresponding control, the parent control will be returned,
   * usually a `FormGroup` or `FormArray`.
   */
  control: AbstractControl;
  model: SafeAny;
}

export type Length = number | { max?: number, min?: number };

export type SchemaReactiveFn<S extends AbstractSchema, R> = (ctx: SchemaContext<S>) => R;

export type MaybeSchemaReactiveFn<S extends AbstractSchema, R> = R | SchemaReactiveFn<S, R>;

export type WithoutSchemaReactiveFn<T extends MaybeSchemaReactiveFn<AbstractSchema, SafeAny>> = Exclude<T, SchemaReactiveFn<SafeAny, SafeAny>>;
