import { NgDocPage } from '@ng-doc/core';
import { ZorroStyleComponent } from '../../ui-ant/style';
import GettingStartedCategory from '../ng-doc.category';
import { GridColExampleComponent } from './examples/grid-column.component';
import { GridGapExampleComponent } from './examples/grid-gap.component';
import { GridLayoutExampleComponent } from './examples/grid-layout.component';
import { GridOffsetExampleComponent } from './examples/grid-offset.component';
import { GridResponsiveExampleComponent } from './examples/grid-responsive.component';
import { GridRowExampleComponent } from './examples/grid-row.component';

const LayoutPage: NgDocPage = {
  title: 'Layout',
  mdFile: './index.md',
  category: GettingStartedCategory,
  demos: {
    GridColExampleComponent,
    GridRowExampleComponent,
    GridLayoutExampleComponent,
    GridGapExampleComponent,
    GridOffsetExampleComponent,
    GridResponsiveExampleComponent,
    ZorroStyleComponent
  },
  order: 3
};

export default LayoutPage;
