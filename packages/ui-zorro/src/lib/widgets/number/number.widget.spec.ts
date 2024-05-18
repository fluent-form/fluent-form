import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberWidget } from './number.widget';

describe('NumberWidget', () => {
  let component: NumberWidget;
  let helper: NumberWidget['helper'];
  let fixture: ComponentFixture<NumberWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberWidget);
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
