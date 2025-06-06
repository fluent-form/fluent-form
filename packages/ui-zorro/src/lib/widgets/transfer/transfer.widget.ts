import { Component, Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import {
  AbstractWidget,
  FluentBindingDirective,
  FluentContextGuardDirective,
  FluentReactivePipe,
  FluentTemplatePipe,
  WidgetTemplateContext
} from '@fluent-form/core';
import { SafeAny } from '@ngify/core';
import { NzTransferModule, TransferChange, TransferItem } from 'ng-zorro-antd/transfer';
import { TransferControlSchema } from '../../schemas';

type TransferWidgetTemplateContext = WidgetTemplateContext<TransferControlSchema, FormControl<SafeAny[]>>;

@Pipe({
  name: 'transferItems',
  standalone: true
})
export class TransferItemsPipe implements PipeTransform {
  transform(value: { label: string, value: SafeAny }[]): TransferItem[] {
    return value.map(option => ({
      key: option.value,
      title: option.label
    }));
  }
}

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    NzTransferModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentTemplatePipe,
    FluentReactivePipe,
    TransferItemsPipe
  ],
  templateUrl: './transfer.widget.html'
})
export class TransferWidget extends AbstractWidget<TransferWidgetTemplateContext> {
  onChange(event: TransferChange, control: AbstractControl) {
    const value = control.value ?? [];
    // selected
    if (event.to === 'right') {
      // only add the selected items which are not in the value
      if (!event.list.every(item => value.includes(item['key']))) {
        control.setValue(
          value.concat(event.list.map(item => item['key']))
        );
      }
    } else { // unselected
      control.setValue(
        value.filter((id: string) => !event.list.some(item => item['key'] === id))
      );
    }
  }
}
