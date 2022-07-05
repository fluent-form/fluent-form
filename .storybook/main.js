module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)'
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
  }
}