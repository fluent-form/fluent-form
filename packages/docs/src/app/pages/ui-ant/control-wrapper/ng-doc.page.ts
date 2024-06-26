import { NgDocPage } from '@ng-doc/core';
import UIZorroCategory from '../ng-doc.category';
import { ZorroStyleComponent } from '../style';
import { InputGroupExampleComponent } from './examples/input-group.component';
import { NumberGroupExampleComponent } from './examples/number-group.component';

const ControlWrapperPage: NgDocPage = {
  title: 'Control Wrapper',
  mdFile: './index.md',
  category: UIZorroCategory,
  demos: {
    InputGroupExampleComponent,
    NumberGroupExampleComponent,
    ZorroStyleComponent
  },
  order: 2
};

export default ControlWrapperPage;
