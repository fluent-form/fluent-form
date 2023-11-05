/**
 * @type {import('@docgeni/core').DocgeniConfig}
 */
module.exports = {
    mode: 'lite',
    title: 'ngx-fluent-form',
    description: '',
    logoUrl: './assets/logo.svg',
    docsDir: 'docs',
    outputDir: 'dist/docs-site',
    repoUrl: 'https://github.com/HyperLife1119/ngx-fluent-form',
    footer: 'Open-source MIT Licensed',
    navs: [
        null,
        {
            title: 'API',
            path: 'api',
            lib: 'ngx-fluent-form',
            locales: {}
        },
        {
            title: 'GitHub',
            path: 'https://github.com/HyperLife1119/ngx-fluent-form',
            isExternal: true
        },
    ],
    libs: [
        {
            name: 'ngx-fluent-form',
            abbrName: 'fluent',
            rootDir: './projects/ngx-fluent-form',
            include: [
                'src/components',
                'src',
            ],
            exclude: [
                'components',
                'widgets',
            ],
            apiMode: 'automatic',
            categories: [
                // {
                //     "id": "general",
                //     "title": "通用",
                //     "locales": {
                //         "en-us": {
                //             "title": "General"
                //         }
                //     }
                // },
            ]
        }
    ]
};
