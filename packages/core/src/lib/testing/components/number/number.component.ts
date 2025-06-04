import { ChangeDetectionStrategy, Component, forwardRef, input, model, output } from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'fluent-number',
  standalone: true,
  template: `num()`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberComponent),
      multi: true
    }
  ]
})
export class NumberComponent implements ControlValueAccessor {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = (value: number) => { };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => { };

  num = model<number | undefined>(1);
  min = input(0);
  max = input(100);

  testChange = output();

  writeValue(value: number): void {
    this.num.set(value);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDisabledState?(isDisabled: boolean): void { }
}
