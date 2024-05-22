import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideFluentForm } from '@fluent-form/core';
import { withTesting } from '../../feature';
import { FormItemContentComponent } from './form-item-content.component';

describe('FluentFormItemOutletComponent', () => {
  let component: FormItemContentComponent;
  let fixture: ComponentFixture<FormItemContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withTesting()
        )
      ]
    });

    fixture = TestBed.createComponent(FormItemContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
