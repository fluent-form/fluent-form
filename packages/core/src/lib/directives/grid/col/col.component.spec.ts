import { Component, signal, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FluentColDirective } from './col.component';

@Component({
  imports: [FluentColDirective],
  template: `<fluent-col [fluentCol]="enabled()" [span]="span()" [flex]="flex()" [offset]="offset()" />`
})
class TestComponent {
  @ViewChild(FluentColDirective, { read: ElementRef, static: true })
  colElementRef!: ElementRef<HTMLElement>;

  readonly enabled = signal(true);
  readonly span = signal<ReturnType<FluentColDirective['span']>>(undefined);
  readonly flex = signal<ReturnType<FluentColDirective['flex']>>(undefined);
  readonly offset = signal<ReturnType<FluentColDirective['offset']>>(undefined);
}

describe('FluentColComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default class', () => {
    expect(component.colElementRef.nativeElement.classList.contains('fluent-column')).toBe(true);
  });

  it('should be able to disable the column', async () => {
    component.enabled.set(false);
    await fixture.whenStable();
    expect(component.colElementRef.nativeElement.classList.contains('fluent-column')).toBe(false);
  });

  it('should be able parse the span', async () => {
    component.span.set(1);
    await fixture.whenStable();
    expect(component.colElementRef.nativeElement.classList.contains('fluent-column-1')).toBe(true);

    component.span.set({ xxl: 1 });
    await fixture.whenStable();
    expect(component.colElementRef.nativeElement.classList.contains('fluent-column-1')).toBe(false);
  });

  it('should be able parse the offset', async () => {
    component.offset.set(1);
    await fixture.whenStable();
    expect(component.colElementRef.nativeElement.classList.contains('fluent-column-offset-1')).toBe(true);

    component.offset.set(null);
    await fixture.whenStable();
    expect(component.colElementRef.nativeElement.classList.contains('fluent-column-offset-1')).toBe(false);

    component.offset.set({ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 });
    await fixture.whenStable();
    expect(component.colElementRef.nativeElement.classList.contains('fluent-column-offset-1')).toBe(true);
    expect(component.colElementRef.nativeElement.classList.contains('fluent-column-offset-sm-2')).toBe(true);
    expect(component.colElementRef.nativeElement.classList.contains('fluent-column-offset-md-3')).toBe(true);
    expect(component.colElementRef.nativeElement.classList.contains('fluent-column-offset-lg-4')).toBe(true);
    expect(component.colElementRef.nativeElement.classList.contains('fluent-column-offset-xl-5')).toBe(true);
    expect(component.colElementRef.nativeElement.classList.contains('fluent-column-offset-xxl-6')).toBe(true);
  });
});
