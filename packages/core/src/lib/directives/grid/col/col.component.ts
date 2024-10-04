import { Component, Directive, ViewEncapsulation, computed, input } from '@angular/core';
import { Breakpoints, createBreakpointInfix } from '../../../breakpoints';
import { withStyle } from '../../../style';
import { Stringify } from '../../../types';
import { isObject } from '../../../utils';

type Cell = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Span = Cell | 'fill' | null;
type Offset = Cell | 'auto' | null;

@Component({
  selector: 'fluent-col',
  standalone: true,
  template: '',
  styleUrls: ['./col.component.scss'],
  encapsulation: ViewEncapsulation.None
})
class FluentColComponent { }

@Directive({
  selector: 'fluent-col,[fluentCol]',
  exportAs: 'fluentCol',
  standalone: true,
  host: {
    class: 'fluent-column',
    '[class]': 'classes()',
    '[style.flex]': 'flex()'
  }
})
export class FluentColDirective {
  readonly span = input<Span | Stringify<Span> | Partial<Record<keyof Breakpoints, Span>>>();
  readonly flex = input<string | number | null>();
  readonly offset = input<Offset | Stringify<Offset> | Partial<Record<keyof Breakpoints, Offset>>>();

  protected readonly classes = computed(() => {
    const span = this.span();
    const offset = this.offset();
    const classes: string[] = [];

    if (span) {
      if (isObject(span)) {
        for (const [breakpoint, _span] of Object.entries(span)) {
          classes.push(columnClassOf(_span, breakpoint as keyof Breakpoints));
        }
      } else {
        classes.push(columnClassOf(span));
      }
    }

    if (offset) {
      if (isObject(offset)) {
        for (const [breakpoint, _offset] of Object.entries(offset)) {
          classes.push(columnOffsetClassOf(_offset, breakpoint as keyof Breakpoints));
        }
      } else {
        classes.push(columnOffsetClassOf(offset));
      }
    }

    return classes;
  });

  constructor() {
    withStyle(FluentColComponent);
  }
}

function columnClassOf(span: Span | Stringify<Span>, breakpoint?: keyof Breakpoints) {
  let clazz = `fluent-column`;

  if (breakpoint) {
    clazz += createBreakpointInfix(breakpoint);
  }

  if (span) {
    clazz += `-${span}`;
  }

  return clazz;
}

function columnOffsetClassOf(offset: Offset | Stringify<Offset>, breakpoint?: keyof Breakpoints) {
  let clazz = `fluent-column-offset`;

  if (breakpoint) {
    clazz += createBreakpointInfix(breakpoint);
  }

  clazz += `-${offset}`;

  return clazz;
}
