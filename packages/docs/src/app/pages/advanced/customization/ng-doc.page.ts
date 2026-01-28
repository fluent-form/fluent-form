import { NgDocPage } from '@ng-doc/core';
import { ZorroStyleComponent } from '../../ui-ant/style';
import AdvancedCategory from '../ng-doc.category';
import { CustomLayoutExampleComponent } from './examples/custom-layout/custom-layout.component';
import { CustomTemplateExampleComponent } from './examples/custom-template/custom-template.component';
import { CustomWrapperExampleComponent } from './examples/custom-wrapper.component';

/**
 * @status:success UPDATED
 */
const CustomizationPage: NgDocPage = {
  title: 'Customization',
  category: AdvancedCategory,
  mdFile: './index.md',
  demos: {
    CustomLayoutExampleComponent,
    CustomTemplateExampleComponent,
    CustomWrapperExampleComponent,
    ZorroStyleComponent
  },
  order: 1
};

export default CustomizationPage;
