import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { of, switchMap } from 'rxjs';
import { select } from '../../compose/control';
import SelectWidget, { SelectWidgetTemplatePrivateContext } from './select.widget';

describe('SelectWidget', () => {
  let component: SelectWidget;
  let fixture: ComponentFixture<SelectWidget>;
  let helper: SelectWidget['helper'];

  beforeEach(() => {
    TestBed.overrideProvider(ChangeDetectorRef, {
      useValue: {
        // eslint-disable-next-line
        detectChanges() { }
      }
    });
    fixture = TestBed.createComponent(SelectWidget);
    component = fixture.componentInstance;
    helper = component['helper'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('compareWith', () => {
    const result = component['compareWith'](1, 1);
    expect(result).toBeTruthy();
  });

  it('helper.serverSearchable', () => {
    const schema1 = select().searchable(true).fetchOptions(() => of([])).build();
    expect(helper.serverSearchable(schema1)).toBeTruthy();

    const schema2 = select().searchable({ server: true }).fetchOptions(() => of([])).build();
    expect(helper.serverSearchable(schema2)).toBeTruthy();

    const schema3 = select().searchable(false).fetchOptions(() => of([])).build();
    expect(helper.serverSearchable(schema3)).toBeFalsy();

    const schema4 = select().searchable({ server: false }).fetchOptions(() => of([])).build();
    expect(helper.serverSearchable(schema4)).toBeFalsy();

    const schema5 = select().searchable(true).build();
    expect(helper.serverSearchable(schema5)).toBeFalsy();

    const schema6 = select().searchable({ server: true }).build();
    expect(helper.serverSearchable(schema6)).toBeFalsy();
  });

  it('private context', () => {
    const control = new FormControl();
    let ctx!: SelectWidgetTemplatePrivateContext;

    TestBed.runInInjectionContext(() => {
      ctx = new SelectWidgetTemplatePrivateContext(
        {
          kind: 'select',
          options: []
        },
        control
      );
      ctx = new SelectWidgetTemplatePrivateContext(
        {
          kind: 'select',
          fetchOptions: keyword$ =>
            keyword$.pipe(
              switchMap(() => of([]))
            )
        },
        control
      );
    });

    ctx.open = true;
    ctx.trigger('keyword');
    expect(ctx).toBeTruthy();
  });
});
