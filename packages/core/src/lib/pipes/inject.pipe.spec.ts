import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FluentInjectPipe } from './inject.pipe';

describe('FluentInjectPipe', () => {
  let pipe: FluentInjectPipe;

  beforeEach(() => {
    pipe = TestBed.runInInjectionContext(() => new FluentInjectPipe());
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be inject', () => {
    const value = pipe.transform(ApplicationRef);
    expect(value).toBeInstanceOf(ApplicationRef);
  });
});
