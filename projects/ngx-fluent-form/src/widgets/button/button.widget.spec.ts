import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonWidget } from './button.widget';

describe('ButtonWidget', () => {
  let component: ButtonWidget;
  let fixture: ComponentFixture<ButtonWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
