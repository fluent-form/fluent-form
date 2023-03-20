import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NestedFormWidget } from './nested-form.widget';

describe('NestedFormWidget', () => {
  let component: NestedFormWidget;
  let fixture: ComponentFixture<NestedFormWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedFormWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
