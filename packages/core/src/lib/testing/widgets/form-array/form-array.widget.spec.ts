import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder } from '@angular/forms';
import { provideFluentForm } from '@fluent-form/core';
import { SafeAny } from '@ngify/types';
import { withTesting } from '../../feature';
import { FormArrayWidget } from './form-array.widget';

describe('NestedFormWidget', () => {
  let component: FormArrayWidget;
  let helper: FormArrayWidget['helper'];
  let fixture: ComponentFixture<FormArrayWidget>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withTesting()
        )
      ]
    });
    fixture = TestBed.createComponent(FormArrayWidget);
    component = fixture.componentInstance;
    helper = component['helper'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('push method', () => {
    const formArray = new FormArray<SafeAny>([]);
    component['push'](formArray, {
      kind: 'array',
      schemas: [
        { kind: 'text' }
      ]
    });

    expect(formArray.length).toBe(1);
  });

  it('drop method', () => {
    const formArray = new FormBuilder().array([1, 2]);

    expect(formArray.value).toEqual([1, 2]);

    component['drop'](formArray, { previousIndex: 0, currentIndex: 1 } as CdkDragDrop<unknown>);

    expect(formArray.value).toEqual([2, 1]);
  });

  describe('helper function', () => {
    describe('length', () => {
      it('min', () => {
        expect(helper.length.min(undefined)).toBe(0);
        expect(helper.length.min(1)).toBe(1);
        expect(helper.length.min({ max: 1 })).toBe(0);
        expect(helper.length.min({ min: 1 })).toBe(1);
      });

      it('max', () => {
        expect(helper.length.max(undefined)).toBe(Infinity);
        expect(helper.length.max(1)).toBe(1);
        expect(helper.length.max({ min: 1 })).toBe(Infinity);
        expect(helper.length.max({ max: 1 })).toBe(1);
      });
    });
  });
});
