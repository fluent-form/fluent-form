import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextAreaWidget } from './text-area.widget';

describe('TextAreaWidget', () => {
  let component: TextAreaWidget;
  let helper: TextAreaWidget['helper'];
  let fixture: ComponentFixture<TextAreaWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaWidget);
    component = fixture.componentInstance;
    helper = component['helper'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('helper function', () => {
    it('length.min', () => {
      expect(helper.length.min(undefined)).toBeUndefined();
      expect(helper.length.min(1)).toBe(1);
      expect(helper.length.min({ max: 1 })).toBeUndefined();
      expect(helper.length.min({ min: 1 })).toBe(1);
    });

    it('length.max', () => {
      expect(helper.length.max(undefined)).toBeUndefined();
      expect(helper.length.max(1)).toBe(1);
      expect(helper.length.max({ min: 1 })).toBeUndefined();
      expect(helper.length.max({ max: 1 })).toBe(1);
    });
  });
});
