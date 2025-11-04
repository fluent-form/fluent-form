import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { StatusPipe } from './status.pipe';

describe('StatusPipe', () => {
  it('create an instance', () => {
    const pipe = TestBed.runInInjectionContext(() => new StatusPipe());
    expect(pipe).toBeTruthy();
  });

  it('initial value should be empty string', () => {
    const control = new FormControl();
    const pipe = TestBed.runInInjectionContext(() => new StatusPipe());
    const signal = pipe.transform(control);
    expect(signal()).toBe('');
  });

  it('returns "warning" when touched and has warning error', () => {
    const control = new FormControl();
    control.setErrors({ warning: true });
    control.markAsDirty();
    const pipe = TestBed.runInInjectionContext(() => new StatusPipe());
    const signal = pipe.transform(control);
    expect(signal()).toBe('warning');
  });

  it('returns "error" when touched and invalid but no warning', () => {
    const control = new FormControl();
    control.setErrors({ error: true });
    control.markAsDirty();
    const pipe = TestBed.runInInjectionContext(() => new StatusPipe());
    const signal = pipe.transform(control);
    expect(signal()).toBe('error');
  });

  it('returns empty when not touched or dirty even if invalid', () => {
    const control = new FormControl();
    control.setErrors({ invalid: true });
    const pipe = TestBed.runInInjectionContext(() => new StatusPipe());
    const signal = pipe.transform(control);
    expect(signal()).toBe('');
  });

  it('returns empty when pending is true', () => {
    const control = new FormControl();
    control.markAsPending();
    const pipe = TestBed.runInInjectionContext(() => new StatusPipe());
    const signal = pipe.transform(control);
    expect(signal()).toBe('');
  });
});
