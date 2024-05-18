import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RateWidget } from './rate.widget';

describe('RateWidget', () => {
  let component: RateWidget;
  let fixture: ComponentFixture<RateWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RateWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
