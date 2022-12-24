import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeWidget } from './time.widget';

describe('TimeWidget', () => {
  let component: TimeWidget;
  let fixture: ComponentFixture<TimeWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
