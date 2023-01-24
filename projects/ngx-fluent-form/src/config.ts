import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { NzRowDirective } from 'ng-zorro-antd/grid';

export interface FluentConfig {
  layout: NzFormLayoutType;
  colon: boolean;
  gutter: NzRowDirective['nzGutter'];
}