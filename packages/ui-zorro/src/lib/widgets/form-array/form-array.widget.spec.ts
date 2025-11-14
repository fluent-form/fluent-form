import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder } from '@angular/forms';
import { provideFluentForm } from '@fluent-form/core';
import { SafeAny } from '@ngify/core';
import { withZorro } from '../../feature';
import { useAllWidgets } from '../use';
import FormArrayWidget from './form-array.widget';

describe('FormArrayWidget', () => {
  let component: FormArrayWidget;
  let helper: FormArrayWidget['helper'];
  let fixture: ComponentFixture<FormArrayWidget>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withZorro(useAllWidgets())
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
      schemas: [{ kind: 'text-field' }]
    });

    expect(formArray.length).toBe(1);
  });

  it('drop method', () => {
    const formArray = new FormBuilder().array([1, 2]);

    expect(formArray.value).toEqual([1, 2]);

    component['drop'](formArray, { previousIndex: 0, currentIndex: 1 } as CdkDragDrop<unknown>);

    expect(formArray.value).toEqual([2, 1]);
  });

  it('withIndex method', () => {
    expect(component['withIndex'](0, { kind: 'text-field' })).toEqual({ kind: 'text-field', key: 0 });
  });

  describe('helper function', () => {
    it('addable', () => {
      expect(helper.addable(false)).toEqual({ type: 'dashed', icon: 'plus', disabled: true });
      expect(helper.addable(true)).toEqual({ type: 'dashed', icon: 'plus', disabled: false });
      expect(helper.addable(undefined)).toEqual({ type: 'dashed', icon: 'plus', disabled: false });
      expect(helper.addable({})).toEqual({});
    });
  });
});
