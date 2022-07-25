import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import zh from '@angular/common/locales/zh';
import { Directive, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FluentFormComponent, FluentFormModule } from 'ngx-fluent-form';

registerLocaleData(zh);

export const defineMeta = (meta?: Meta) => ({
  decorators: [
    moduleMetadata({
      imports: [
        FormsModule,
        BrowserModule,
        NzGridModule,
        NzTableModule,
        FluentFormModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: NZ_I18N, useValue: zh_CN }
      ],
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

export const defineStory = <T>(story?: Partial<Story<T>>): Story<T> => (
  Object.assign((args => ({ props: args })) as Story<T>, story)
);

@Directive()
export abstract class AbstractFluentFormWrapperComponent {
  @Input() schemas!: FluentFormComponent<any>['schemas'];
  @Input() model!: FluentFormComponent<any>['model'];
  @Input() layout: FluentFormComponent<any>['layout'] = 'vertical';
  @Input() colon: FluentFormComponent<any>['colon'] = true;
  @Input() spinning: FluentFormComponent<any>['spinning'] = false;
  @Input() spinTip: FluentFormComponent<any>['spinTip'] = 'Loading...';
  @Input() spinSize: FluentFormComponent<any>['spinSize'] = 'large';
}