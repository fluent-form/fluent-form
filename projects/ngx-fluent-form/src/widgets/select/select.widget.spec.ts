import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectWidget } from './select.widget';

describe('SelectWidget', () => {
  let component: SelectWidget;
  let fixture: ComponentFixture<SelectWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
