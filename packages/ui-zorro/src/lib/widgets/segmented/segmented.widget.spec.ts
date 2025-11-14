import { ComponentFixture, TestBed } from '@angular/core/testing';
import SegmentedWidget from './segmented.widget';

describe('SegmentedWidget', () => {
  let component: SegmentedWidget;
  let fixture: ComponentFixture<SegmentedWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentedWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
