import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import zh from '@angular/common/locales/zh';
import { Directive, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SafeAny } from '@ngify/types';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FluentFormComponent, FluentFormModule, SchemaType, withAllWidgets, withSchemaPatchers, withStaticExpression } from 'ngx-fluent-form';

registerLocaleData(zh);

export const defineMeta = (meta?: Meta) => ({
  decorators: [
    moduleMetadata({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        NzGridModule,
        NzTableModule,
        FluentFormModule.forRoot(
          withAllWidgets(),
          withStaticExpression(),
          withSchemaPatchers(
            {
              selector: SchemaType.Component | SchemaType.ComponentWrapper,
              patch: schema => schema
            },
            {
              selector: { component: true, controlWrapper: true },
              patch: schema => schema
            },
            {
              selector: '*',
              patch: schema => schema
            },
            {
              selector: 'input',
              patch: schema => schema
            },
            {
              selector: ['input', 'number'],
              patch: schema => schema
            }
          )
        ),
        HttpClientModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: NZ_I18N, useValue: zh_CN }
      ],
    }),
  ],
  argTypes: {
    schema: {
      control: 'object'
    },
    model: {
      control: 'object'
    },
    layout: {
      control: 'radio',
      options: ['vertical', 'horizontal', 'inline'],
    },
    gutter: {
      control: 'object',
      defaultValue: { xs: 8, sm: 16, md: 24, lg: 32, xl: 32, xxl: 32 }
    }
  },
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        format: true
      }
    }
  },
  ...meta
});

export const defineStory = <T>(story?: Partial<Story<T>>): Story<T> => Object.assign(
  (args => ({ props: args })) as Story<T>,
  story
);

@Directive()
export abstract class AbstractFluentFormWrapperComponent {
  @Input() schema!: FluentFormComponent<SafeAny>['schema'];
  @Input() model!: FluentFormComponent<SafeAny>['model'];
  @Input() layout: FluentFormComponent<SafeAny>['layout'] = 'vertical';
  @Input() colon: FluentFormComponent<SafeAny>['colon'] = true;
  @Input() gutter!: FluentFormComponent<SafeAny>['gutter'];
}
