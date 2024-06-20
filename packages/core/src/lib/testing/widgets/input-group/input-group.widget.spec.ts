import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputGroupWidget } from './input-group.widget';

describe('InputGroupWidget', () => {
  let component: InputGroupWidget;
  let fixture: ComponentFixture<InputGroupWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InputGroupWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
