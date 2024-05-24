import { Component, DebugElement, inject } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideFluentForm } from '../provider';
import { InputControlSchema, withTesting } from '../testing';
import { RangeComponent } from '../testing/components';
import { FormUtil } from '../utils';
import { FluentBindingDirective } from './binding.directive';

// eslint-disable-next-line
function emptyFn() { }

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
      input: emptyFn,
      valueChange: emptyFn,
      statusChange: emptyFn,
    }
  };
  rangeSchema = {
    kind: 'range',
    key: 'range',
    properties: {
      min: 5
    },
    listeners: {
      valueChange: emptyFn,
      statusChange: emptyFn,
      testChange: emptyFn
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
    rangeCmp.testChange.emit();
    expect(rangeCmp.min).toBe(5);
  });
});
