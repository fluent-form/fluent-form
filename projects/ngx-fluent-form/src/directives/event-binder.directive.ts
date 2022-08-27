import { Directive, ElementRef, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { asapScheduler, fromEvent, observeOn, takeUntil } from 'rxjs';
import { ControlSchema } from '../schemas/index.schema';
import { ComponentOutputListenerMap, HTMLElementEventListenerMap } from '../type';

@Directive({
  selector: '[fluentEventBinder]',
  providers: [NzDestroyService]
})
export class EventBinderDirective<E extends HTMLElement, C extends object, S extends ControlSchema> implements OnChanges {
  @Input() fluentEventBinder!: { cmp?: C, schema: S, control?: FormControl };

  private get host() {
    return this.fluentEventBinder.cmp ?? this.elementRef.nativeElement;
  }

  constructor(
    private elementRef: ElementRef<E>,
    private destory$: NzDestroyService
  ) { }

  ngOnChanges({ fluentEventBinder }: SimpleChanges): void {
    fluentEventBinder.firstChange || this.destory$.next();

    const { schema, control } = this.fluentEventBinder;

    schema.listener && Object.keys(schema.listener).forEach(eventName => {
      if (eventName === 'valueChange') {
        control!.valueChanges.pipe(
          observeOn(asapScheduler), // 微任务调度，确保顶层事件先发射
          takeUntil(this.destory$),
        ).subscribe(schema.listener![eventName]!);
      } else if (eventName === 'statusChange') {
        control!.statusChanges.pipe(
          observeOn(asapScheduler),
          takeUntil(this.destory$),
        ).subscribe(schema.listener![eventName]!);
      } else if (this.host instanceof HTMLElement) {
        fromEvent(this.host, eventName).pipe(
          takeUntil(this.destory$)
        ).subscribe(event => (schema.listener as HTMLElementEventListenerMap)![
          eventName as keyof HTMLElementEventListenerMap
        ]!(event as SafeAny))
      } else {
        (this.host[eventName as keyof C] as unknown as EventEmitter<unknown>).pipe(
          takeUntil(this.destory$)
        ).subscribe((event: SafeAny) => {
          (schema.listener as ComponentOutputListenerMap<C>)![
            eventName as keyof ComponentOutputListenerMap<C>
          ]!(event);
        });
      }
    });
  }
}
