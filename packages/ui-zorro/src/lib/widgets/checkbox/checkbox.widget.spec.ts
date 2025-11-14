import { ComponentFixture, TestBed } from '@angular/core/testing';
import CheckboxWidget from './checkbox.widget';

describe('CheckboxWidget', () => {
  let component: CheckboxWidget;
  let fixture: ComponentFixture<CheckboxWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
