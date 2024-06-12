import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RangeWidget } from './range.widget';

describe('RangeWidget', () => {
  let component: RangeWidget;
  let fixture: ComponentFixture<RangeWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
