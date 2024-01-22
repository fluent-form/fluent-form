import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Breakpoints } from '../../../breakpoints';
import { Stringify } from '../../../types';
import { isNumber, isString } from '../../../utils';

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

const BREAKPOINTS: string[] = [
  Breakpoints.xs,
  Breakpoints.sm,
  Breakpoints.md,
  Breakpoints.lg,
  Breakpoints.xl,
  Breakpoints.xxl,
];

function getGap(level: Gap | Stringify<Gap> | [x: Gap, y: Gap]): [number, number?] {
  if (Array.isArray(level)) {
    return [GAPS[level[0]], GAPS[level[1]]];
  }

  return [0, GAPS[level]];
}

function parseJustifyOrAlign(value?: Justify | Align) {
  if (value === 'start' || value === 'end') {
    return `flex-${value}`;
  }

  return value;
}

@Component({
  selector: 'fluent-row,[fluent-row]',
  standalone: true,
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
  host: {
    class: 'fluent-row',
    '[style.--gap-x.px]': 'gap()[0]',
    '[style.--gap-y.px]': 'gap()[1]',
    '[style.justify-content]': 'justifyContent()',
    '[style.align-items]': 'alignItems()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FluentRowComponent {
  private _level = signal<Gap | Stringify<Gap> | [x: Gap, y: Gap] | Partial<Record<keyof Breakpoints, Gap | [x: Gap, y: Gap]>>>(0);
  private _justify = signal<Justify | undefined>(undefined);
  private _align = signal<Align | undefined>(undefined);
  private cdr = inject(ChangeDetectorRef);
  /** 当前匹配的断点 */
  private breakpoints = toSignal(
    inject(BreakpointObserver).observe(BREAKPOINTS).pipe(
      map(state =>
        Object.keys(state.breakpoints)
          .filter(breakpoint => state.breakpoints[breakpoint])
          .sort((a, b) => BREAKPOINTS.indexOf(b) - BREAKPOINTS.indexOf(a))
      ),
      tap(() => {
        // TODO：zoneless
        this.cdr.markForCheck();
      })
    ),
    { initialValue: [] }
  );

  @Input('gap') set level(value: Gap | Stringify<Gap> | [x: Gap, y: Gap] | Partial<Record<keyof Breakpoints, Gap | [x: Gap, y: Gap]>>) {
    this._level.set(value);
  }
  @Input() set justify(value: Justify | undefined) {
    this._justify.set(value);
  }
  @Input() set align(value: Align | undefined) {
    this._align.set(value);
  }

  protected gap = computed(() => {
    const level = this._level();
    const breakpoints = this.breakpoints();

    if (Array.isArray(level) || isNumber(level) || isString(level)) {
      return getGap(level);
    }

    for (const breakpointValue of breakpoints) {
      for (const breakpointName of Object.keys(level)) {
        if (Breakpoints[breakpointName as keyof Breakpoints] === breakpointValue) {
          return getGap(level[breakpointName as keyof Breakpoints]!);
        }
      }
    }

    return getGap(0);
  });
  protected justifyContent = computed(() => parseJustifyOrAlign(this._justify()));
  protected alignItems = computed(() => parseJustifyOrAlign(this._align()));
}
