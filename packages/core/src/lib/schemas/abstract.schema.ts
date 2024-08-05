import { NgStyle } from '@angular/common';
import { FluentColDirective } from '../directives';
import { Indexable } from '../types';
import { Column, MaybeSchemaReactiveFn, SchemaLike } from './interfaces';
import { SchemaKey } from './types';

/**
 * @public
 * 抽象图示
 */
export interface AbstractSchema<Key extends SchemaKey = SchemaKey> extends SchemaLike<Key> {
  /* Used to define the width of the control. */
  col?: Column | FluentColDirective['span'];
  hidden?: MaybeSchemaReactiveFn<AbstractSchema, boolean>;
  class?: null | string | string[] | { [className: string]: boolean | undefined | null };
  style?: NgStyle['ngStyle'];
}

/**
 * @public
 */
export interface AbstractBranchSchema<Key extends SchemaKey = SchemaKey> extends AbstractSchema<Key> {
  schemas: Indexable<AbstractSchema>[];
}
