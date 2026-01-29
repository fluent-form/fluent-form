import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { AbstractWidgetWrapper, FluentFormModule, FluentNextWidgetWrapperOutlet, form } from '@fluent-form/core';
import { FormFieldWrapper, textField } from '@fluent-form/ui-zorro';

@Component({
  selector: 'custom-wrapper-example',
  imports: [FluentFormModule, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model" />
    <pre>{{ model() | json }}</pre>
  `
})
export class CustomWrapperExampleComponent {
  readonly schema = form(() => {
    textField('text1').label('Wrapped field').wrappers([
      FormFieldWrapper,
      BorderedWrapper
    ]);
    textField('text2').label('Wrapped field').wrappers([
      BorderedWrapper,
      FormFieldWrapper
    ]);
  });

  readonly model = signal({});
}

@Component({
  imports: [FluentNextWidgetWrapperOutlet],
  template: `
    <ng-template let-control="control" let-schema="schema" let-model="model" let-next="next">
      <div class="custom-border-wrapper" style="border: 1px dashed #ec4899;">
         <ng-container [fluentNextWidgetWrapperOutlet]="{ schema, control, model, next }" />
      </div>
    </ng-template>
  `
})
export class BorderedWrapper extends AbstractWidgetWrapper { }
