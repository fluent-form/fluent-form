import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FluentColDirective } from './col.component';

@Component({
  standalone: true,
  imports: [FluentColDirective],
  template: `<fluent-col [span]="span" [flex]="flex" [offset]="offset" />`,
})
class TestComponent {
  @ViewChild(FluentColDirective, { read: ElementRef, static: true })
    colElementRef!: ElementRef<HTMLElement>;
  span: FluentColDirective['span'];
  flex: FluentColDirective['flex'];
  offset: FluentColDirective['offset'];
}

describe('FluentColComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default class', () => {
    expect(component.colElementRef.nativeElement.classList.contains('fluent-column')).toBe(true);
  });

  it('should be able parse the span', () => {
    component.span = 1;
    fixture.detectChanges();
    fixture.detectChanges();
    expect(component.colElementRef.nativeElement.classList.contains('fluent-column-1')).toBe(true);

    component.span = { xxl: 1 };
    fixture.detectChanges();
    fixture.detectChanges();
    expect(component.colElementRef.nativeElement.classList.contains('fluent-column-1')).toBe(false);
  });

  it('should be able parse the offset', () => {
    component.offset = 1;
    fixture.detectChanges();
    fixture.detectChanges();
    expect(component.colElementRef.nativeElement.classList.contains('fluent-column-offset-1')).toBe(true);

    component.offset = null;
    fixture.detectChanges();
    fixture.detectChanges();
    expect(component.colElementRef.nativeElement.classList.contains('fluent-column-offset-1')).toBe(false);

    component.offset = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 };
    fixture.detectChanges();
    fixture.detectChanges();
    expect(component.colElementRef.nativeElement.classList.contains('fluent-column-offset-1')).toBe(true);
    expect(component.colElementRef.nativeElement.classList.contains('fluent-column-offset-sm-2')).toBe(true);
    expect(component.colElementRef.nativeElement.classList.contains('fluent-column-offset-md-3')).toBe(true);
    expect(component.colElementRef.nativeElement.classList.contains('fluent-column-offset-lg-4')).toBe(true);
    expect(component.colElementRef.nativeElement.classList.contains('fluent-column-offset-xl-5')).toBe(true);
    expect(component.colElementRef.nativeElement.classList.contains('fluent-column-offset-xxl-6')).toBe(true);
  });
});
