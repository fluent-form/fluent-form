import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideFluentForm } from '@fluent-form/core';
import { withZorro } from '../../feature';
import { useAllWidgets } from '../../widgets';
import { FormFieldWrapper } from './form-field-wrapper.component';

describe('FluentFormFieldOutletComponent', () => {
  let component: FormFieldWrapper;
  let fixture: ComponentFixture<FormFieldWrapper>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withZorro(useAllWidgets())
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
