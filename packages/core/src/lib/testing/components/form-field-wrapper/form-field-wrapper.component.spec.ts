import { ComponentFixture, TestBed } from '@angular/core/testing';
import { withTesting } from '../../feature';
import { FormFieldWrapper } from './form-field-wrapper.component';
import { provideFluentForm } from '@fluent-form/core';

describe('FluentFormFieldOutletComponent', () => {
  let component: FormFieldWrapper;
  let fixture: ComponentFixture<FormFieldWrapper>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withTesting()
        )
      ]
    });

    fixture = TestBed.createComponent(FormFieldWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
