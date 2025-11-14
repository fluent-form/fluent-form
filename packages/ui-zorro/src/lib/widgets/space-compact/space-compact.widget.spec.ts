import { ComponentFixture, TestBed } from '@angular/core/testing';
import SpaceCompactWidget from './space-compact.widget';

describe('SpaceCompactWidget', () => {
  let component: SpaceCompactWidget;
  let fixture: ComponentFixture<SpaceCompactWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceCompactWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
