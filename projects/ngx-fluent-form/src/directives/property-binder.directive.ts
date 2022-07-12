import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { AbstractComponentSchema, AbstractElementSchema } from '../schemas';

@Directive({
  selector: '[fluentPropertyBinder]'
})
export class PropertyBinderDirective<E extends HTMLElement, C extends object, S extends AbstractElementSchema<E> | AbstractComponentSchema<C>> implements OnChanges {
  @Input() fluentPropertyBinder!: { cmp?: C, schema: S };

  private get host() {
    return this.fluentPropertyBinder.cmp ?? this.elementRef.nativeElement;
  }

  constructor(private elementRef: ElementRef<E>) { }

  ngOnChanges() {
    const { schema } = this.fluentPropertyBinder;

    schema.property && Object.keys(schema.property).forEach(property => {
      const value = (schema.property as S['property'])![property as keyof S['property']];
      (this.host as E | C)[property as keyof (E | C)] = value as unknown as (E | C)[keyof (E | C)];
    });
  }

}
