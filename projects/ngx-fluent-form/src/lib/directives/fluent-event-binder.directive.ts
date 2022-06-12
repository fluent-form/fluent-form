import { Directive, EventEmitter, Input, OnInit } from '@angular/core';
import { SafeAny } from '@ngify/types';
import { ComponentEventListenerMap, HTMLElementEventListenerMap } from '../fluent-form.type';
import { RealControlSchema } from '../models/schema.model';

@Directive({
  selector: '[fluentEventBinder]'
})
export class FluentEventBinderDirective<H extends object, S extends RealControlSchema> implements OnInit {
  @Input() fluentEventBinder!: { host: H, schema: S };

  constructor() { }

  ngOnInit() {
    const { host, schema } = this.fluentEventBinder;

    schema.listener && Object.keys(schema.listener).forEach(eventName => {
      if (host instanceof HTMLElement) {
        host.addEventListener(eventName, (event: SafeAny) => {
          (schema.listener as HTMLElementEventListenerMap<S>)![
            eventName as keyof HTMLElementEventListenerMap<S>
          ]!(event, schema);
        });
      } else {
        (host[eventName as keyof H] as unknown as EventEmitter<unknown>).subscribe((event: SafeAny) => {
          (schema.listener as ComponentEventListenerMap<H, S>)![
            eventName as keyof ComponentEventListenerMap<H, S>
          ]!(event, schema);
        });
      }
    });
  }

}
