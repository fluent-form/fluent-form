import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRateComponent, NzRateModule } from 'ng-zorro-antd/rate';
import { input, rate } from '../builders';
import { ControlSchema } from '../schemas';
import { createFormControl, standardSchema } from '../utils';
import { FluentBinderDirective } from './fluent-binder.directive';

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
        input: () => { },
        valueChange: () => { },
        statusChange: () => { },
      })
  );
  rateSchema = standardSchema(
    rate('rat')
      .property({
        nzAutoFocus: true
      })
      .listener({
        valueChange: () => { },
        statusChange: () => { },
        nzOnFocus: () => { }
      })
  );

  inputControl = createFormControl(this.inputSchema as ControlSchema);
  rateControl = createFormControl(this.rateSchema as ControlSchema);

}

describe('FluentBinderDirective', () => {
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
    const readOnly = debugElement.nativeElement.querySelector('input').readOnly;
    expect(readOnly).toBe(true);
  });

  it('rate should be auto focus', () => {
    const focus = debugElement.query(By.directive(NzRateComponent)).componentInstance.nzAutoFocus;
    expect(focus).toBe(true);
  });
});
