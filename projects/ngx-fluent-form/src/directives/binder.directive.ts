import { Directive, ElementRef, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
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
  selector: '[fluentBinderSchema]',
  standalone: true,
  providers: [NzDestroyService]
})
export class FluentBinderDirective<
  E extends HTMLElement,
  C extends object,
  S extends EventListener | PropertyPatcher
> implements OnChanges {
  @Input('fluentBinder') component?: C;
  @Input('fluentBinderSchema') schema!: S;
  @Input('fluentBinderControl') control?: AbstractControl;

  private get host(): C | E {
    return this.component ?? this.elementRef.nativeElement;
  }

  constructor(
    private elementRef: ElementRef<E>,
    private destory$: NzDestroyService
  ) { }

  ngOnChanges({ schema: schemaChange }: SimpleChanges): void {
    schemaChange.firstChange || this.destory$.next();

    const { schema } = this;

    if (isPropertyPatcher(schema) && schema.properties) {
      Object.keys(schema.properties).forEach(property => {
        const value = schema.properties![property];
        this.host[property as keyof (C | E)] = value as (C | E)[keyof (C | E)];
      });
    }

    if (isEventListener(schema) && schema.listeners) {
      Object.keys(schema.listeners).forEach(eventName => {
        if (eventName === 'valueChange') {
          this.control!.valueChanges.pipe(
            observeOn(asapScheduler), // 微任务调度，确保顶层事件先发射
            takeUntil(this.destory$),
          ).subscribe(schema.listeners![eventName]);
          return;
        }

        if (eventName === 'statusChange') {
          this.control!.statusChanges.pipe(
            observeOn(asapScheduler),
            takeUntil(this.destory$),
          ).subscribe(schema.listeners![eventName]);
          return;
        }

        if (this.host instanceof HTMLElement) {
          fromEvent(this.host, eventName).pipe(
            takeUntil(this.destory$)
          ).subscribe(schema.listeners![eventName]);
          return;
        }

        (this.host[eventName as keyof C] as EventEmitter<SafeAny>).pipe(
          takeUntil(this.destory$)
        ).subscribe(schema.listeners![eventName]);
      });
    }
  }
}
