// @ts-check
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import angular from 'angular-eslint';
// @ts-expect-error eslint-plugin-import is not typed
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      stylistic.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    settings: {
      'import/resolver': {
        typescript: {
          project: 'tsconfig.base.json'
        }
      }
    },
    rules: {
      'import/order': 'warn',
      'import/no-cycle': 'error',
      'import/no-deprecated': 'warn',
      'import/no-unresolved': [
        'error',
        {
          ignore: ['@ng-doc/generated']
        }
      ],

      'no-irregular-whitespace': [
        'error',
        {
          skipStrings: true,
          skipComments: true,
          skipRegExps: true,
          skipTemplates: true
        }
      ],
      'no-constant-condition': [
        'error',
        {
          checkLoops: false
        }
      ],

      '@stylistic/max-len': [
        'error',
        {
          code: 160
        }
      ],
      '@stylistic/quote-props': [
        'error',
        'as-needed'
      ],
      '@stylistic/indent': [
        'error',
        2,
        {
          SwitchCase: 1
        }
      ],
      '@stylistic/linebreak-style': [
        'error',
        'unix'
      ],
      '@stylistic/quotes': [
        'error',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: true
        }
      ],
      '@stylistic/semi': [
        'error',
        'always'
      ],
      '@stylistic/no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 1,
          maxBOF: 0
        }
      ],
      '@stylistic/keyword-spacing': [
        'error',
        {
          before: true
        }
      ],
      '@stylistic/space-before-blocks': [
        'error',
        'always'
      ],
      '@stylistic/block-spacing': [
        'error',
        'always'
      ],
      '@stylistic/object-curly-spacing': [
        'error',
        'always'
      ],
      '@stylistic/space-infix-ops': 'error',
      '@stylistic/key-spacing': [
        'error',
        {
          beforeColon: false,
          afterColon: true
        }
      ],
      '@stylistic/arrow-spacing': [
        'error',
        {
          before: true,
          after: true
        }
      ],
      '@stylistic/comma-spacing': [
        'error',
        {
          before: false,
          after: true
        }
      ],
      '@stylistic/newline-per-chained-call': [
        'error',
        {
          ignoreChainWithDepth: 5
        }
      ],
      '@stylistic/object-curly-newline': [
        'error',
        {
          ObjectExpression: {
            multiline: true,
            consistent: true
          },
          ObjectPattern: {
            multiline: true,
            consistent: true
          },
          ImportDeclaration: {
            multiline: true,
            consistent: true,
            minProperties: 10
          },
          ExportDeclaration: {
            multiline: true,
            consistent: true
          }
        }
      ],
      '@stylistic/object-property-newline': [
        'error',
        {
          allowAllPropertiesOnSameLine: true
        }
      ],
      '@stylistic/array-bracket-newline': [
        'error',
        {
          multiline: true
        }
      ],
      '@stylistic/array-element-newline': [
        'error',
        'consistent'
      ],
      '@stylistic/function-paren-newline': [
        'error',
        'consistent'
      ],
      '@stylistic/brace-style': [
        'error',
        '1tbs'
      ],
      '@stylistic/comma-dangle': [
        'error',
        'never'
      ],
      '@stylistic/arrow-parens': [
        'error',
        'as-needed'
      ],
      '@stylistic/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'semi',
            requireLast: true
          },
          singleline: {
            delimiter: 'comma',
            requireLast: false
          },
        }
      ],
      '@stylistic/operator-linebreak': [
        'error',
        'after',
        {
          overrides: {
            '?': 'before',
            ':': 'before'
          }
        }
      ],

      '@typescript-eslint/no-wrapper-object-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true
        }
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          args: 'none'
        }
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'enumMember',
          format: [
            'PascalCase'
          ]
        }
      ],
      '@typescript-eslint/no-explicit-any': [
        'warn',
        {
          ignoreRestArgs: true
        }
      ],

      '@angular-eslint/component-selector': 'warn',
      '@angular-eslint/component-class-suffix': 'off',
      '@angular-eslint/directive-class-suffix': 'off',
      '@angular-eslint/no-input-rename': 'off',
      '@angular-eslint/no-output-rename': 'off',
      '@angular-eslint/no-host-metadata-property': 'off',
      '@angular-eslint/sort-keys-in-type-decorator': 'error',
      '@angular-eslint/consistent-component-styles': [
        'error',
        'string'
      ]
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      '@angular-eslint/template/label-has-associated-control': 'warn',
      '@angular-eslint/template/click-events-have-key-events': 'warn',
      '@angular-eslint/template/interactive-supports-focus': 'warn',
      '@angular-eslint/template/no-autofocus': 'off',
      '@angular-eslint/template/no-interpolation-in-attributes': 'error',
      '@angular-eslint/template/prefer-control-flow': 'error',
      '@angular-eslint/template/prefer-self-closing-tags': 'error',
      '@angular-eslint/template/prefer-at-empty': 'error',
      '@angular-eslint/template/prefer-static-string-properties': 'error',
      '@angular-eslint/template/prefer-template-literal': 'error',
      '@angular-eslint/template/prefer-contextual-for-variables': 'error',
    },
  }
);
