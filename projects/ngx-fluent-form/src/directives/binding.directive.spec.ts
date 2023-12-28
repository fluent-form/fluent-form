import { Component, DebugElement, inject } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRateComponent, NzRateModule } from 'ng-zorro-antd/rate';
import { withAllWidgets } from '../features';
import { provideFluentForm } from '../provider';
import { InputControlSchema, RateControlSchema } from '../schemas';
import { FormUtil } from '../utils';
import { FluentBindingDirective } from './binding.directive';

// eslint-disable-next-line
function emptyFn() { }

@Component({
  standalone: true,
  imports: [
    NzInputModule,
    NzRateModule,
    ReactiveFormsModule,
    FluentBindingDirective
  ],
  template: `
    <input
      nz-input
      [fluentBinding]="{ schema: inputSchema, control: inputControl, model: {} }"
      [formControl]="inputControl">

    <nz-rate
      #component
      [fluentBinding]="{ component, schema: rateSchema, control: rateControl, model: {} }"
      [formControl]="rateControl"></nz-rate>
  `
})
class TestingComponent {
  readonly formUtil = inject(FormUtil);

  inputSchema: InputControlSchema = {
    kind: 'input',
    key: 'ipt',
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

  inputControl = this.formUtil.createFormControl(this.inputSchema, {});
  rateControl = this.formUtil.createFormControl(this.rateSchema, {});
}

describe('FluentBindingDirective', () => {
  // eslint-disable-next-line
  let component: TestingComponent;
  let fixture: ComponentFixture<TestingComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withAllWidgets()
        )
      ]
    });
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
