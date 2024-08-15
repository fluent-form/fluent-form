import { NgDocPage } from '@ng-doc/core';
import UIZorroCategory from '../ng-doc.category';
import { ZorroStyleComponent } from '../style';
import { CascaderAsyncOptionsExampleComponent } from './examples/cascader-async-options.component';
import { CascaderCustomPropertyNamesExampleComponent } from './examples/cascader-custom-property-names.component';
import { CascaderExampleComponent } from './examples/cascader.component';
import { CheckboxGroupCustomPropertyNamesExampleComponent } from './examples/checkbox-group-custom-property-names.component';
import { CheckboxGroupExampleComponent } from './examples/checkbox-group.component';
import { CheckboxExampleComponent } from './examples/checkbox.component';
import { DateRangeExampleComponent } from './examples/date-range.component';
import { DateExampleComponent } from './examples/date.component';
import { NumberExampleComponent } from './examples/number.component';
import { RadioGroupExampleComponent } from './examples/radio-group.component';
import { RateExampleComponent } from './examples/rate.component';
import { SelectAsyncOptionsExampleComponent } from './examples/select-async-options.component';
import { SelectCustomOptionContentExampleComponent } from './examples/select-custom-option-content.component';
import { SelectCustomPropertyNamesExampleComponent } from './examples/select-custom-property-names.component';
import { SelectExampleComponent } from './examples/select.component';
import { SliderExampleComponent } from './examples/slider.component';
import { TextExampleComponent } from './examples/text.component';
import { TextareaExampleComponent } from './examples/textarea.component';
import { TimeExampleComponent } from './examples/time.component';
import { ToggleExampleComponent } from './examples/toggle.component';
import { TreeSelectExampleComponent } from './examples/tree-select.component';

const ControlPage: NgDocPage = {
  title: 'Control',
  mdFile: './index.md',
  category: UIZorroCategory,
  demos: {
    ZorroStyleComponent,
    TextExampleComponent,
    TextareaExampleComponent,
    NumberExampleComponent,
    DateExampleComponent,
    DateRangeExampleComponent,
    TimeExampleComponent,
    ToggleExampleComponent,
    SelectExampleComponent,
    SelectAsyncOptionsExampleComponent,
    SelectCustomOptionContentExampleComponent,
    SelectCustomPropertyNamesExampleComponent,
    CascaderExampleComponent,
    CascaderAsyncOptionsExampleComponent,
    CascaderCustomPropertyNamesExampleComponent,
    TreeSelectExampleComponent,
    SliderExampleComponent,
    RadioGroupExampleComponent,
    CheckboxExampleComponent,
    CheckboxGroupExampleComponent,
    CheckboxGroupCustomPropertyNamesExampleComponent,
    RateExampleComponent,
  },
  order: 2
};

export default ControlPage;
