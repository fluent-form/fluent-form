import { TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SafeAny } from '@ngify/types';
import { TreeSelectWidget } from './tree-select.widget';

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
      expect(helper.checkable(undefined)).toBeFalse();
      expect(helper.checkable(true)).toBeTrue();
      expect(helper.checkable(false)).toBeFalse();
      expect(helper.checkable({ strict: true })).toBeTrue();
    });

    it('checkStrictly', () => {
      expect(helper.checkStrictly(undefined)).toBeFalse();
      expect(helper.checkStrictly(true)).toBeFalse();
      expect(helper.checkStrictly(false)).toBeFalse();
      expect(helper.checkStrictly({ strict: true })).toBeTrue();
    });

    it('showExpand', () => {
      const templateRef = {} as TemplateRef<SafeAny>;
      expect(helper.showExpand(undefined)).toBeTrue();
      expect(helper.showExpand(true)).toBeTrue();
      expect(helper.showExpand(false)).toBeFalse();
      expect(helper.showExpand(templateRef)).toBeTrue();
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
