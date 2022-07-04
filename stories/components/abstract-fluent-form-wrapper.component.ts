import { Directive, Input } from '@angular/core';
import { FluentFormComponent } from 'ngx-fluent-form';

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