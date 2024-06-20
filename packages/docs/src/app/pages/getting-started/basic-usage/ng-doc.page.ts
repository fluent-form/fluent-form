import { NgDocPage } from '@ng-doc/core';
import { ZorroStyleComponent } from '../../ui-ant/style';
import GettingStartedCategory from '../ng-doc.category';
import { HeroFormExampleComponent } from './examples/hero-form.component';

const BasicUsagePage: NgDocPage = {
  title: 'Basic Usage',
  mdFile: './index.md',
  category: GettingStartedCategory,
  demos: {
    HeroFormExampleComponent,
    ZorroStyleComponent
  },
  order: 2
};

export default BasicUsagePage;
