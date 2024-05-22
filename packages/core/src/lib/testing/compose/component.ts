import { UnstableBuilder, composeBuilder } from '../../compose';
import { KindOrKey } from '../../compose/helper';
import { SingleSchemaKey } from '../../schemas';
import { ButtonComponentSchema, TemplateSchema } from '../schemas';

export function template<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<TemplateSchema<Key>, KindOrKey> {
  return composeBuilder<TemplateSchema<Key>>().kind('template').key(key);
}

export function button<Key extends SingleSchemaKey>(key?: Key): UnstableBuilder<ButtonComponentSchema<Key>, KindOrKey> {
  return composeBuilder<ButtonComponentSchema<Key>>().kind('button').key(key);
}
