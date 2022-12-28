import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonWidget } from './button.widget';

describe('ButtonWidget', () => {
  let component: ButtonWidget;
  let helper: ButtonWidget['helper'];
  let fixture: ComponentFixture<ButtonWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonWidget);
    component = fixture.componentInstance;
    helper = component['helper'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('helper function', () => {
    it('icon.type', () => {
      expect(helper.icon.type('user')).toEqual('user');
      expect(helper.icon.type({ type: 'user' })).toEqual('user');
    });

    it('icon.rotate', () => {
      expect(helper.icon.rotate('user')).toBe(0);
      expect(helper.icon.rotate({ type: 'user' })).toBe(0);
      expect(helper.icon.rotate({ type: 'user', rotate: 1 })).toBe(1);
    });

    it('icon.spin', () => {
      expect(helper.icon.spin('user')).toBeFalse();
      expect(helper.icon.spin({ type: 'user' })).toBeFalse();
      expect(helper.icon.spin({ type: 'user', spin: true })).toBeTrue();
    });

    it('icon.theme', () => {
      expect(helper.icon.theme('user')).toEqual('outline');
      expect(helper.icon.theme({ type: 'user' })).toEqual('outline');
      expect(helper.icon.theme({ type: 'user', theme: 'fill' })).toEqual('fill');
    });
  });
});
