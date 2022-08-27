import { ButtonComponentSchema, ButtonGroupComponentSchema, InputGroupComponentSchema, SingleKeySchemaName, StepComponentSchema, StepsComponentSchema, TabComponentSchema, TabsetComponentSchema } from '../schemas';
import { TypeAndName } from '../types';
import { builder, UnstableBuilder } from '../utils/builder.utils';

export function inputGroup<N extends SingleKeySchemaName>(name?: N): UnstableBuilder<InputGroupComponentSchema<N>, TypeAndName> {
  return builder<InputGroupComponentSchema<N>>().type('input-group').name(name);
}

export function buttonGroup<N extends SingleKeySchemaName>(name?: N): UnstableBuilder<ButtonGroupComponentSchema<N>, TypeAndName> {
  return builder<ButtonGroupComponentSchema<N>>().type('button-group').name(name);
}

export function button<N extends SingleKeySchemaName>(name?: N): UnstableBuilder<ButtonComponentSchema<N>, TypeAndName> {
  return builder<ButtonComponentSchema<N>>().type('button').name(name);
}

export function steps<N extends SingleKeySchemaName>(name?: N): UnstableBuilder<StepsComponentSchema<N>, TypeAndName> {
  return builder<StepsComponentSchema<N>>().type('steps').name(name);
}

export function step<N extends SingleKeySchemaName>(name?: N): UnstableBuilder<StepComponentSchema<N>, TypeAndName> {
  return builder<StepComponentSchema<N>>().type('step').name(name);
}

export function tabset<N extends SingleKeySchemaName>(name?: N): UnstableBuilder<TabsetComponentSchema<N>, TypeAndName> {
  return builder<TabsetComponentSchema<N>>().type('tabset').name(name);
}

export function tab<N extends SingleKeySchemaName>(name?: N): UnstableBuilder<TabComponentSchema<N>, TypeAndName> {
  return builder<TabComponentSchema<N>>().type('tab').name(name);
}