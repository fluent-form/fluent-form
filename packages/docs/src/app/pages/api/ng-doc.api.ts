import { NgDocApi } from '@ng-doc/core';

const Api: NgDocApi = {
  title: 'API',
  order: Infinity,
  scopes: [
    {
      name: '@fluent-form/core',
      route: 'core',
      include: 'packages/core/src/**/*.ts',
      exclude: 'packages/core/src/**/*.spec.ts'
    },
    {
      name: '@fluent-form/ui-zorro',
      route: 'ui-zorro',
      include: 'packages/ui-zorro/src/**/*.ts',
      exclude: 'packages/ui-zorro/src/**/*.spec.ts'
    },
  ],
};

export default Api;
