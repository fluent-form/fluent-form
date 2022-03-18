import { Directive, Input, OnInit } from '@angular/core';
import { AnyControlOptions, EmbeddedFormOptions } from '../fluent-form.interface';

@Directive({
  selector: '[fluentPropertyBinder]'
})
export class FluentPropertyBinderDirective<H extends object, O extends Exclude<AnyControlOptions, EmbeddedFormOptions>> implements OnInit {
  @Input() fluentPropertyBinder!: { host: H, options: O };

  constructor() { }

  ngOnInit() {
    const { host, options } = this.fluentPropertyBinder;

    options.property && Object.keys(options.property).forEach(property => {
      (options.property as O['property'])![property as keyof O['property']];
      host[property as keyof H] = (options.property as O['property'])![
        property as keyof O['property']
      ] as unknown as H[keyof H];
    });
  }

}
