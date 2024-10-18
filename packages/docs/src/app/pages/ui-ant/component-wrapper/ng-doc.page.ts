import { NgDocPage } from '@ng-doc/core';
import UIZorroCategory from '../ng-doc.category';
import { ZorroStyleComponent } from '../style';
import { ButtonGroupExampleComponent } from './examples/button-group.component';

const ComponentWrapperPage: NgDocPage = {
  title: 'Component Wrapper',
  mdFile: './index.md',
  category: UIZorroCategory,
  demos: {
    ZorroStyleComponent,
    ButtonGroupExampleComponent
  },
  order: 6
};

export default ComponentWrapperPage;
