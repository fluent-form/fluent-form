import { DestroyRef, Directive, ElementRef, Input, type OnChanges, type OnInit, type OutputRef, inject, isSignal } from '@angular/core';
import { SIGNAL, type SignalNode, signalSetFn } from '@angular/core/primitives/signals';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import type { AnyObject, SafeAny } from '@ngify/core';
import { Observable, fromEvent, map, takeUntil } from 'rxjs';
import type { AbstractSchema, EventListenerHolder, EventObserverHolder, HooksHolder, PropertyHolder, SchemaContext } from '../schemas';
import { DestroyedSubject } from '../services';

function isHookHolder(value: SafeAny): value is Required<HooksHolder> {
  return 'hooks' in value;
}

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
  providers: [DestroyedSubject]
})
export class FluentBindingDirective<E extends HTMLElement, C extends object, S extends AbstractSchema> implements OnInit, OnChanges {
  // TODO: There seems to be a bug in ng17's effect;
  // it doesn't work for widgets with `schema.kind = text`,
  // causing event binding to fail. See the event listening demo in the docs for details.
  // Currently temporarily switching back to `@Input`;
  // will revert after upgrading to ng19 where this is fixed.
  @Input() fluentBinding!: { component?: C, schema: S, control: AbstractControl, model: AnyObject };

  private readonly elementRef: ElementRef<E> = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly destroyed = inject(DestroyedSubject);

  ngOnInit() {
    const { schema, control, model } = this.fluentBinding;
    const context: SchemaContext = { control, schema, model };

    if (isHookHolder(schema)) {
      schema.hooks.onInit?.(context);
      this.destroyRef.onDestroy(() =>
        schema.hooks.onDestroy?.(context));
    }
  }

  ngOnChanges() {
    // TODO: Because the object in `[fluentBinding]="{}"` is written directly in
    // the template, a new object is created on every change detection, triggering `ngOnChanges`.
    // The parameters inside the object should be passed separately and independently.
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
            takeUntil(this.destroyed)
          ).subscribe(value => {
            listener!(value, context);
          });
        } else if (eventName === 'statusChange') {
          control.statusChanges.pipe(
            takeUntil(this.destroyed)
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
          control.valueChanges.pipe(
            map(event => ({ event, context })),
            observer!,
            takeUntil(this.destroyed)
          ).subscribe();
        } else if (eventName === 'statusChange') {
          control.statusChanges.pipe(
            map(event => ({ event, context })),
            observer!,
            takeUntil(this.destroyed)
          ).subscribe();
        } else if (host instanceof HTMLElement) {
          fromEvent(host, eventName).pipe(
            map(event => ({ event, context })),
            observer!,
            takeUntil(this.destroyed)
          ).subscribe();
        } else {
          const output = host[eventName as keyof C] as Observable<SafeAny> | OutputRef<SafeAny>;
          const observable = output instanceof Observable ? output : outputToObservable(output);

          observable.pipe(
            map(event => ({ event, context })),
            observer!,
            takeUntil(this.destroyed)
          ).subscribe();
        }
      }
    }
  }
}
