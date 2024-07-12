import { WithoutSchemaReactiveFn, isNumber, isString } from '@fluent-form/core';
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
};

export const tooltipHelper = {
  content: (tooltip: WithoutSchemaReactiveFn<Labelful['tooltip']>) => {
    return isString(tooltip) ? tooltip : tooltip?.content;
  },
  icon: (tooltip: WithoutSchemaReactiveFn<Labelful['tooltip']>) => {
    return isString(tooltip) ? null : tooltip?.icon;
  },
};
