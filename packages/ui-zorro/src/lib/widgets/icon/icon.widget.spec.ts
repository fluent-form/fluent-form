import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconWidget } from './icon.widget';

describe('IconWidget', () => {
  let component: IconWidget;
  let fixture: ComponentFixture<IconWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IconWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
