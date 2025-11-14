import { TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SafeAny } from '@ngify/core';
import TreeSelectWidget from './tree-select.widget';

describe('TreeSelectWidget', () => {
  let component: TreeSelectWidget;
  let helper: TreeSelectWidget['helper'];
  let fixture: ComponentFixture<TreeSelectWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeSelectWidget);
    component = fixture.componentInstance;
    helper = component['helper'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('helper function', () => {
    it('checkable', () => {
      expect(helper.checkable(undefined)).toBe(false);
      expect(helper.checkable(true)).toBe(true);
      expect(helper.checkable(false)).toBe(false);
      expect(helper.checkable({ strict: true })).toBe(true);
    });

    it('checkStrictly', () => {
      expect(helper.checkStrictly(undefined)).toBe(false);
      expect(helper.checkStrictly(true)).toBe(false);
      expect(helper.checkStrictly(false)).toBe(false);
      expect(helper.checkStrictly({ strict: true })).toBe(true);
    });

    it('showExpand', () => {
      const templateRef = {} as TemplateRef<SafeAny>;
      expect(helper.showExpand(undefined)).toBe(true);
      expect(helper.showExpand(true)).toBe(true);
      expect(helper.showExpand(false)).toBe(false);
      expect(helper.showExpand(templateRef)).toBe(true);
    });

    it('expandedIcon', () => {
      const templateRef = {} as TemplateRef<SafeAny>;
      expect(helper.expandedIcon(undefined)).toBeUndefined();
      expect(helper.expandedIcon(true)).toBeUndefined();
      expect(helper.expandedIcon(false)).toBeUndefined();
      expect(helper.expandedIcon(templateRef)).toBe(templateRef);
    });
  });
});
