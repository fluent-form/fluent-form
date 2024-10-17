import { NgDocPage } from '@ng-doc/core';
import UIZorroCategory from '../ng-doc.category';
import { ZorroStyleComponent } from '../style';
import { SpaceCompactExampleComponent } from './examples/space-compact.component';
import { SpaceExampleComponent } from './examples/space.component';

const ControlWrapperPage: NgDocPage = {
  title: 'Control Wrapper',
  mdFile: './index.md',
  category: UIZorroCategory,
  demos: {
    SpaceCompactExampleComponent,
    SpaceExampleComponent,
    ZorroStyleComponent
  },
  order: 3
};

export default ControlWrapperPage;
