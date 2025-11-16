import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray } from '@angular/forms';
import { provideFluentForm } from '@fluent-form/core';
import { SafeAny } from '@ngify/core';
import { withZorro } from '../../feature';
import { useAllWidgets } from '../use';
import TabsArrayWidget from './tabs-array.widget';

describe('TabsArrayWidget', () => {
  let component: TabsArrayWidget;
  let fixture: ComponentFixture<TabsArrayWidget>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withZorro(useAllWidgets())
        )
      ]
    });
    fixture = TestBed.createComponent(TabsArrayWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('push method', () => {
    const formArray = new FormArray<SafeAny>([]);
    component['push'](formArray, {
      kind: 'tabs-array',
      schemas: [{ kind: 'text-field' }]
    });

    expect(formArray.length).toBe(1);
  });

  describe('withIndex', () => {
    it('should return index', () => {
      expect(component.withIndex(0, { kind: '' })).toEqual({ kind: '', key: 0 });
    });
  });
});
