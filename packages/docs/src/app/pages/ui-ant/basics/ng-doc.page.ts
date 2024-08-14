import { NgDocPage } from '@ng-doc/core';
import UIZorroCategory from '../ng-doc.category';
import { ZorroStyleComponent } from '../style';
import { DefaultValueExampleComponent } from './examples/default-value.component';
import { DisabledExampleComponent } from './examples/disabled.component';
import { HintExampleComponent } from './examples/hint.component';
import { LabelExampleComponent } from './examples/label.component';
import { LinkageExampleComponent } from './examples/linkage.component';
import { MapperExampleComponent } from './examples/mapper.component';
import { MultiKeyExampleComponent } from './examples/multi-key.component';
import { PathKeyExampleComponent } from './examples/path-key.component';
import { UpdateOnExampleComponent } from './examples/update-on.component';
import { ValidationExampleComponent } from './examples/validation.component';

const BasicsPage: NgDocPage = {
  title: 'Basics',
  mdFile: './index.md',
  category: UIZorroCategory,
  demos: {
    LabelExampleComponent,
    DefaultValueExampleComponent,
    DisabledExampleComponent,
    HintExampleComponent,
    LinkageExampleComponent,
    MapperExampleComponent,
    MultiKeyExampleComponent,
    PathKeyExampleComponent,
    UpdateOnExampleComponent,
    ValidationExampleComponent,
    ZorroStyleComponent
  },
  order: 1
};

export default BasicsPage;
