import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRateComponent, NzRateModule } from 'ng-zorro-antd/rate';
import { AnyControlSchema, InputControlSchema, RateControlSchema } from '../schemas';
import { createFormControl } from '../utils';
import { FluentBinderDirective } from './binder.directive';

// eslint-disable-next-line
function emptyFn() { }

@Component({
  standalone: true,
  imports: [
    NzInputModule,
    NzRateModule,
    ReactiveFormsModule,
    FluentBinderDirective
  ],
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
  inputSchema: InputControlSchema = {
    kind: 'input',
    name: 'ipt',
    properties: {
      readOnly: true
    },
    listeners: {
      input: emptyFn,
      valueChange: emptyFn,
      statusChange: emptyFn,
    }
  };
  rateSchema: RateControlSchema = {
    kind: 'rate',
    properties: {
      nzAutoFocus: true
    },
    listeners: {
      valueChange: emptyFn,
      statusChange: emptyFn,
      nzOnFocus: emptyFn
    }
  };

  inputControl = createFormControl(this.inputSchema as AnyControlSchema);
  rateControl = createFormControl(this.rateSchema as AnyControlSchema);
}

describe('FluentBinderDirective', () => {
  // eslint-disable-next-line
  let component: TestingComponent;
  let fixture: ComponentFixture<TestingComponent>;
  let debugElement: DebugElement;

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
