import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputGroupWidget } from './input-group.widget';

describe('InputGroupWidget', () => {
  let component: InputGroupWidget;
  let helper: InputGroupWidget['helper'];
  let fixture: ComponentFixture<InputGroupWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InputGroupWidget);
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
