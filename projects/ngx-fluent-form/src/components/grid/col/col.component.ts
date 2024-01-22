import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Breakpoints, createBreakpointInfix } from '../../../breakpoints';
import { Stringify } from '../../../types';
import { isObject } from '../../../utils';

type Col = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Span = Col | 'fill' | null;
type Offset = Col | 'auto';

@Component({
  selector: 'fluent-col,[fluent-col]',
  standalone: true,
  templateUrl: './col.component.html',
  styleUrls: ['./col.component.scss'],
  host: {
    class: 'fluent-col',
    '[style.flex]': 'flex'
  },
  hostDirectives: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FluentColComponent implements OnInit, OnChanges {
  private readonly ngClass = inject(NgClass);

  @Input() span?: Span | Stringify<Span> | Partial<Record<keyof Breakpoints, Span>>;
  @Input() flex?: string | number;
  @Input() offset?: Offset | Stringify<Offset> | Partial<Record<keyof Breakpoints, Offset>>;

  ngOnInit(): void {
    const span = this.span;
    const offset = this.offset;
    const classes: string[] = [];

    if (span) {
      if (isObject(span)) {
        for (const [breakpoint, size] of Object.entries(span)) {
          classes.push(createColumnClass(size, breakpoint as keyof Breakpoints));
        }
      } else {
        classes.push(createColumnClass(span));
      }
    }

    if (offset) {
      if (isObject(offset)) {
        for (const [breakpoint, size] of Object.entries(offset || {})) {
          classes.push(createColumnOffsetClass(size, breakpoint as keyof Breakpoints));
        }
      } else {
        classes.push(createColumnOffsetClass(offset));
      }
    }

    this.ngClass.ngClass = classes;
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }
}

function createColumnClass(span: Span | Stringify<Span>, breakpoint?: keyof Breakpoints) {
  let clazz = `fluent-col`;

  if (breakpoint) {
    clazz += createBreakpointInfix(breakpoint);
  }

  if (span) {
    clazz += `-${span}`;
  }

  return clazz;
}

function createColumnOffsetClass(offset: Offset | Stringify<Offset>, breakpoint?: keyof Breakpoints) {
  let clazz = `fluent-col-offset`;

  if (breakpoint) {
    clazz += createBreakpointInfix(breakpoint);
  }

  clazz += `-${offset}`;

  return clazz;
}
