import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorPickerWidget } from './color-picker.widget';

describe('ColorPickerWidget', () => {
  let component: ColorPickerWidget;
  let fixture: ComponentFixture<ColorPickerWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPickerWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
