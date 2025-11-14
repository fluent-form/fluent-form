import { ComponentFixture, TestBed } from '@angular/core/testing';
import ButtonWidget from './button.widget';

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
    it('icon', () => {
      expect(helper.icon(undefined)).toBeUndefined();
      expect(helper.icon('user')).toEqual({ type: 'user' });
      expect(helper.icon({ type: 'user' })).toEqual({ type: 'user' });
    });
  });
});
