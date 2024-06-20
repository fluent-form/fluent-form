import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeadingWidget } from './heading.widget';

describe('HeadingWidget', () => {
  let component: HeadingWidget;
  let fixture: ComponentFixture<HeadingWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadingWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
