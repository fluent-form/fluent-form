import { Directive, EventEmitter, Input, OnInit } from '@angular/core';
import { SafeAny } from '@ngify/types';
import { AnyControlOptions, ComponentEventListener, EmbeddedFormOptions, HTMLElementEventListener } from '../fluent-form.interface';

@Directive({
  selector: '[fluentEventBinder]'
})
export class FluentEventBinderDirective<H extends object, O extends Exclude<AnyControlOptions, EmbeddedFormOptions>> implements OnInit {
  @Input() fluentEventBinder!: { host: H, options: O };

  constructor() { }

  ngOnInit() {
    const { host, options } = this.fluentEventBinder;

    options.listener && Object.keys(options.listener).forEach(eventName => {
      if (host instanceof HTMLElement) {
        host.addEventListener(eventName, (event: SafeAny) => {
          (options.listener as HTMLElementEventListener<O>)![
            eventName as keyof HTMLElementEventListener<O>
          ]!(event, options);
        });
      } else {
        (host[eventName as keyof H] as unknown as EventEmitter<unknown>).subscribe((event: SafeAny) => {
          (options.listener as ComponentEventListener<H, O>)![
            eventName as keyof ComponentEventListener<H, O>
          ]!(event, options);
        });
      }
    });
  }

}
