import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AbstractWidgetWrapper, FLUENT_WIDGET_WRAPPERS, FluentFormModule, FluentNextWidgetWrapperOutlet, form } from '@fluent-form/core';
import { textField } from '@fluent-form/ui-zorro';

@Component({
  selector: 'custom-wrapper-example',
  imports: [FluentFormModule, JsonPipe],
  template: `
    <fluent-form [schema]="schema()" [(model)]="model">
      <ng-template
        fluentTemplate="namedWrapper"
        let-control="control"
        let-schema="schema"
        let-model="model"
        let-next="next">
        <div class="shadow-lg hover:scale-110 transition">
          <ng-container [fluentNextWidgetWrapperOutlet]="{ schema, control, model, next }" />
        </div>
      </ng-template>
    </fluent-form>
    <pre>{{ model() | json }}</pre>
  `
})
export class CustomWrapperExampleComponent {
  private readonly defaultWrappers = inject(FLUENT_WIDGET_WRAPPERS);

  readonly schema = form(() => {
    textField('text1').label('Wrapped field').wrappers([
      this.defaultWrappers,
      BorderedWrapper
    ]);
    textField('text2').label('Wrapped field').wrappers([
      BorderedWrapper,
      this.defaultWrappers
    ]);
    textField('text3').placeholder('Hover me').wrappers(['namedWrapper']);
    textField('text4').placeholder('No wrappers').wrappers([]);
  });

  readonly model = signal({});
}

@Component({
  imports: [FluentNextWidgetWrapperOutlet],
  template: `
    <ng-template let-control="control" let-schema="schema" let-model="model" let-next="next">
      <div class="custom-border-wrapper" style="border: 1px dashed #ec4899">
         <ng-container [fluentNextWidgetWrapperOutlet]="{ schema, control, model, next }" />
      </div>
    </ng-template>
  `
})
export class BorderedWrapper extends AbstractWidgetWrapper { }
