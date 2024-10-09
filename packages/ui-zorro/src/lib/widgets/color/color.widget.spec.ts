import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorWidget } from './color.widget';

describe('ColorWidget', () => {
  let component: ColorWidget;
  let fixture: ComponentFixture<ColorWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
