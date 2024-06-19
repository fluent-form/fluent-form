import { NgDocPage } from '@ng-doc/core';
import UIZorroCategory from '../ng-doc.category';
import { ZorroStyleComponent } from '../style';
import { ControlDefaultValueExampleComponent } from './examples/control-default-value.component';
import { ControlDisabledExampleComponent } from './examples/control-disabled.component';
import { ControlHintExampleComponent } from './examples/control-hint.component';
import { ControlLabelExampleComponent } from './examples/control-label.component';
import { ControlLinkageExampleComponent } from './examples/control-linkage.component';
import { ControlMapperExampleComponent } from './examples/control-mapper.component';
import { ControlMultiKeyExampleComponent } from './examples/control-multi-key.component';
import { ControlPathKeyExampleComponent } from './examples/control-path-key.component';
import { ControlSelectCustomOptionContentExampleComponent } from './examples/control-select-custom-option-content.component';
import { ControlSelectRemoteDataExampleComponent } from './examples/control-select-remote-data.component';
import { ControlUpdateOnExampleComponent } from './examples/control-update-on.component';
import { ControlValidationExampleComponent } from './examples/control-validation.component';

const ControlPage: NgDocPage = {
  title: 'Control',
  mdFile: './index.md',
  category: UIZorroCategory,
  demos: {
    ControlLabelExampleComponent,
    ControlDefaultValueExampleComponent,
    ControlDisabledExampleComponent,
    ControlHintExampleComponent,
    ControlLinkageExampleComponent,
    ControlMapperExampleComponent,
    ControlMultiKeyExampleComponent,
    ControlPathKeyExampleComponent,
    ControlUpdateOnExampleComponent,
    ControlValidationExampleComponent,
    ControlSelectCustomOptionContentExampleComponent,
    ControlSelectRemoteDataExampleComponent,
    ZorroStyleComponent
  },
  order: 1
};

export default ControlPage;
