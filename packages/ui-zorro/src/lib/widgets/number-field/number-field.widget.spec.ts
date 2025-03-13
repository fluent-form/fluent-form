import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberFieldWidget } from './number-field.widget';

describe('NumberFieldWidget', () => {
  let component: NumberFieldWidget;
  let helper: NumberFieldWidget['helper'];
  let fixture: ComponentFixture<NumberFieldWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberFieldWidget);
    component = fixture.componentInstance;
    helper = component['helper'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('helper function', () => {
    it('precision', () => {
      expect(helper.precision(undefined)).toBeUndefined();
      expect(helper.precision(1)).toBe(1);
      expect(helper.precision({})).toBeUndefined();
      expect(helper.precision({ value: 1 })).toBe(1);
    });

    it('precisionMode', () => {
      expect(helper.precisionMode(undefined)).toEqual('toFixed');
      expect(helper.precisionMode(1)).toEqual('toFixed');
      expect(helper.precisionMode({})).toEqual('toFixed');
      expect(helper.precisionMode({ mode: 'cut' })).toEqual('cut');
    });
  });
});
