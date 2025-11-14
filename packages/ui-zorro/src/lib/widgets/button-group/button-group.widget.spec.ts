import { ComponentFixture, TestBed } from '@angular/core/testing';
import ButtonGroupWidget from './button-group.widget';

describe('ButtonGroupWidget', () => {
  let component: ButtonGroupWidget;
  let fixture: ComponentFixture<ButtonGroupWidget>;
  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonGroupWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
