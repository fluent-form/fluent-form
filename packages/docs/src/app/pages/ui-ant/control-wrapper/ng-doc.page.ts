import { NgDocPage } from '@ng-doc/core';
import UIZorroCategory from '../ng-doc.category';
import { ZorroStyleComponent } from '../style';
import { InputAddonExampleComponent } from './examples/input-addon.component';
import { InputGroupExampleComponent } from './examples/input-group.component';
import { NumberGroupExampleComponent } from './examples/number-group.component';
import { SpaceExampleComponent } from './examples/space.component';

const ControlWrapperPage: NgDocPage = {
  title: 'Control Wrapper',
  mdFile: './index.md',
  category: UIZorroCategory,
  demos: {
    InputGroupExampleComponent,
    InputAddonExampleComponent,
    NumberGroupExampleComponent,
    SpaceExampleComponent,
    ZorroStyleComponent
  },
  order: 3
};

export default ControlWrapperPage;
