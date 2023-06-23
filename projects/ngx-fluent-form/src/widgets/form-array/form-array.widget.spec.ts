import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { withAllWidgets } from '../../features';
import { provideFluentForm } from '../../provider';
import { FormArrayWidget } from './form-array.widget';

describe('NestedFormWidget', () => {
  let component: FormArrayWidget;
  let helper: FormArrayWidget['helper'];
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
    helper = component['helper'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('add method', () => {
    const formArray = new FormArray<SafeAny>([]);
    component['add'](formArray, {
      kind: 'array',
      schemas: [
        { kind: 'input' }
      ]
    });

    expect(formArray.length).toBe(1);
  });

  describe('helper function', () => {
    it('length.min', () => {
      expect(helper.length.min(undefined)).toBe(0);
      expect(helper.length.min(1)).toBe(1);
      expect(helper.length.min({ max: 1 })).toBe(0);
      expect(helper.length.min({ min: 1 })).toBe(1);
    });

    it('length.max', () => {
      expect(helper.length.max(undefined)).toBe(Infinity);
      expect(helper.length.max(1)).toBe(1);
      expect(helper.length.max({ min: 1 })).toBe(Infinity);
      expect(helper.length.max({ max: 1 })).toBe(1);
    });
  });
});
