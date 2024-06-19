import { NgDocPage } from '@ng-doc/core';
import UIZorroCategory from '../ng-doc.category';
import { ZorroStyleComponent } from '../style';
import { StepByStepFormExampleComponent } from './examples/step-by-step-form.component';
import { TabsFormExampleComponent } from './examples/tabs-form.component';

const ComponentContainerPage: NgDocPage = {
  title: 'Component Container',
  mdFile: './index.md',
  category: UIZorroCategory,
  demos: {
    StepByStepFormExampleComponent,
    TabsFormExampleComponent,
    ZorroStyleComponent
  },
  order: 6
};

export default ComponentContainerPage;
