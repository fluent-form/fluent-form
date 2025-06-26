import { NgDocPage } from '@ng-doc/core';
import UIZorroCategory from '../ng-doc.category';
import { ZorroStyleComponent } from '../style';
import { CardsArrayExampleComponent } from './examples/cards-array.component';
import { FormArrayExampleComponent } from './examples/form-array.component';
import { FormGroupExampleComponent } from './examples/form-group.component';
import { FormLayoutExampleComponent } from './examples/form-layout.component';
import { RootFormExampleComponent } from './examples/root-form.component';
import { TableArrayExampleComponent } from './examples/table-array.component';
import { TabsArrayExampleComponent } from './examples/tabs-array.component';

const ControlContainerPage: NgDocPage = {
  title: 'Control Container',
  mdFile: './index.md',
  category: UIZorroCategory,
  demos: {
    RootFormExampleComponent,
    FormLayoutExampleComponent,
    FormArrayExampleComponent,
    FormGroupExampleComponent,
    TabsArrayExampleComponent,
    CardsArrayExampleComponent,
    TableArrayExampleComponent,
    ZorroStyleComponent
  },
  order: 4
};

export default ControlContainerPage;
