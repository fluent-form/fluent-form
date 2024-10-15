/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { afterNextRender, computed, Directive, ElementRef, inject, input, OnDestroy } from '@angular/core';

import { NzSpaceCompactComponent } from './space-compact.component';

@Directive({
  selector: '[nzSpaceCompactItem]',
  exportAs: 'nzSpaceCompactItem',
  standalone: true,
  host: {
    '[class]': 'class()'
  }
})
export class NzSpaceCompactItemDirective implements OnDestroy {
  private spaceCompactCmp = inject(NzSpaceCompactComponent, { host: true, skipSelf: true, optional: true });
  type = input.required<string>({ alias: 'nzSpaceCompactItem' });

  protected class = computed(() => {
    // Only handle when the parent is space compact component
    if (!this.spaceCompactCmp) return null;

    const items = this.spaceCompactCmp.items();
    const type = this.type();
    const direction = this.spaceCompactCmp.nzDirection();
    const classes = [compactItemClassOf(type, direction)];
    const index = items.indexOf(this);
    const firstIndex = items.findIndex(element => element);

    if (index === firstIndex) {
      classes.push(compactFirstItemClassOf(type, direction));
    } else if (index === items.length - 1) {
      classes.push(compactLastItemClassOf(type, direction));
    }

    return classes;
  });

  constructor() {
    if (this.spaceCompactCmp) {
      const { nativeElement }: ElementRef<HTMLElement> = inject(ElementRef);

      afterNextRender(() => {
        const index = Array.from(nativeElement.parentElement!.children).indexOf(nativeElement);
        this.spaceCompactCmp!.items.update(value => {
          const newValue = value.slice();
          newValue.splice(index, 0, this);
          return newValue;
        });
      });
    }
  }

  ngOnDestroy() {
    this.spaceCompactCmp?.items.update(value => value.filter(o => o !== this));
  }
}

function generateCompactClass(
  type: string,
  direction: 'vertical' | 'horizontal',
  position: 'item' | 'first-item' | 'last-item'
): string {
  const directionPrefix = direction === 'vertical' ? 'vertical-' : '';
  return `ant-${type}-compact-${directionPrefix}${position}`;
}

function compactItemClassOf(type: string, direction: 'vertical' | 'horizontal'): string {
  return generateCompactClass(type, direction, 'item');
}

function compactFirstItemClassOf(type: string, direction: 'vertical' | 'horizontal'): string {
  return generateCompactClass(type, direction, 'first-item');
}

function compactLastItemClassOf(type: string, direction: 'vertical' | 'horizontal'): string {
  return generateCompactClass(type, direction, 'last-item');
}
