import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideFluentForm } from '@fluent-form/core';
import { withZorro } from '../../feature';
import { useAllWidgets } from '../../widgets';
import { FormFieldContentComponent } from './form-field-content.component';

describe('FluentFormFieldOutletComponent', () => {
  let component: FormFieldContentComponent;
  let fixture: ComponentFixture<FormFieldContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withZorro(useAllWidgets())
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
