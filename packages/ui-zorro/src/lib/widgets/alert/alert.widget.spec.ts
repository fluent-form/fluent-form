import { ComponentFixture, TestBed } from '@angular/core/testing';
import AlertWidget from './alert.widget';

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
    it('icon', () => {
      expect(helper.icon(undefined)).toBeUndefined();
      expect(helper.icon('user')).toEqual('user');
      expect(helper.icon(false)).toBeNull();
      expect(helper.icon(true)).toBeNull();
    });
  });
});
