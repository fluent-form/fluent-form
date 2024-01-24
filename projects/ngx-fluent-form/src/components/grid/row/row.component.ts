import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Directive, Input, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
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
  selector: 'fluent-row,[fluent-row]',
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
  private readonly cdr = inject(ChangeDetectorRef);

  private _gap = signal<Gap | Stringify<Gap> | [x: Gap, y: Gap] | Partial<Record<keyof Breakpoints, Gap | [x: Gap, y: Gap]>> | null | undefined>(null);
  private _justify = signal<Justify | null | undefined>(null);
  private _align = signal<Align | null | undefined>(null);
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

  @Input() set gap(value: Gap | Stringify<Gap> | [x: Gap, y: Gap] | Partial<Record<keyof Breakpoints, Gap | [x: Gap, y: Gap]>> | null | undefined) {
    this._gap.set(value);
  }
  @Input() set justify(value: Justify | null | undefined) {
    this._justify.set(value);
  }
  @Input() set align(value: Align | null | undefined) {
    this._align.set(value);
  }

  constructor() {
    withStyle(FluentRowComponent);
  }

  protected gapPx = computed(() => {
    const gap = this._gap();
    const breakpoints = this.breakpoints();

    if (!gap) {
      return getGapPixel(0);
    }

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
  protected justifyContent = computed(() => parseJustifyOrAlign(this._justify()));
  protected alignItems = computed(() => parseJustifyOrAlign(this._align()));
}

function getGapPixel(level: Gap | Stringify<Gap> | [x: Gap, y: Gap]): [number, number?] {
  if (isArray(level)) {
    return [GAPS[level[0]], GAPS[level[1]]];
  }

  return [0, GAPS[level]];
}

function parseJustifyOrAlign(value?: Justify | Align | null) {
  if (value === 'start' || value === 'end') {
    return `flex-${value}`;
  }

  return value;
}
