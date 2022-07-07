module.exports = {
  stories: [
    '../stories/**/*.(story|stories).mdx',
    '../stories/**/*.(story|stories).@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    // {
    //   name: '@storybook/addon-storysource',
    //   options: {
    //     rule: {
    //       include: [path.resolve(__dirname, '../projects/ngx-fluent-form/src')], // You can specify directories
    //     },
    //     loaderOptions: {
    //       parser: 'typescript',
    //       prettierConfig: { printWidth: 80, singleQuote: false },
    //     },
    //   },
    // },
  ],
  framework: '@storybook/angular',
  core: {
    builder: '@storybook/builder-webpack5'
  },
  features: {
    // storyStoreV7: true,
    // buildStoriesJson: true,
    // babelModeV7: true,
    // modernInlineRender: true,
    // previewMdx2: true,
  }
}