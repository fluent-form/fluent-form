import { ChangeDetectorRef, Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, switchMap } from 'rxjs';
import { SelectWidget, SelectWidgetTemplatePrivateContext } from './select.widget';

describe('SelectWidget', () => {
  let component: SelectWidget;
  let fixture: ComponentFixture<SelectWidget>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('private context', () => {
    const ctx = new SelectWidgetTemplatePrivateContext(
      Injector.create({
        providers: [
          {
            provide: ChangeDetectorRef,
            useValue: {
              // eslint-disable-next-line
              detectChanges() { }
            }
          }
        ],
      })
    );
    ctx.init({
      kind: 'select',
      fetchOptions: keyword$ =>
        keyword$.pipe(
          switchMap(() => of([]))
        )
    });
    ctx.trigger('keyword');
    ctx.destroy();
    expect(ctx).toBeTruthy();
  });
});
