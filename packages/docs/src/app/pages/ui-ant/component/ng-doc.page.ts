import { NgDocPage } from '@ng-doc/core';
import UIZorroCategory from '../ng-doc.category';
import { ZorroStyleComponent } from '../style';
import { AlertExampleComponent } from './examples/alert';
import { ButtonExampleComponent } from './examples/button';
import { HeadingExampleComponent } from './examples/heading';

const ComponentPage: NgDocPage = {
  title: 'Component',
  mdFile: './index.md',
  category: UIZorroCategory,
  demos: {
    ButtonExampleComponent,
    AlertExampleComponent,
    HeadingExampleComponent,
    ZorroStyleComponent
  },
  order: 5
};

export default ComponentPage;
