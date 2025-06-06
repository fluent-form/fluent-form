import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePickerWidget } from './date-picker.widget';

describe('DateWidget', () => {
  let component: DatePickerWidget;
  let fixture: ComponentFixture<DatePickerWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
