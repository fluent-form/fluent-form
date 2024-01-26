import { Component, Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, ViewEncapsulation, inject } from '@angular/core';
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
    class: 'fluent-col',
    '[style.flex]': 'flex'
  }
})
export class FluentColDirective implements OnInit, OnChanges {
  private classes: string[] = [];
  private readonly renderer = inject(Renderer2);
  private readonly elementRef = inject(ElementRef);

  @Input() span?: Span | Stringify<Span> | Partial<Record<keyof Breakpoints, Span>>;
  @Input() flex?: string | number | null;
  @Input() offset?: Offset | Stringify<Offset> | Partial<Record<keyof Breakpoints, Offset>>;

  constructor() {
    withStyle(FluentColComponent);
  }

  ngOnInit(): void {
    const span = this.span;
    const offset = this.offset;
    const classes: string[] = [];

    // clear old classes
    for (const clazz of this.classes) {
      this.renderer.removeClass(this.elementRef.nativeElement, clazz);
    }

    if (span) {
      if (isObject(span)) {
        for (const [breakpoint, _span] of Object.entries(span)) {
          classes.push(createColumnClass(_span, breakpoint as keyof Breakpoints));
        }
      } else {
        classes.push(createColumnClass(span));
      }
    }

    if (offset) {
      if (isObject(offset)) {
        for (const [breakpoint, _offset] of Object.entries(offset)) {
          classes.push(createColumnOffsetClass(_offset, breakpoint as keyof Breakpoints));
        }
      } else {
        classes.push(createColumnOffsetClass(offset));
      }
    }

    // apply new classes
    for (const clazz of classes) {
      this.renderer.addClass(this.elementRef.nativeElement, clazz);
    }

    this.classes = classes;
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
