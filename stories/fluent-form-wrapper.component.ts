import { HttpClientModule } from '@angular/common/http';
import { Component, Input, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FluentFormComponent, FluentFormModule } from '../projects/ngx-fluent-form/src/public-api';

@Component({
  selector: 'fluent-form-warpper',
  template: `
    <fluent-form
      [schemas]="schemas"
      [model]="model"
      [layout]="layout"
      [colon]="colon"
      [spinning]="spinning"
      [spinTip]="spinTip"
      [spinSize]="spinSize"></fluent-form>
    <pre>{{ model | json }}</pre>
  `,
  styles: [`
    :host       { display: flex; }
    :host > *   { flex-shrink: 0 }
    fluent-form { flex: 2; }
    pre         { flex: 1; background: #f5f5f5; margin-left: 15px; }
  `]
})
export class FluentFormWrapperComponent {
  @Input() schemas!: FluentFormComponent<any>['schemas'];
  @Input() model!: FluentFormComponent<any>['model'];
  @Input() layout: FluentFormComponent<any>['layout'] = 'vertical';
  @Input() colon: FluentFormComponent<any>['colon'] = true;
  @Input() spinning: FluentFormComponent<any>['spinning'] = false;
  @Input() spinTip: FluentFormComponent<any>['spinTip'] = 'Loading...';
  @Input() spinSize: FluentFormComponent<any>['spinSize'] = 'large';
}

@NgModule({
  declarations: [FluentFormWrapperComponent],
  imports: [
    FluentFormModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ]
})
export class FluentFormWrapperModule { }