import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder } from '@angular/forms';
import { provideFluentForm } from '@fluent-form/core';
import { SafeAny } from '@ngify/core';
import { withZorro } from '../../feature';
import { useAllWidgets } from '../use';
import { TableArrayWidget } from './table-array.widget';

describe('TableArrayWidget', () => {
  let component: TableArrayWidget;
  let helper: TableArrayWidget['helper'];
  let fixture: ComponentFixture<TableArrayWidget>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withZorro(useAllWidgets())
        )
      ]
    });
    fixture = TestBed.createComponent(TableArrayWidget);
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
      kind: 'table-array',
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

    it('addable', () => {
      expect(helper.addable(false)).toEqual({ type: 'dashed', icon: 'plus', disabled: true });
      expect(helper.addable(true)).toEqual({ type: 'dashed', icon: 'plus', disabled: false });
      expect(helper.addable(undefined)).toEqual({ type: 'dashed', icon: 'plus', disabled: false });
      expect(helper.addable({})).toEqual({});
    });
  });
});
