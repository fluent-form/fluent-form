import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { withAllWidgets } from '../../features';
import { provideFluentForm } from '../../provider';
import { FormArrayWidget } from './form-array.widget';

describe('NestedFormWidget', () => {
  let component: FormArrayWidget;
  let fixture: ComponentFixture<FormArrayWidget>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withAllWidgets()
        )
      ]
    });
    fixture = TestBed.createComponent(FormArrayWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('add method', () => {
    const formArray = new FormArray<SafeAny>([]);
    component.add(formArray, {
      kind: 'array',
      schemas: [
        { kind: 'input' }
      ]
    });

    expect(formArray.length).toBe(1);
  });
});
