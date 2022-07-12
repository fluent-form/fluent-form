import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { asapScheduler, fromEvent, observeOn, Subject, takeUntil } from 'rxjs';
import { ControlSchema } from '../schemas/index.schema';
import { ComponentOutputListenerMap, HTMLElementEventListenerMap } from '../type';

@Directive({
  selector: '[fluentEventBinder]'
})
export class FluentEventBinderDirective<E extends HTMLElement, C extends object, S extends ControlSchema> implements OnChanges, OnDestroy {
  @Input() fluentEventBinder!: { cmp?: C, schema: S, control?: FormControl };

  private get host() {
    return this.fluentEventBinder.cmp ?? this.elementRef.nativeElement;
  }

  private destory$: Subject<void> = new Subject<void>();

  constructor(private elementRef: ElementRef<E>) { }

  ngOnChanges({ fluentEventBinder }: SimpleChanges): void {
    if (!fluentEventBinder.firstChange) {
      this.destory$.next();
    }

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

  ngOnDestroy() {
    this.destory$.next();
    this.destory$.complete();
  }
}
