import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxGroupWidget } from './checkbox-group.widget';

describe('CheckboxGroupWidget', () => {
  let component: CheckboxGroupWidget;
  let fixture: ComponentFixture<CheckboxGroupWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxGroupWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
