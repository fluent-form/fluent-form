import { Directive, ElementRef, OutputRef, effect, inject, input, isSignal, untracked } from '@angular/core';
import { SIGNAL, SignalNode, signalSetFn } from '@angular/core/primitives/signals';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { AnyObject, SafeAny } from '@ngify/types';
import { Observable, fromEvent, takeUntil } from 'rxjs';
import { AbstractSchema } from '../schemas';
import { EventListenerHolder, PropertyHolder, SchemaContext } from '../schemas/interfaces';
import { DestroyedSubject } from '../services';

function isEventListener(value: SafeAny): value is EventListenerHolder {
  return 'listeners' in value;
}

function isPropertyPatcher(value: SafeAny): value is PropertyHolder {
  return 'properties' in value;
}

/**
 * @internal
 */
@Directive({
  selector: '[fluentBinding]',
  standalone: true,
  providers: [DestroyedSubject],
})
export class FluentBindingDirective<E extends HTMLElement, C extends object, S extends AbstractSchema> {
  readonly fluentBinding = input.required<{ component?: C, schema: S, control: AbstractControl, model: AnyObject }>();

  constructor() {
    const elementRef: ElementRef<E> = inject(ElementRef);
    const destroyed = inject(DestroyedSubject);

    effect(() => {
      const { component, schema, control, model } = this.fluentBinding();

      untracked(() => {
        const host = component ?? elementRef.nativeElement;

        if (isPropertyPatcher(schema) && schema.properties) {
          for (const [property, value] of Object.entries(schema.properties)) {
            const prop = host[property as keyof (C | E)];
            if (isSignal(prop)) {
              signalSetFn(prop[SIGNAL] as SignalNode<SafeAny>, value);
            } else {
              host[property as keyof (C | E)] = value;
            }
          }
        }

        if (isEventListener(schema) && schema.listeners) {
          const context: SchemaContext = { control, schema, model };

          destroyed.next();

          for (const [eventName, listener] of Object.entries(schema.listeners)) {
            if (eventName === 'valueChange') {
              control.valueChanges.pipe(
                takeUntil(destroyed),
              ).subscribe(value => {
                listener!(value, context);
              });
            } else if (eventName === 'statusChange') {
              control.statusChanges.pipe(
                takeUntil(destroyed),
              ).subscribe(status => {
                listener!(status, context);
              });
            } else if (host instanceof HTMLElement) {
              fromEvent(host, eventName).pipe(
                takeUntil(destroyed)
              ).subscribe(event => {
                listener!(event, context);
              });
            } else {
              const output = host[eventName as keyof C] as Observable<SafeAny> | OutputRef<SafeAny>;
              const observable = output instanceof Observable ? output : outputToObservable(output);

              observable.pipe(
                takeUntil(destroyed)
              ).subscribe(event => {
                listener!(event, context);
              });
            }
          }
        }
      });
    });
  }
}
