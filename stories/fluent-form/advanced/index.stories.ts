import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Component } from '@angular/core';
import { AbstractFluentFormWrapperComponent } from '../../components/abstract-fluent-form-wrapper.component';
import { createMeta } from '../../storybook.utils';

registerLocaleData(zh);

@Component({
  selector: 'fluent-form-warpper',
  template: `
    <fluent-form
      [schemas]="schemas"
      [(model)]="model"
      [layout]="layout"
      [colon]="colon"
      [spinning]="spinning"
      [spinTip]="spinTip"
      [spinSize]="spinSize"></fluent-form>
    <pre>{{ model | json }}</pre>
  `,
  styleUrls: ['../../components/abstract-fluent-form-wrapper.component.scss']
})
class FluentFormWrapperComponent extends AbstractFluentFormWrapperComponent { }

export default createMeta({
  title: 'FluentForm/Advanced',
  component: FluentFormWrapperComponent,
});

export * from './form-validation.story';

