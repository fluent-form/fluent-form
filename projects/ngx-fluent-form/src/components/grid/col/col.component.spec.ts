import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FluentColComponent } from './col.component';

@Component({
  standalone: true,
  imports: [FluentColComponent],
  template: `<fluent-col [span]="span" [flex]="flex" [offset]="offset" />`,
})
class TestComponent {
  @ViewChild(FluentColComponent, { read: ElementRef })
    colElementRef!: ElementRef<HTMLElement>;
  span: FluentColComponent['span'];
  flex: FluentColComponent['flex'];
  offset: FluentColComponent['offset'];
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
    expect(component.colElementRef.nativeElement.classList.contains('fluent-col')).toBeTrue();
  });

  it('should be able parse the span', () => {
    component.span = 1;
    fixture.detectChanges();
    fixture.detectChanges();
    expect(component.colElementRef.nativeElement.classList.contains('fluent-col-1')).toBeTrue();

    component.span = { xxl: 1 };
    fixture.detectChanges();
    fixture.detectChanges();
    expect(component.colElementRef.nativeElement.classList.contains('fluent-col-1')).toBeFalse();
  });

  it('should be able parse the offset', () => {
    component.offset = 1;
    fixture.detectChanges();
    fixture.detectChanges();
    expect(component.colElementRef.nativeElement.classList.contains('fluent-col-offset-1')).toBeTrue();

    component.offset = null;
    fixture.detectChanges();
    fixture.detectChanges();
    expect(component.colElementRef.nativeElement.classList.contains('fluent-col-offset-1')).toBeFalse();

    component.offset = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 };
    fixture.detectChanges();
    fixture.detectChanges();
    expect(component.colElementRef.nativeElement.classList.contains('fluent-col-offset-1')).toBeTrue();
    expect(component.colElementRef.nativeElement.classList.contains('fluent-col-offset-sm-2')).toBeTrue();
    expect(component.colElementRef.nativeElement.classList.contains('fluent-col-offset-md-3')).toBeTrue();
    expect(component.colElementRef.nativeElement.classList.contains('fluent-col-offset-lg-4')).toBeTrue();
    expect(component.colElementRef.nativeElement.classList.contains('fluent-col-offset-xl-5')).toBeTrue();
    expect(component.colElementRef.nativeElement.classList.contains('fluent-col-offset-xxl-6')).toBeTrue();
  });
});
