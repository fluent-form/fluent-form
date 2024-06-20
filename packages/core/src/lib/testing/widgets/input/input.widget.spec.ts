import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputWidget } from './input.widget';

describe('InputWidget', () => {
  let component: InputWidget;
  let fixture: ComponentFixture<InputWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InputWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
