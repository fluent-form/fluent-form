import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import zh from '@angular/common/locales/zh';
import { Directive, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SafeAny } from '@ngify/types';
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
  @Input() schemas!: FluentFormComponent<SafeAny>['schemas'];
  @Input() model!: FluentFormComponent<SafeAny>['model'];
  @Input() layout: FluentFormComponent<SafeAny>['layout'] = 'vertical';
  @Input() colon: FluentFormComponent<SafeAny>['colon'] = true;
  @Input() spinning: FluentFormComponent<SafeAny>['spinning'] = false;
  @Input() spinTip: FluentFormComponent<SafeAny>['spinTip'] = 'Loading...';
  @Input() spinSize: FluentFormComponent<SafeAny>['spinSize'] = 'large';
}