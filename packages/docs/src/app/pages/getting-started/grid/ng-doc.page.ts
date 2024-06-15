import { NgDocPage } from '@ng-doc/core';
import GettingStartedCategory from '../ng-doc.category';
import { GridAlignExampleComponent } from './examples/align/align.component';
import { GridBasicExampleComponent } from './examples/basic/basic.component';
import { GridFillExampleComponent } from './examples/fill/fill.component';
import { GridFitExampleComponent } from './examples/fit/fit.component';
import { GridFlexExampleComponent } from './examples/flex/flex.component';
import { GridJustifyExampleComponent } from './examples/justify/justify.component';
import { GridOffsetExampleComponent } from './examples/offset/offset.component';
import { GridResponsiveExampleComponent } from './examples/responsive/responsive.component';

const GridPage: NgDocPage = {
  title: 'Grid',
  mdFile: './index.md',
  category: GettingStartedCategory,
  demos: {
    GridBasicExampleComponent,
    GridAlignExampleComponent,
    GridFillExampleComponent,
    GridFitExampleComponent,
    GridFlexExampleComponent,
    GridJustifyExampleComponent,
    GridOffsetExampleComponent,
    GridResponsiveExampleComponent
  },
  hidden: true
};

export default GridPage;
