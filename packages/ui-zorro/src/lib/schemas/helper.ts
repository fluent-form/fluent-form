import { WithOutSchemaReactiveFn, isNumber, isString } from '@fluent-form/core';
import { Labelful } from './interfaces';

export const labelHelper = {
  content: (label: WithOutSchemaReactiveFn<Labelful['label']>) => {
    return isString(label) ? label : label?.content;
  },
  span: (label: WithOutSchemaReactiveFn<Labelful['label']>) => {
    return isString(label) ? null : label?.span;
  },
  width: (label: WithOutSchemaReactiveFn<Labelful['label']>) => {
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
  content: (tooltip: WithOutSchemaReactiveFn<Labelful['tooltip']>) => {
    return isString(tooltip) ? tooltip : tooltip?.content;
  },
  icon: (tooltip: WithOutSchemaReactiveFn<Labelful['tooltip']>) => {
    return isString(tooltip) ? null : tooltip?.icon;
  },
};
