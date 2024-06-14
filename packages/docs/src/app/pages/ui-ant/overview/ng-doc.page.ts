import { NgDocPage } from '@ng-doc/core';
import UIZorroCategory from '../ng-doc.category';
import { ZorroStyleComponent } from '../style';
import { OverviewExampleComponent } from './examples/overview.component';

const OverviewPage: NgDocPage = {
  title: 'Overview',
  mdFile: './index.md',
  category: UIZorroCategory,
  demos: {
    OverviewExampleComponent,
    ZorroStyleComponent
  },
  order: Infinity,
  hidden: true
};

export default OverviewPage;
