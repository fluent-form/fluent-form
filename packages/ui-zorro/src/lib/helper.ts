import { TemplateRef } from '@angular/core';
import { WithoutSchemaReactiveFn, isNumber, isString } from '@fluent-form/core';
import { Labelful, TextControlSchema } from './schemas';

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

export const affixHelper = {
  content: (affix: WithoutSchemaReactiveFn<NonNullable<TextControlSchema['affixes']>['prefix']>) =>
    isString(affix) || affix instanceof TemplateRef ? affix : undefined,
  icon: (affix: WithoutSchemaReactiveFn<NonNullable<TextControlSchema['affixes']>['prefix']>) =>
    isString(affix) || affix instanceof TemplateRef ? undefined : affix?.icon,
};
