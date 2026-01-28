import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Directive, inject, Injector } from '@angular/core';
import type { SafeAny } from '@ngify/core';
import { AbstractWidgetWrapper } from '../components/widget-wrapper';
import { FluentWidgetTemplatePipe } from '../pipes';
import { WidgetWrapperTemplateRegistry } from '../services';
import { FluentWithInjectorDirective } from './with-injector.directive';

@Directive({
  selector: '[fluentNextWidgetWrapperOutlet]',
  hostDirectives: [
    {
      directive: NgTemplateOutlet,
      inputs: ['ngTemplateOutletContext: fluentNextWidgetWrapperOutlet']
    }
  ]
})
export class FluentNextWidgetWrapperOutlet {
  constructor() {
    const outlet = inject(NgTemplateOutlet);
    const injector = inject(Injector);
    const wrapperMap = inject(WidgetWrapperTemplateRegistry);

    outlet.ngTemplateOutlet = wrapperMap.get(FluentNextWidgetWrapper);
    outlet.ngTemplateOutletInjector = Injector.create({
      providers: [],
      parent: injector
    });
    outlet.ngOnChanges({ ngTemplateOutlet: {} as SafeAny });
  }
}

@Component({
  imports: [
    AsyncPipe,
    NgTemplateOutlet,
    FluentWidgetTemplatePipe,
    FluentWithInjectorDirective
  ],
  template: `
    <ng-template let-control="control" let-schema="schema" let-model="model" let-next="next">
      @if (next) {
        <ng-container
          fluentWithInjector
          [ngTemplateOutlet]="next.templateRef"
          [ngTemplateOutletContext]="next" />
      } @else {
        <ng-container
          fluentWithInjector
          [ngTemplateOutlet]="schema | widgetTemplate | async"
          [ngTemplateOutletContext]="{ control, schema, model }" />
      }
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FluentNextWidgetWrapper extends AbstractWidgetWrapper { }
