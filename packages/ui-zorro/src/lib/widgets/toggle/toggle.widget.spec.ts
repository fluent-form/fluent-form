import { ComponentFixture, TestBed } from '@angular/core/testing';
import ToggleWidget from './toggle.widget';

describe('ToggleWidget', () => {
  let component: ToggleWidget;
  let fixture: ComponentFixture<ToggleWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
