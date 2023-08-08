import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpaceWidget } from './space.widget';

describe('SpaceWidget', () => {
  let component: SpaceWidget;
  let fixture: ComponentFixture<SpaceWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
