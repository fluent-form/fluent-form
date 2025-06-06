import { NgDocPage } from '@ng-doc/core';
import { ZorroStyleComponent } from '../../ui-ant/style';
import BlogsCategory from '../ng-doc.category';
import { CrudExampleComponent } from './examples/crud/crud.component';

const BlogPage: NgDocPage = {
  title: '位掩码与权限系统',
  category: BlogsCategory,
  mdFile: './index.md',
  demos: {
    CrudExampleComponent,
    ZorroStyleComponent
  }
};

export default BlogPage;
