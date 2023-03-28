import { Directive, ElementRef, EventEmitter, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { asapScheduler, fromEvent, observeOn, takeUntil } from 'rxjs';
import { EventListener, PropertyPatcher } from '../schemas/interfaces';

function isEventListener(value: SafeAny): value is EventListener {
  return 'listeners' in value;
}

function isPropertyPatcher(value: SafeAny): value is PropertyPatcher {
  return 'properties' in value;
}

@Directive({
  selector: '[fluentBinding]',
  standalone: true,
  providers: [NzDestroyService]
})
export class FluentBindingDirective<E extends HTMLElement, C extends object, S extends EventListener | PropertyPatcher> {

  @Input() set fluentBinding(value: { component?: C, schema: S, control?: AbstractControl }) {
    const host = value.component ?? this.elementRef.nativeElement;
    const { schema, control } = value;

    this.destory$.next();

    if (isPropertyPatcher(schema) && schema.properties) {
      for (const [property, value] of Object.entries(schema.properties)) {
        host[property as keyof (C | E)] = value;
      }
    }

    if (isEventListener(schema) && schema.listeners) {
      for (const [eventName, listener] of Object.entries(schema.listeners)) {
        if (eventName === 'valueChange') {
          control!.valueChanges.pipe(
            observeOn(asapScheduler), // 微任务调度，确保顶层事件先发射
            takeUntil(this.destory$),
          ).subscribe(listener);
          continue;
        }

        if (eventName === 'statusChange') {
          control!.statusChanges.pipe(
            observeOn(asapScheduler),
            takeUntil(this.destory$),
          ).subscribe(listener);
          continue;
        }

        if (host instanceof HTMLElement) {
          fromEvent(host, eventName).pipe(
            takeUntil(this.destory$)
          ).subscribe(listener);
          continue;
        }

        (host[eventName as keyof C] as EventEmitter<SafeAny>).pipe(
          takeUntil(this.destory$)
        ).subscribe(listener);
      }
    }
  }

  constructor(
    private elementRef: ElementRef<E>,
    private destory$: NzDestroyService
  ) { }

}
