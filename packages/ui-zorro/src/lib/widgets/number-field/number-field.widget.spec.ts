import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberFieldWidget } from './number-field.widget';

describe('NumberFieldWidget', () => {
  let component: NumberFieldWidget;
  let fixture: ComponentFixture<NumberFieldWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberFieldWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
