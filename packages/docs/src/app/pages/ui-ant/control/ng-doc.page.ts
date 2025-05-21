import { NgDocPage } from '@ng-doc/core';
import UIZorroCategory from '../ng-doc.category';
import { ZorroStyleComponent } from '../style';
import { CascaderAsyncOptionsExampleComponent } from './examples/cascader-async-options.component';
import { CascaderExampleComponent } from './examples/cascader.component';
import { CheckboxGroupExampleComponent } from './examples/checkbox-group.component';
import { CheckboxExampleComponent } from './examples/checkbox.component';
import { ColorExampleComponent } from './examples/color.component';
import { DatePickerExampleComponent } from './examples/date-picker.component';
import { DateRangePickerExampleComponent } from './examples/date-range-picker.component';
import { NumberFieldExampleComponent } from './examples/number-field.component';
import { RadioGroupExampleComponent } from './examples/radio-group.component';
import { RateExampleComponent } from './examples/rate.component';
import { SelectAsyncOptionsExampleComponent } from './examples/select-async-options.component';
import { SelectCustomOptionContentExampleComponent } from './examples/select-custom-option-content.component';
import { SelectExampleComponent } from './examples/select.component';
import { SliderExampleComponent } from './examples/slider.component';
import { TextAreaExampleComponent } from './examples/text-area.component';
import { TextFieldExampleComponent } from './examples/text-field.component';
import { TimePickerExampleComponent } from './examples/time-picker.component';
import { ToggleExampleComponent } from './examples/toggle.component';
import { TransferExampleComponent } from './examples/transfer.component';
import { TreeSelectExampleComponent } from './examples/tree-select.component';

const ControlPage: NgDocPage = {
  title: 'Control',
  mdFile: './index.md',
  category: UIZorroCategory,
  demos: {
    ZorroStyleComponent,
    TextFieldExampleComponent,
    TextAreaExampleComponent,
    NumberFieldExampleComponent,
    DatePickerExampleComponent,
    DateRangePickerExampleComponent,
    TimePickerExampleComponent,
    ToggleExampleComponent,
    SelectExampleComponent,
    SelectAsyncOptionsExampleComponent,
    SelectCustomOptionContentExampleComponent,
    CascaderExampleComponent,
    CascaderAsyncOptionsExampleComponent,
    TreeSelectExampleComponent,
    SliderExampleComponent,
    RadioGroupExampleComponent,
    CheckboxExampleComponent,
    CheckboxGroupExampleComponent,
    RateExampleComponent,
    TransferExampleComponent,
    ColorExampleComponent,
  },
  order: 2
};

export default ControlPage;
