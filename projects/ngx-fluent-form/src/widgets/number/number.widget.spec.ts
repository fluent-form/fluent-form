import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberWidget } from './number.widget';

describe('NumberWidget', () => {
  let component: NumberWidget;
  let fixture: ComponentFixture<NumberWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
