import { delay, finalize, of, takeUntil } from 'rxjs';
import { DestroyedSubject } from './destroyed.service';

describe('DestroyedSubject', () => {
  let destroyed$: DestroyedSubject;
  const initObservable = of('done');

  beforeEach(() => {
    destroyed$ = new DestroyedSubject();
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

    destroyed$.ngOnDestroy();

    expect(result).toBe('final');
  });
});
