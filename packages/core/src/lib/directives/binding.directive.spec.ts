import { Component, DebugElement, inject } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideFluentForm } from '../provider';
import { InputControlSchema, withTesting } from '../testing';
import { RangeComponent } from '../testing/components';
import { FormUtil } from '../utils';
import { FluentBindingDirective } from './binding.directive';

const statusChangeFn = jest.fn();
const valueChangeFn = jest.fn();
const testChangeFn = jest.fn();
const inputChangeFn = jest.fn();

@Component({
  standalone: true,
  imports: [
    RangeComponent,
    ReactiveFormsModule,
    FluentBindingDirective
  ],
  template: `
    <input
      [fluentBinding]="{ schema: inputSchema, control: inputControl, model: {} }"
      [formControl]="inputControl">

    <fluent-range
      #component
      [fluentBinding]="{ component, schema: rangeSchema, control: rangeControl, model: {} }"
      [formControl]="rangeControl" />
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
      valueChange: valueChangeFn,
      statusChange: statusChangeFn,
      input: inputChangeFn,
    }
  };
  rangeSchema = {
    kind: 'range',
    key: 'range',
    properties: {
      min: 5
    },
    listeners: {
      valueChange: valueChangeFn,
      statusChange: statusChangeFn,
      testChange: testChangeFn
    }
  };

  inputControl = this.formUtil.createFormControl(this.inputSchema, {});
  rangeControl = this.formUtil.createFormControl(this.rangeSchema, {});
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

  it('input should be read only', () => {
    const input = debugElement.nativeElement.querySelector('input');
    input.dispatchEvent(new InputEvent('input'));
    expect(input.readOnly).toBe(true);
  });

  it('rate should be auto focus', () => {
    const rangeCmp: RangeComponent = debugElement.query(By.directive(RangeComponent)).componentInstance;
    expect(rangeCmp.min).toBe(5);
  });

  it('should listen to nativeElement event', () => {
    const input = debugElement.nativeElement.querySelector('input');
    input.dispatchEvent(new InputEvent('input'));
    expect(inputChangeFn).toHaveBeenCalled();
  });

  it('should listen to valueChange event', () => {
    const input = debugElement.nativeElement.querySelector('input');
    input.dispatchEvent(new InputEvent('input'));
    expect(valueChangeFn).toHaveBeenCalled();
  });

  it('should listen to statusChange event', () => {
    const input = debugElement.nativeElement.querySelector('input');
    input.dispatchEvent(new InputEvent('input'));
    expect(statusChangeFn).toHaveBeenCalled();
  });

  it('should listen to custom event', () => {
    const rangeCmp: RangeComponent = debugElement.query(By.directive(RangeComponent)).componentInstance;
    rangeCmp.testChange.emit();
    expect(testChangeFn).toHaveBeenCalled();
  });
});
