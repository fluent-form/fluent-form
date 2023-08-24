import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertWidget } from './alert.widget';

describe('AlertWidget', () => {
  let component: AlertWidget;
  let helper: AlertWidget['helper'];
  let fixture: ComponentFixture<AlertWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertWidget);
    component = fixture.componentInstance;
    helper = component['helper'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('helper function', () => {
    it('closeText', () => {
      expect(helper.closeText(undefined)).toBeUndefined();
      expect(helper.closeText(false)).toBeNull();
      expect(helper.closeText(true)).toBeNull();
      expect(helper.closeText({ content: 'text' })).toEqual('text');
    });

    it('icon', () => {
      expect(helper.icon(undefined)).toBeUndefined();
      expect(helper.icon('user')).toBeNull();
      expect(helper.icon(false)).toBeNull();
      expect(helper.icon(true)).toBeNull();
    });

    it('iconType', () => {
      expect(helper.iconType(undefined)).toBeUndefined();
      expect(helper.iconType('user')).toEqual('user');
      expect(helper.iconType(false)).toBeNull();
      expect(helper.iconType(true)).toBeNull();
    });
  });
});
