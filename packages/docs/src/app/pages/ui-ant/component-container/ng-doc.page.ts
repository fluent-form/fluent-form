import { NgDocPage } from '@ng-doc/core';
import UIZorroCategory from '../ng-doc.category';
import { ZorroStyleComponent } from '../style';
import { CollapseAccordionExampleComponent } from './examples/collapse-accordion.component';
import { CollapseFormExampleComponent } from './examples/collapse-form.component';
import { StepByStepFormExampleComponent } from './examples/step-by-step-form.component';
import { TabsFormExampleComponent } from './examples/tabs-form.component';

const ComponentContainerPage: NgDocPage = {
  title: 'Component Container',
  mdFile: './index.md',
  category: UIZorroCategory,
  demos: {
    StepByStepFormExampleComponent,
    TabsFormExampleComponent,
    CollapseFormExampleComponent,
    CollapseAccordionExampleComponent,
    ZorroStyleComponent
  },
  order: 7
};

export default ComponentContainerPage;
