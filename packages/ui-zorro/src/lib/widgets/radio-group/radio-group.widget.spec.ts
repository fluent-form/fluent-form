import { ComponentFixture, TestBed } from '@angular/core/testing';
import RadioGroupWidget from './radio-group.widget';

describe('RadioGroupWidget', () => {
  let component: RadioGroupWidget;
  let fixture: ComponentFixture<RadioGroupWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioGroupWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
