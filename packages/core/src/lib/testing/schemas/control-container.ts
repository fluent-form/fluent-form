import { AbstractFormArraySchema, AbstractFormGroupSchema, SingleSchemaKey } from '../../schemas';

/**
 * @public
 */
export type FormGroupSchema<Key extends SingleSchemaKey = SingleSchemaKey> = AbstractFormGroupSchema<Key>

export type FormArraySchema<Key extends SingleSchemaKey = SingleSchemaKey> = AbstractFormArraySchema<Key>
