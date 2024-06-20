import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StepsWidget } from './steps.widget';

describe('StepsWidget', () => {
  let component: StepsWidget;
  let fixture: ComponentFixture<StepsWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
