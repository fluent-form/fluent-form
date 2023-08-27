import { Labelful } from '../schemas';
import { isString } from '../utils';

export const tooltipHelper = {
  content: (tooltip?: string | Labelful['tooltip']) => {
    return isString(tooltip) ? tooltip : tooltip?.content;
  },
  icon: (tooltip?: string | Labelful['tooltip']) => {
    return isString(tooltip) ? null : tooltip?.icon;
  },
};
