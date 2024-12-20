import { Component, DebugElement, inject } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideFluentForm } from '../provider';
import { NumberControlSchema, RangeControlSchema, TextControlSchema, withTesting } from '../testing';
import { NumberComponent, RangeComponent } from '../testing/components';
import { FormUtil } from '../utils';
import { FluentBindingDirective } from './binding.directive';

const statusChangeFn = vitest.fn();
const valueChangeFn = vitest.fn();
const testChangeFn = vitest.fn();
const inputChangeFn = vitest.fn();

const statusChangeNextFn = vitest.fn();
const valueChangeNextFn = vitest.fn();
const testChangeNextFn = vitest.fn();
const inputChangeNextFn = vitest.fn();

@Component({
  standalone: true,
  imports: [
    RangeComponent,
    NumberComponent,
    ReactiveFormsModule,
    FluentBindingDirective
  ],
  template: `
    <input
      [fluentBinding]="{ schema: inputSchema, control: inputControl, model: {} }"
      [formControl]="inputControl">

    <fluent-range
      #rangeComponent
      [fluentBinding]="{ component: rangeComponent, schema: rangeSchema, control: rangeControl, model: {} }"
      [formControl]="rangeControl" />

    <fluent-number
      #numberComponent
      [fluentBinding]="{ component: numberComponent, schema: numberSchema, control: numberControl, model: {} }"
      [formControl]="numberControl" />
  `
})
class TestingComponent {
  readonly formUtil = inject(FormUtil);

  inputSchema: TextControlSchema = {
    kind: 'text',
    key: 'ipt',
    properties: {
      readOnly: true
    },
    listeners: {
      valueChange: valueChangeFn,
      statusChange: statusChangeFn,
      input: inputChangeFn,
    },
    observers: {
      valueChange: source => source.subscribe(valueChangeNextFn),
      statusChange: source => source.subscribe(statusChangeNextFn),
      input: source => source.subscribe(inputChangeNextFn),
    }
  };
  rangeSchema: RangeControlSchema = {
    kind: 'range',
    key: 'range',
    properties: {
      min: 5
    },
    listeners: {
      valueChange: valueChangeFn,
      statusChange: statusChangeFn,
      testChange: testChangeFn
    },
    observers: {
      valueChange: source => source.subscribe(valueChangeNextFn),
      statusChange: source => source.subscribe(statusChangeNextFn),
      testChange: source => source.subscribe(testChangeNextFn),
    }
  };
  numberSchema: NumberControlSchema = {
    kind: 'number',
    properties: {
      max: 999
    },
    listeners: {
      valueChange: valueChangeFn,
      statusChange: statusChangeFn,
      testChange: testChangeFn
    },
    observers: {
      valueChange: source => source.subscribe(valueChangeNextFn),
      statusChange: source => source.subscribe(statusChangeNextFn),
      testChange: source => source.subscribe(testChangeNextFn),
    }
  };

  inputControl = this.formUtil.createFormControl(this.inputSchema, {});
  rangeControl = this.formUtil.createFormControl(this.rangeSchema, {});
  numberControl = this.formUtil.createFormControl(this.numberSchema, {});
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
          withTesting()
        )
      ]
    });
    fixture = TestBed.createComponent(TestingComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    statusChangeFn.mockClear();
    valueChangeFn.mockClear();
    testChangeFn.mockClear();
    inputChangeFn.mockClear();

    statusChangeNextFn.mockClear();
    valueChangeNextFn.mockClear();
    testChangeNextFn.mockClear();
    inputChangeNextFn.mockClear();
  });

  it('should be properties applied (element)', () => {
    const input = debugElement.nativeElement.querySelector('input');
    input.dispatchEvent(new InputEvent('input'));
    expect(input.readOnly).toBe(true);
  });

  it('should be properties applied (component)', () => {
    const rangeCmp: RangeComponent = debugElement.query(By.directive(RangeComponent)).componentInstance;
    expect(rangeCmp.min).toBe(5);
  });

  it('should be properties applied (signal input component)', () => {
    const numberCmp: NumberComponent = debugElement.query(By.directive(NumberComponent)).componentInstance;
    expect(numberCmp.max()).toBe(999);
  });

  it('should listen to nativeElement event', () => {
    const input = debugElement.nativeElement.querySelector('input');
    input.dispatchEvent(new InputEvent('input'));
    expect(inputChangeFn).toHaveBeenCalled();
    expect(inputChangeNextFn).toHaveBeenCalled();
    const [callArgs] = inputChangeNextFn.mock.calls;
    expect(callArgs[0]).toHaveProperty('event');
    expect(callArgs[0].context).toBeTruthy();
  });

  it('should listen to valueChange event', () => {
    const input = debugElement.nativeElement.querySelector('input');
    input.dispatchEvent(new InputEvent('input'));
    expect(valueChangeFn).toHaveBeenCalled();
    expect(valueChangeNextFn).toHaveBeenCalled();
    const [callArgs] = valueChangeNextFn.mock.calls;
    expect(callArgs[0]).toHaveProperty('event');
    expect(callArgs[0].context).toBeTruthy();
  });

  it('should listen to statusChange event', () => {
    const input = debugElement.nativeElement.querySelector('input');
    input.dispatchEvent(new InputEvent('input'));
    expect(statusChangeFn).toHaveBeenCalled();
    expect(statusChangeNextFn).toHaveBeenCalled();
    const [callArgs] = statusChangeNextFn.mock.calls;
    expect(callArgs[0]).toHaveProperty('event');
    expect(callArgs[0].context).toBeTruthy();
  });

  it('should listen to custom event (EventEmiter)', () => {
    const rangeCmp: RangeComponent = debugElement.query(By.directive(RangeComponent)).componentInstance;
    rangeCmp.testChange.emit();
    expect(testChangeFn).toHaveBeenCalled();
    expect(testChangeNextFn).toHaveBeenCalled();
    const [callArgs] = testChangeNextFn.mock.calls;
    expect(callArgs[0]).toHaveProperty('event');
    expect(callArgs[0].context).toBeTruthy();
  });

  it('should listen to custom event (OutputRef)', () => {
    const numberCmp: NumberComponent = debugElement.query(By.directive(NumberComponent)).componentInstance;
    numberCmp.testChange.emit();
    expect(testChangeFn).toHaveBeenCalled();
    expect(testChangeNextFn).toHaveBeenCalled();
    const [callArgs] = testChangeNextFn.mock.calls;
    expect(callArgs[0]).toHaveProperty('event');
    expect(callArgs[0].context).toBeTruthy();
  });
});
