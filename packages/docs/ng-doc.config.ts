import { NgDocConfiguration } from '@ng-doc/builder';
import { ngKeywordsLoader } from '@ng-doc/keywords-loaders';

const config: NgDocConfiguration = {
  cache: false,
  keywords: {
    loaders: [ngKeywordsLoader()],
  },
  repoConfig: {
    url: 'https://github.com/fluent-form/fluent-form',
    mainBranch: 'main',
    releaseBranch: 'main',
  },
};

export default config;
