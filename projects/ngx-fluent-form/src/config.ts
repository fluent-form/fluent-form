import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { NzRowDirective } from 'ng-zorro-antd/grid';

export interface FluentConfig {
  layout: NzFormLayoutType;
  colon: boolean;
  gutter: NzRowDirective['nzGutter'];
}

export const DEFAULT_CONFIG: FluentConfig = {
  layout: 'vertical',
  colon: true,
  gutter: { xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 32 }
};
