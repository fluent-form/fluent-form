import { ButtonComponentSchema, ButtonGroupComponentSchema, InputGroupComponentSchema, SchemaName, StepComponentSchema, StepsComponentSchema, TabComponentSchema, TabsetComponentSchema, TextComponentSchema } from '../schemas';
import { KindAndName } from '../types';
import { builder, UnstableBuilder } from '../utils/builder.utils';

export function inputGroup<N extends SchemaName>(name?: N): UnstableBuilder<InputGroupComponentSchema<N>, KindAndName> {
  return builder<InputGroupComponentSchema<N>>().kind('input-group').name(name);
}

export function text<N extends SchemaName>(name?: N): UnstableBuilder<TextComponentSchema<N>, KindAndName> {
  return builder<TextComponentSchema<N>>().kind('text').name(name);
}

export function buttonGroup<N extends SchemaName>(name?: N): UnstableBuilder<ButtonGroupComponentSchema<N>, KindAndName> {
  return builder<ButtonGroupComponentSchema<N>>().kind('button-group').name(name);
}

export function button<N extends SchemaName>(name?: N): UnstableBuilder<ButtonComponentSchema<N>, KindAndName> {
  return builder<ButtonComponentSchema<N>>().kind('button').name(name);
}

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