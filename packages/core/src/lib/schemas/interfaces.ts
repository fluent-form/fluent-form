import { AbstractControl } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { AbstractSchema } from './abstract.schema';
import { SchemaKey } from './types';

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
  Headful = 'headful',
  Template = 'template',
  Row = 'row'
}

export interface SchemaLike<Key extends SchemaKey = SchemaKey> {
  kind: string;
  key?: Key;
}

export interface SchemaContext<S extends SchemaLike = AbstractSchema> {
  schema: S;
  /** 如果当前没有对应的 control，会返回上一级的 control，这时候一般是 form group/array */
  control: AbstractControl;
  model: SafeAny;
}

export type Length = number | { max?: number, min?: number };

export type SchemaReactiveFn<S extends AbstractSchema, R> = (ctx: SchemaContext<S>) => R;

export type MaybeSchemaReactiveFn<S extends AbstractSchema, R> = R | SchemaReactiveFn<S, R>;

export type WithoutSchemaReactiveFn<T extends MaybeSchemaReactiveFn<AbstractSchema, SafeAny>> = Exclude<T, SchemaReactiveFn<SafeAny, SafeAny>>;
