import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateWidget } from './date.widget';

describe('DateWidget', () => {
  let component: DateWidget;
  let fixture: ComponentFixture<DateWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DateWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
