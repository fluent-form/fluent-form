import { NgDocPage } from '@ng-doc/core';
import { ZorroStyleComponent } from '../../ui-ant/style';
import AdvancedCategory from '../ng-doc.category';
import { StaticExpressionExampleComponent } from './examples/static-expression/static-expression.component';

const JsonSchemaPage: NgDocPage = {
  title: 'JSON Schema',
  category: AdvancedCategory,
  mdFile: './index.md',
  demos: {
    StaticExpressionExampleComponent,
    ZorroStyleComponent
  },
  order: 3
};

export default JsonSchemaPage;
