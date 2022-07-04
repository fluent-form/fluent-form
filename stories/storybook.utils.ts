import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { FluentFormModule } from 'ngx-fluent-form';

export const createMeta = (meta: Meta) => (
  Object.assign({
    decorators: [
      moduleMetadata({
        imports: [
          FluentFormModule,
          BrowserModule,
          FormsModule,
          HttpClientModule,
          BrowserAnimationsModule,
        ],
        providers: [{ provide: NZ_I18N, useValue: zh_CN }],
      }),
    ],
    argTypes: {
      schemas: {
        control: 'object'
      },
      model: {
        control: 'object'
      },
      layout: {
        control: 'radio',
        options: ['vertical', 'horizontal', 'inline'],
      },
      spinSize: {
        control: 'radio',
        options: ['large', 'default', 'small'],
      },
    },
  }, meta) as Meta
);

export const createStory = <T>(story: Partial<Story<T>>): Story<T> => (
  Object.assign((args => ({ props: args })) as Story<T>, story)
);