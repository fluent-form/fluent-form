import { NgDocPage } from '@ng-doc/core';
import { ZorroStyleComponent } from '../../ui-ant/style';
import AdvancedCategory from '../ng-doc.category';
import { NamedTemplateExampleComponent } from './examples/named-template.component';
import { UpdateSchemaExampleComponent } from './examples/update-schema.component';

const TipsAndTricksPage: NgDocPage = {
  title: 'Tips & Tricks',
  category: AdvancedCategory,
  mdFile: './index.md',
  demos: {
    NamedTemplateExampleComponent,
    UpdateSchemaExampleComponent,
    ZorroStyleComponent
  },
  order: 3
};

export default TipsAndTricksPage;
