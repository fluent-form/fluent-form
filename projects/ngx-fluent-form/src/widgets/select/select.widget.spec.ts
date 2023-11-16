import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { of, switchMap } from 'rxjs';
import { SelectWidget, SelectWidgetTemplatePrivateContext } from './select.widget';

describe('SelectWidget', () => {
  let component: SelectWidget;
  let fixture: ComponentFixture<SelectWidget>;

  beforeEach(() => {
    TestBed.overrideProvider(ChangeDetectorRef, {
      useValue: {
        // eslint-disable-next-line
        detectChanges() { }
      }
    });
    fixture = TestBed.createComponent(SelectWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('private context', () => {
    const control = new FormControl();
    let ctx!: SelectWidgetTemplatePrivateContext;

    TestBed.runInInjectionContext(() => {
      ctx = new SelectWidgetTemplatePrivateContext();
    });

    ctx.init(
      {
        kind: 'select',
        options: []
      },
      {},
      control
    );
    ctx.init(
      {
        kind: 'select',
        fetchOptions: keyword$ =>
          keyword$.pipe(
            switchMap(() => of([]))
          )
      },
      {},
      control
    );
    ctx.open = true;
    ctx.trigger('keyword');
    ctx.destroy();
    expect(ctx).toBeTruthy();
  });
});
