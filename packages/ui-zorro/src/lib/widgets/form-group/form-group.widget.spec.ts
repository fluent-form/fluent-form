import { ComponentFixture, TestBed } from '@angular/core/testing';
import FormGroupWidget from './form-group.widget';

describe('NestedFormWidget', () => {
  let component: FormGroupWidget;
  let fixture: ComponentFixture<FormGroupWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGroupWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
