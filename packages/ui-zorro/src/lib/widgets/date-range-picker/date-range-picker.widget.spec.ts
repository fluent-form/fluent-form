import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateRangePickerWidget } from './date-range-picker.widget';

describe('DateRangeWidget', () => {
  let component: DateRangePickerWidget;
  let fixture: ComponentFixture<DateRangePickerWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangePickerWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
