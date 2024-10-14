/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { booleanAttribute, ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import type { NzSpaceCompactItemDirective } from './space-compact-item.directive';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'nz-space-compact',
  exportAs: 'nzSpaceCompact',
  standalone: true,
  template: `<ng-content />`,
  host: {
    class: 'ant-space-compact',
    '[class.ant-space-compact-block]': `nzBlock()`,
    '[class.ant-space-compact-vertical]': `nzDirection() === 'vertical'`
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzSpaceCompactComponent {
  nzBlock = input(false, { transform: booleanAttribute });
  nzDirection = input<'vertical' | 'horizontal'>('horizontal');
  nzSize = input<NzSizeLDSType>('default');

  items = signal<NzSpaceCompactItemDirective[]>([]);
}
