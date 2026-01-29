import type { AbstractFormArraySchema, AbstractFormGroupSchema, SingleSchemaKey } from '../../schemas';

/**
 * @public
 */
export interface FormGroupSchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractFormGroupSchema<Key> {
  label?: string;
}

export interface FormArraySchema<Key extends SingleSchemaKey = SingleSchemaKey> extends AbstractFormArraySchema<Key> {
  label?: string;
}
