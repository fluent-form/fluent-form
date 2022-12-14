import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRateComponent, NzRateModule } from 'ng-zorro-antd/rate';
import { input, rate } from '../builders';
import { ControlSchema } from '../schemas';
import { createFormControl, standardSchema } from '../utils';
import { FluentBinderDirective } from './binder.directive';

// eslint-disable-next-line
function emptyFn() { }

@Component({
  template: `
    <input
      nz-input
      [fluentBinderSchema]="inputSchema"
      [fluentBinderControl]="inputControl"
      [formControl]="inputControl">

    <nz-rate
      #cmp
      [fluentBinder]="cmp"
      [fluentBinderSchema]="rateSchema"
      [fluentBinderControl]="rateControl"
      [formControl]="rateControl"></nz-rate>
  `
})
class TestingComponent {
  inputSchema = standardSchema(
    input('ipt')
      .property({
        readOnly: true
      })
      .listener({
        input: emptyFn,
        valueChange: emptyFn,
        statusChange: emptyFn,
      })
  );
  rateSchema = standardSchema(
    rate('rat')
      .property({
        nzAutoFocus: true
      })
      .listener({
        valueChange: emptyFn,
        statusChange: emptyFn,
        nzOnFocus: emptyFn
      })
  );

  inputControl = createFormControl(this.inputSchema as ControlSchema);
  rateControl = createFormControl(this.rateSchema as ControlSchema);

}

describe('FluentBinderDirective', () => {
  // eslint-disable-next-line
  let component: TestingComponent;
  let fixture: ComponentFixture<TestingComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestingComponent, FluentBinderDirective],
      imports: [NzInputModule, NzRateModule, ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('input should be read only', () => {
    const input = debugElement.nativeElement.querySelector('input');
    input.dispatchEvent(new InputEvent('input'));
    expect(input.readOnly).toBe(true);
  });

  it('rate should be auto focus', () => {
    const rate = debugElement.query(By.directive(NzRateComponent)).componentInstance;
    rate.nzOnFocus.emit();
    expect(rate.nzAutoFocus).toBe(true);
  });
});
