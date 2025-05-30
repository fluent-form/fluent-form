import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Directive, ViewEncapsulation, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Breakpoints } from '../../../breakpoints';
import { withStyle } from '../../../style';
import { Stringify } from '../../../types';
import { isArray, isNumber, isString } from '../../../utils';

type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6;
type Justify = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
type Align = 'start' | 'end' | 'center';

const SPACER = 16;
const GAPS = {
  0: 0,
  1: SPACER * 0.25, // 4
  2: SPACER * 0.5,  // 8
  3: SPACER,        // 16
  4: SPACER * 1.5,  // 24
  5: SPACER * 2,    // 32
  6: SPACER * 3,    // 48
};
const DEFAULT_GAP: Partial<Record<keyof Breakpoints, Gap | [x: Gap, y: Gap]>> = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 };

const BREAKPOINTS: string[] = [
  Breakpoints.xs,
  Breakpoints.sm,
  Breakpoints.md,
  Breakpoints.lg,
  Breakpoints.xl,
  Breakpoints.xxl,
];

@Component({
  selector: 'fluent-row',
  standalone: true,
  template: '',
  styleUrls: ['./row.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
class FluentRowComponent { }

@Directive({
  selector: 'fluent-row,[fluentRow]',
  exportAs: 'fluentRow',
  standalone: true,
  host: {
    class: 'fluent-row',
    '[style.--gap-x.px]': 'gapPx()[0]',
    '[style.--gap-y.px]': 'gapPx()[1]',
    '[style.justify-content]': 'justifyContent()',
    '[style.align-items]': 'alignItems()',
  }
})
export class FluentRowDirective {
  readonly gap = input<Gap | Stringify<Gap> | [x: Gap, y: Gap] | Partial<Record<keyof Breakpoints, Gap | [x: Gap, y: Gap]>> | null>();
  readonly justify = input<Justify | null>();
  readonly align = input<Align | null>();
  /** Currently matched breakpoints. */
  private readonly breakpoints = toSignal(
    inject(BreakpointObserver).observe(BREAKPOINTS).pipe(
      map(state =>
        Object.keys(state.breakpoints)
          .filter(breakpoint => state.breakpoints[breakpoint])
          .sort((a, b) => BREAKPOINTS.indexOf(b) - BREAKPOINTS.indexOf(a))
      )
    ),
    { initialValue: [] }
  );

  protected readonly gapPx = computed(() => {
    if (this.gap() === null) {
      return getGapPixel(0);
    }

    const breakpoints = this.breakpoints();
    const gap = this.gap() ?? DEFAULT_GAP;

    if (isArray(gap) || isNumber(gap) || isString(gap)) {
      return getGapPixel(gap);
    }

    for (const breakpointValue of breakpoints) {
      for (const breakpointName of Object.keys(gap)) {
        if (Breakpoints[breakpointName as keyof Breakpoints] === breakpointValue) {
          return getGapPixel(gap[breakpointName as keyof Breakpoints]!);
        }
      }
    }

    return getGapPixel(0);
  });
  protected readonly justifyContent = computed(() => parseJustifyOrAlign(this.justify()));
  protected readonly alignItems = computed(() => parseJustifyOrAlign(this.align()));

  constructor() {
    withStyle(FluentRowComponent);
  }
}

function getGapPixel(level: Gap | Stringify<Gap> | [x: Gap, y: Gap]): [number, number?] {
  if (isArray(level)) {
    return [GAPS[level[0]], GAPS[level[1]]];
  }

  return [GAPS[level], 0];
}

function parseJustifyOrAlign(value?: Justify | Align | null) {
  if (value === 'start' || value === 'end') {
    return `flex-${value}`;
  }

  return value;
}
