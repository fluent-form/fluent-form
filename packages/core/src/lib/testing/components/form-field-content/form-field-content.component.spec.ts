import { ComponentFixture, TestBed } from '@angular/core/testing';
import { withTesting } from '../../feature';
import { FormFieldContentComponent } from './form-field-content.component';
import { provideFluentForm } from '@fluent-form/core';

describe('FluentFormFieldOutletComponent', () => {
  let component: FormFieldContentComponent;
  let fixture: ComponentFixture<FormFieldContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withTesting()
        )
      ]
    });

    fixture = TestBed.createComponent(FormFieldContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
