import { Injector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { delay, finalize, of, takeUntil } from 'rxjs';
import { DestroyedSubject } from './destroyed.service';

describe('DestroyedSubject', () => {
  let destroyed$: DestroyedSubject;
  const initObservable = of('done');

  beforeEach(() => {
    destroyed$ = runInInjectionContext(TestBed.inject(Injector), () => new DestroyedSubject());
  });

  it('should subscribe work normal', () => {
    let result = 'initial';

    initObservable.pipe(takeUntil(destroyed$)).subscribe(value => {
      result = value;
    });

    expect(result).toBe('done');
  });

  it('should complete work normal', () => {
    let result = 'initial';

    initObservable
      .pipe(
        delay(1000),
        takeUntil(destroyed$),
        finalize(() => {
          result = 'final';
        })
      )
      .subscribe();

    TestBed.resetTestingModule();

    expect(result).toBe('final');
  });
});
