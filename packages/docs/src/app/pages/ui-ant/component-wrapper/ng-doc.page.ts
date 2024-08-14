import { NgDocPage } from '@ng-doc/core';
import UIZorroCategory from '../ng-doc.category';
import { ZorroStyleComponent } from '../style';
import { ButtonGroupExampleComponent } from './examples/button-group';

const ComponentWrapperPage: NgDocPage = {
  title: 'Component Wrapper',
  mdFile: './index.md',
  category: UIZorroCategory,
  demos: {
    ButtonGroupExampleComponent,
    ZorroStyleComponent
  },
  order: 6
};

export default ComponentWrapperPage;
