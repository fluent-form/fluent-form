import { Label, Labelful } from '../schemas';
import { isNumber, isString } from '../utils';

export const labelHelper = {
  content: (label?: string | Label) => {
    return isString(label) ? label : label?.content;
  },
  span: (label?: string | Label) => {
    return isString(label) ? null : label?.span;
  },
  width: (label?: string | Label) => {
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
  content: (tooltip?: string | Labelful['tooltip']) => {
    return isString(tooltip) ? tooltip : tooltip?.content;
  },
  icon: (tooltip?: string | Labelful['tooltip']) => {
    return isString(tooltip) ? null : tooltip?.icon;
  },
};
