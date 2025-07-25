import { AbstractFormArraySchema, WithoutSchemaReactiveFn, isNumber, isString } from '@fluent-form/core';
import { Labelful } from './schemas';

export const labelHelper = {
  content: (label: WithoutSchemaReactiveFn<Labelful['label']>) => {
    return isString(label) ? label : label?.content;
  },
  span: (label: WithoutSchemaReactiveFn<Labelful['label']>) => {
    return isString(label) ? null : label?.span;
  },
  width: (label: WithoutSchemaReactiveFn<Labelful['label']>) => {
    if (isString(label) || !label?.width) {
      return null;
    }

    if (isNumber(label.width)) {
      return label.width + 'px';
    }

    return label.width;
  },
  wrap: (label: WithoutSchemaReactiveFn<Labelful['label']>) => {
    return isString(label) ? false : label?.wrap;
  }
};

export const tooltipHelper = {
  content: (tooltip: WithoutSchemaReactiveFn<Labelful['tooltip']>) => {
    return isString(tooltip) ? tooltip : tooltip?.content;
  },
  icon: (tooltip: WithoutSchemaReactiveFn<Labelful['tooltip']>) => {
    return isString(tooltip) ? null : tooltip?.icon;
  }
};

export const lengthHelper = {
  min: (length: AbstractFormArraySchema['length']) => {
    return isNumber(length) ? length : length?.min ?? 0;
  },
  max: (length: AbstractFormArraySchema['length']) => {
    return isNumber(length) ? length : length?.max ?? Infinity;
  }
};
