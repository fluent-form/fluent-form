import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AbstractWidgetWrapper } from '../components';
import { form } from '../compose';
import { FluentFormModule } from '../module';
import { provideFluentForm } from '../provider';
import { FormFieldWrapper, textField, useAllWidgets, withTesting } from '../testing';
import { FluentNextWidgetWrapperOutlet } from './next-widget-wrapper-outlet.directive';

describe('FluentWidgetWrapperOutlet', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withTesting(useAllWidgets())
        )
      ]
    });
  });

  it('should render widget wrapper', async () => {
    const fixture = TestBed.createComponent(TestWrapperComponent);
    const debugElement = fixture.debugElement;

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const wrapperElement: HTMLElement = debugElement.nativeElement.querySelector('fluent-col > .form-field-wrapper');
    const labelElement: HTMLElement = debugElement.nativeElement.querySelector('fluent-col > .form-field-wrapper > label');
    const inputElement: HTMLElement = debugElement.nativeElement.querySelector('fluent-col > .form-field-wrapper > input');

    expect(wrapperElement).toBeTruthy();
    expect(labelElement.textContent?.trim()).toBe('TextField');
    expect(inputElement).toBeTruthy();
  });

  it('should render next widget wrapper', async () => {
    const fixture = TestBed.createComponent(TestNextWrapperComponent);
    const debugElement = fixture.debugElement;

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const wrapperElement: HTMLElement = debugElement.nativeElement.querySelector('fluent-col > .form-field-wrapper');
    const labelElement: HTMLElement = debugElement.nativeElement.querySelector('fluent-col > .form-field-wrapper > label');
    const nextWrapperElement: HTMLElement = debugElement.nativeElement.querySelector('fluent-col > .form-field-wrapper > .border-wrapper');
    const inputElement: HTMLElement = debugElement.nativeElement.querySelector('fluent-col > .form-field-wrapper > .border-wrapper > input');

    expect(wrapperElement).toBeTruthy();
    expect(nextWrapperElement).toBeTruthy();
    expect(labelElement.textContent?.trim()).toBe('TextField');
    expect(inputElement).toBeTruthy();
  });
});

@Component({
  imports: [FluentFormModule],
  template: `<fluent-form [schema]="schema()" [(model)]="model" />`
})
export class TestWrapperComponent {
  readonly schema = form(() => {
    textField('txt').label('TextField');
  });

  readonly model = signal({});
}

@Component({
  imports: [FluentFormModule],
  template: `<fluent-form [schema]="schema()" [(model)]="model" />`
})
export class TestNextWrapperComponent {
  readonly schema = form(() => {
    textField('txt').label('TextField').wrappers([
      FormFieldWrapper,
      BorderedWrapper
    ]);
  });

  readonly model = signal({});
}

@Component({
  imports: [FluentNextWidgetWrapperOutlet],
  template: `
    <ng-template let-control="control" let-schema="schema" let-model="model" let-next="next">
      <div class="border-wrapper">
         <ng-container [fluentNextWidgetWrapperOutlet]="{ schema, control, model, next }" />
      </div>
    </ng-template>
  `
})
export class BorderedWrapper extends AbstractWidgetWrapper { }
