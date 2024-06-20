import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberGroupWidget } from './number-group.widget';

describe('NumberGroupWidget', () => {
  let component: NumberGroupWidget;
  let helper: NumberGroupWidget['helper'];
  let fixture: ComponentFixture<NumberGroupWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberGroupWidget);
    component = fixture.componentInstance;
    helper = component['helper'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('helper function', () => {
    it('addon', () => {
      expect(helper.addon(undefined)).toBeUndefined();
      expect(helper.addon('user')).toEqual('user');
    });

    it('addonIcon', () => {
      expect(helper.addonIcon(undefined)).toBeUndefined();
      expect(helper.addonIcon('user')).toBeUndefined();
      expect(helper.addonIcon({ icon: 'user' })).toEqual('user');
    });
  });
});
