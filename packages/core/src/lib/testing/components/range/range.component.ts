import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'fluent-range',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './range.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RangeComponent),
      multi: true
    }
  ]
})
export class RangeComponent implements ControlValueAccessor {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = (value: [number, number]) => { };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => { };

  value: [number, number] = [0, 10];

  @Input() min = 0;
  @Input() max = 10;

  @Output() testChange = new EventEmitter<void>();

  writeValue(value: [number, number]): void {
    this.value = value ?? [];
  }

  registerOnChange(fn: (value: [number, number]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDisabledState?(isDisabled: boolean): void { }

}
