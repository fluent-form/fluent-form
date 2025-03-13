import { SafeAny } from '@ngify/types';
import { AbstractControlContainerSchema, AbstractFormGroupSchema, AbstractSchema } from '../schemas';
import { Indexable } from '../types';
import { isArray, isFunction } from '../utils';
import { StableBuilder, composeBuilder } from './builder';

export function form(composeFn: FormComposeFn): AbstractFormGroupSchema;
export function form(schemas: Indexable<AbstractSchema>[]): AbstractFormGroupSchema;
export function form(builder: StableBuilder<AbstractControlContainerSchema>): AbstractFormGroupSchema;
export function form(fnOrSchemasOrBuilder: Indexable<AbstractSchema>[] | FormComposeFn | StableBuilder<AbstractControlContainerSchema>): AbstractFormGroupSchema {
  if (isArray(fnOrSchemasOrBuilder)) {
    return {
      kind: 'group',
      key: 'root',
      schemas: fnOrSchemasOrBuilder,
    };
  }

  if (isFunction(fnOrSchemasOrBuilder)) {
    return composeBuilder<AbstractFormGroupSchema>()
      .kind('group')
      .key('root')
      .schemas(fnOrSchemasOrBuilder)
      .build();
  }

  const scheam = fnOrSchemasOrBuilder.build() as AbstractFormGroupSchema;
  scheam.key = 'root';

  return scheam;
}

type FormComposeFn = () => SafeAny;
