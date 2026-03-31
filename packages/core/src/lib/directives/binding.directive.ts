import {
  DestroyRef,
  Directive,
  ElementRef,
  Injector,
  type OnInit,
  type OutputRef,
  Type,
  effect,
  inject,
  input,
  isSignal,
  reflectComponentType,
  runInInjectionContext,
  untracked
} from '@angular/core';
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
  selector: '[fluentBindingSchema]',
  providers: [DestroyedSubject]
})
export class FluentBindingDirective<E extends HTMLElement, C extends object, S extends AbstractSchema> implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);

  readonly fluentBindingComponent = input<C>();
  readonly fluentBindingSchema = input.required<S>();
  readonly fluentBindingControl = input.required<AbstractControl>();
  readonly fluentBindingModel = input.required<AnyObject>();

  constructor() {
    const elementRef: ElementRef<E> = inject(ElementRef);
    const destroyed = inject(DestroyedSubject);

    effect(() => {
      const component = this.fluentBindingComponent();
      const schema = this.fluentBindingSchema();
      const control = this.fluentBindingControl();
      const element = elementRef.nativeElement;
      const outputs = component
        ? reflectComponentType(component.constructor as Type<unknown>)?.outputs.map(output => output.propName) ?? []
        : [];

      untracked(() => {
        const context = (): SchemaContext => ({ control, schema, model: this.fluentBindingModel() });
        destroyed.next();

        if (isPropertyHolder(schema)) {
          const host = component ?? element;

          for (const [property, value] of Object.entries(schema.properties)) {
            const prop = host[property as keyof (C | E)];
            if (isSignal(prop)) {
              signalSetFn(prop[SIGNAL] as SignalNode<SafeAny>, value);
            } else {
              host[property as keyof (C | E)] = value;
            }
          }
        }

        if (isListenerHolder(schema)) {
          for (const [eventName, listener] of Object.entries(schema.listeners)) {
            if (eventName === 'valueChange') {
              control.valueChanges.pipe(
                takeUntil(destroyed)
              ).subscribe(value => {
                listener!(value, context());
              });
            } else if (eventName === 'statusChange') {
              control.statusChanges.pipe(
                takeUntil(destroyed)
              ).subscribe(status => {
                listener!(status, context());
              });
            } else {
              // First try to bind to the component's output, then fallback to DOM event binding
              if (component) {
                if (outputs.includes(eventName)) {
                  const output = component[eventName as keyof C] as Observable<SafeAny> | OutputRef<SafeAny>;
                  const observable = output instanceof Observable ? output : outputToObservable(output);

                  observable.pipe(
                    takeUntil(destroyed)
                  ).subscribe(event => {
                    listener!(event, context());
                  });

                  continue;
                }
              }

              fromEvent(element, eventName).pipe(
                takeUntil(destroyed)
              ).subscribe(event => {
                listener!(event, context());
              });
            }
          }
        }

        if (isObserverHolder(schema)) {
          for (const [eventName, observer] of Object.entries(schema.observers)) {
            if (eventName === 'valueChange') {
              control.valueChanges.pipe(
                map(event => ({ event, context: context() })),
                observer!,
                takeUntil(destroyed)
              ).subscribe();
            } else if (eventName === 'statusChange') {
              control.statusChanges.pipe(
                map(event => ({ event, context: context() })),
                observer!,
                takeUntil(destroyed)
              ).subscribe();
            } else {
              // First try to bind to the component's output, then fallback to DOM event binding
              if (component) {
                if (outputs.includes(eventName)) {
                  const output = component[eventName as keyof C] as Observable<SafeAny> | OutputRef<SafeAny>;
                  const observable = output instanceof Observable ? output : outputToObservable(output);

                  observable.pipe(
                    map(event => ({ event, context: context() })),
                    observer!,
                    takeUntil(destroyed)
                  ).subscribe();
                  continue;
                }
              }

              fromEvent(element, eventName).pipe(
                map(event => ({ event, context: context() })),
                observer!,
                takeUntil(destroyed)
              ).subscribe();
            }
          }
        }
      });
    });
  }

  ngOnInit() {
    const schema = this.fluentBindingSchema();
    const control = this.fluentBindingControl();
    const model = this.fluentBindingModel();
    const context: SchemaContext<S> = { control, schema, model };

    if (isHookHolder(schema)) {
      runInInjectionContext(this.injector, () => schema.hooks.onInit?.(context));
      this.destroyRef.onDestroy(() =>
        runInInjectionContext(this.injector, () => schema.hooks.onDestroy?.(context)));
    }
  }
}
