import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimePickerWidget } from './time-picker.widget';

describe('TimeWidget', () => {
  let component: TimePickerWidget;
  let fixture: ComponentFixture<TimePickerWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePickerWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
