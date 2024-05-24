import { MediaMatcher } from '@angular/cdk/layout';
import { Component, ElementRef, Injectable, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SafeAny } from '@ngify/types';
import { Breakpoints } from '../../../breakpoints';
import { FluentRowDirective } from './row.component';

@Component({
  standalone: true,
  imports: [FluentRowDirective],
  template: `<fluent-row [gap]="gap" [justify]="justify" [align]="align" />`,
})
class TestComponent {
  @ViewChild(FluentRowDirective, { static: true }) rowComponent!: FluentRowDirective;
  @ViewChild(FluentRowDirective, { read: ElementRef, static: true }) rowElementRef!: ElementRef<HTMLElement>;
  gap: FluentRowDirective['gap'] = 0;
  justify: FluentRowDirective['justify'];
  align: FluentRowDirective['align'];
}

describe('FluentRowComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MediaMatcher, useClass: FakeMediaMatcher }
      ],
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default class', () => {
    expect(component.rowElementRef.nativeElement.classList.contains('fluent-row')).toBe(true);
  });

  it('should be able to parse the level to gap value', () => {
    component.gap = [1, 2];
    fixture.detectChanges();
    expect(component.rowElementRef.nativeElement.style.getPropertyValue('--gap-x')).toEqual('4px');
    expect(component.rowElementRef.nativeElement.style.getPropertyValue('--gap-y')).toEqual('8px');

    component.gap = [3, 4];
    fixture.detectChanges();
    expect(component.rowElementRef.nativeElement.style.getPropertyValue('--gap-x')).toEqual('16px');
    expect(component.rowElementRef.nativeElement.style.getPropertyValue('--gap-y')).toEqual('24px');

    component.gap = [5, 6];
    fixture.detectChanges();
    expect(component.rowElementRef.nativeElement.style.getPropertyValue('--gap-x')).toEqual('32px');
    expect(component.rowElementRef.nativeElement.style.getPropertyValue('--gap-y')).toEqual('48px');

    component.gap = { xl: 1 };
    fixture.detectChanges();
    expect(component.rowElementRef.nativeElement.style.getPropertyValue('--gap-x')).toEqual('0px');
    expect(component.rowElementRef.nativeElement.style.getPropertyValue('--gap-y')).toEqual('4px');

    component.gap = { xl: [1, 1] };
    fixture.detectChanges();
    expect(component.rowElementRef.nativeElement.style.getPropertyValue('--gap-x')).toEqual('4px');
    expect(component.rowElementRef.nativeElement.style.getPropertyValue('--gap-y')).toEqual('4px');

    component.gap = { xxl: 1 };
    fixture.detectChanges();
    expect(component.rowElementRef.nativeElement.style.getPropertyValue('--gap-x')).toEqual('0px');
    expect(component.rowElementRef.nativeElement.style.getPropertyValue('--gap-y')).toEqual('0px');
  });

  it('should be able to parse the align and justify', () => {
    component.align = 'start';
    fixture.detectChanges();
    expect(component.rowElementRef.nativeElement.style.alignItems).toEqual('flex-start');

    component.justify = 'end';
    fixture.detectChanges();
    expect(component.rowElementRef.nativeElement.style.justifyContent).toEqual('flex-end');
  });
});

export class FakeMediaQueryList {
  /** The callback for change events. */
  private _listeners: ((mql: MediaQueryListEvent) => void)[] = [];

  constructor(public matches: boolean, public media: string) { }

  /** Toggles the matches state and "emits" a change event. */
  setMatches(matches: boolean) {
    this.matches = matches;

    /** Simulate an asynchronous task. */
    setTimeout(() => {
      this._listeners.forEach(listener => listener(this as SafeAny));
    });
  }

  /** Registers a callback method for change events. */
  addListener(callback: (mql: MediaQueryListEvent) => void) {
    this._listeners.push(callback);
  }

  /** Removes a callback method from the change events. */
  removeListener(callback: (mql: MediaQueryListEvent) => void) {
    const index = this._listeners.indexOf(callback);

    if (index > -1) {
      this._listeners.splice(index, 1);
    }
  }
}

@Injectable()
export class FakeMediaMatcher {
  /** A map of match media queries. */
  private _queries = new Map<string, FakeMediaQueryList>();

  /** The number of distinct queries created in the media matcher during a test. */
  get queryCount(): number {
    return this._queries.size;
  }

  /** Fakes the match media response to be controlled in tests. */
  matchMedia(query: string): FakeMediaQueryList {
    // Disable the xxl breakpoint on the fake media matcher
    const mql = new FakeMediaQueryList(Breakpoints.xxl !== query, query);
    this._queries.set(query, mql);
    return mql;
  }

  /** Clears all queries from the map of queries. */
  clear() {
    this._queries.clear();
  }

  /** Toggles the matching state of the provided query. */
  setMatchesQuery(query: string, matches: boolean) {
    if (this._queries.has(query)) {
      this._queries.get(query)!.setMatches(matches);
    } else {
      throw Error('This query is not being observed.');
    }
  }
}
