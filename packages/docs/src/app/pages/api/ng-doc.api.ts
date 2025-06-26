import { NgDocApi } from '@ng-doc/core';

const Api: NgDocApi = {
  title: 'API Reference',
  order: Infinity,
  scopes: [
    {
      name: '@fluent-form/core',
      route: 'core',
      include: 'packages/core/src/index.ts',
      exclude: 'packages/core/src/**/*.spec.ts'
    },
    {
      name: '@fluent-form/ui-zorro',
      route: 'ui-zorro',
      include: 'packages/ui-zorro/src/index.ts',
      exclude: 'packages/ui-zorro/src/**/*.spec.ts'
    }
  ]
};

export default Api;
