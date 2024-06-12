import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SilderWidget } from './silder.widget';

describe('SilderWidget', () => {
  let component: SilderWidget;
  let fixture: ComponentFixture<SilderWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SilderWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
