import { NgDocPage } from '@ng-doc/core';
import { ZorroStyleComponent } from '../../ui-ant/style';
import AdvancedCategory from '../ng-doc.category';
import { DynamicSchemaExampleComponent } from './examples/dynamic-schema.component';
import { NamedTemplateExampleComponent } from './examples/named-template.component';

const TipsAndTricksPage: NgDocPage = {
  title: 'Tips & Tricks',
  category: AdvancedCategory,
  mdFile: './index.md',
  demos: {
    NamedTemplateExampleComponent,
    DynamicSchemaExampleComponent,
    ZorroStyleComponent
  },
  order: 3
};

export default TipsAndTricksPage;
