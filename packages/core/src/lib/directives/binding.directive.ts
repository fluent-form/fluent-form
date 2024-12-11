import { Directive, ElementRef, Input, OnChanges, OutputRef, inject, isSignal } from '@angular/core';
import { SIGNAL, SignalNode, signalSetFn } from '@angular/core/primitives/signals';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { AnyObject, SafeAny } from '@ngify/types';
import { Observable, fromEvent, map, takeUntil } from 'rxjs';
import { AbstractSchema, EventListenerHolder, EventObserverHolder, PropertyHolder, SchemaContext } from '../schemas';
import { DestroyedSubject } from '../services';

function isListenerHolder(value: SafeAny): value is Required<EventListenerHolder> {
  return 'listeners' in value;
}

function isPropertyHolder(value: SafeAny): value is Required<PropertyHolder> {
  return 'properties' in value;
}

function isObserverHolder(value: SafeAny): value is Required<EventObserverHolder> {
  return 'observers' in value;
}

/**
 * @internal
 */
@Directive({
  selector: '[fluentBinding]',
  standalone: true,
  providers: [DestroyedSubject],
})
export class FluentBindingDirective<E extends HTMLElement, C extends object, S extends AbstractSchema> implements OnChanges {
  // TODO: ng17 的 effect 似乎有 bug，对 schema.kind=text 的 widget 不起作用，导致无法绑定事件，具体查看 docs 中的 事件侦听 demo
  // 目前暂时切换回 @Input，升级 ng19 修复后再改回来
  @Input() fluentBinding!: { component?: C, schema: S, control: AbstractControl, model: AnyObject };

  private readonly elementRef: ElementRef<E> = inject(ElementRef);
  private readonly destroyed = inject(DestroyedSubject);

  ngOnChanges() {
    const { component, schema, control, model } = this.fluentBinding;
    const host = component ?? this.elementRef.nativeElement;

    if (isPropertyHolder(schema)) {
      for (const [property, value] of Object.entries(schema.properties)) {
        const prop = host[property as keyof (C | E)];
        if (isSignal(prop)) {
          signalSetFn(prop[SIGNAL] as SignalNode<SafeAny>, value);
        } else {
          host[property as keyof (C | E)] = value;
        }
      }
    }

    const context: SchemaContext = { control, schema, model };
    this.destroyed.next();

    if (isListenerHolder(schema)) {
      for (const [eventName, listener] of Object.entries(schema.listeners)) {
        if (eventName === 'valueChange') {
          control.valueChanges.pipe(
            takeUntil(this.destroyed),
          ).subscribe(value => {
            listener!(value, context);
          });
        } else if (eventName === 'statusChange') {
          control.statusChanges.pipe(
            takeUntil(this.destroyed),
          ).subscribe(status => {
            listener!(status, context);
          });
        } else if (host instanceof HTMLElement) {
          fromEvent(host, eventName).pipe(
            takeUntil(this.destroyed)
          ).subscribe(event => {
            listener!(event, context);
          });
        } else {
          const output = host[eventName as keyof C] as Observable<SafeAny> | OutputRef<SafeAny>;
          const observable = output instanceof Observable ? output : outputToObservable(output);

          observable.pipe(
            takeUntil(this.destroyed)
          ).subscribe(event => {
            listener!(event, context);
          });
        }
      }
    }

    if (isObserverHolder(schema)) {
      for (const [eventName, observer] of Object.entries(schema.observers)) {
        if (eventName === 'valueChange') {
          observer!(control.valueChanges.pipe(
            map(event => ({ event, context })),
            takeUntil(this.destroyed)
          ));
        } else if (eventName === 'statusChange') {
          observer!(control.statusChanges.pipe(
            map(event => ({ event, context })),
            takeUntil(this.destroyed)
          ));
        } else if (host instanceof HTMLElement) {
          observer!(fromEvent(host, eventName).pipe(
            map(event => ({ event, context })),
            takeUntil(this.destroyed)
          ));
        } else {
          const output = host[eventName as keyof C] as Observable<SafeAny> | OutputRef<SafeAny>;
          const observable = output instanceof Observable ? output : outputToObservable(output);

          observer!(observable.pipe(
            map(event => ({ event, context })),
            takeUntil(this.destroyed)
          ));
        }
      }
    }
  }
}
