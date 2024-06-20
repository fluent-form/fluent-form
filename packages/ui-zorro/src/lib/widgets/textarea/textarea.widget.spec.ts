import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextareaWidget } from './textarea.widget';

describe('TextareaWidget', () => {
  let component: TextareaWidget;
  let helper: TextareaWidget['helper'];
  let fixture: ComponentFixture<TextareaWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaWidget);
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
