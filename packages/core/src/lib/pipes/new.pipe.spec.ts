import { ApplicationRef, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FluentNewPipe } from './new.pipe';

describe('FluentNewPipe', () => {
  let pipe: FluentNewPipe;

  beforeEach(() => {
    pipe = TestBed.runInInjectionContext(() => new FluentNewPipe());
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be new in injection context', () => {
    const value = pipe.transform(class {
      app = inject(ApplicationRef);
    });
    expect(value.app).toBeInstanceOf(ApplicationRef);
  });
});
