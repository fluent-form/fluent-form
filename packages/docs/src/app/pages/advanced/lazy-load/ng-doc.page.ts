import { NgDocPage } from '@ng-doc/core';
import { ZorroStyleComponent } from '../../ui-ant/style';
import AdvancedCategory from '../ng-doc.category';
import { LazyLoadExampleComponent } from './examples/lazy-load/lazy-load.component';

const LazyLoadPage: NgDocPage = {
  title: 'Lazy Load',
  category: AdvancedCategory,
  mdFile: './index.md',
  demos: {
    LazyLoadExampleComponent,
    ZorroStyleComponent
  },
  order: 3
};

export default LazyLoadPage;
