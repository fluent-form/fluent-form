import { SchemaName, StepComponentSchema, StepsComponentSchema, TabComponentSchema, TabsetComponentSchema } from '../schemas';
import { KindAndName } from '../types';
import { builder, UnstableBuilder } from '../utils';

export function steps<N extends SchemaName>(name?: N): UnstableBuilder<StepsComponentSchema<N>, KindAndName> {
  return builder<StepsComponentSchema<N>>().kind('steps').name(name);
}

export function step<N extends SchemaName>(name?: N): UnstableBuilder<StepComponentSchema<N>, KindAndName> {
  return builder<StepComponentSchema<N>>().kind('step').name(name);
}

export function tabset<N extends SchemaName>(name?: N): UnstableBuilder<TabsetComponentSchema<N>, KindAndName> {
  return builder<TabsetComponentSchema<N>>().kind('tabset').name(name);
}

export function tab<N extends SchemaName>(name?: N): UnstableBuilder<TabComponentSchema<N>, KindAndName> {
  return builder<TabComponentSchema<N>>().kind('tab').name(name);
}
