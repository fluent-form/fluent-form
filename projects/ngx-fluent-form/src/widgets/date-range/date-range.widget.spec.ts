import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateRangeWidget } from './date-range.widget';

describe('DateRangeWidget', () => {
  let component: DateRangeWidget;
  let fixture: ComponentFixture<DateRangeWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangeWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
