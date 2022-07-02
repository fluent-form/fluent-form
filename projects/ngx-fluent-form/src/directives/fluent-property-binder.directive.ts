import { Directive, Input, OnInit } from '@angular/core';
import { ControlSchema } from '../schemas/index.schema';

@Directive({
  selector: '[fluentPropertyBinder]'
})
export class FluentPropertyBinderDirective<H extends object, S extends ControlSchema> implements OnInit {
  @Input() fluentPropertyBinder!: { host: H, schema: S };

  constructor() { }

  ngOnInit() {
    const { host, schema } = this.fluentPropertyBinder;

    schema.property && Object.keys(schema.property).forEach(property => {
      const value = (schema.property as S['property'])![property as keyof S['property']];
      host[property as keyof H] = value as unknown as H[keyof H];
    });
  }

}
