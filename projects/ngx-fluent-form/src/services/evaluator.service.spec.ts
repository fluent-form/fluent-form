import { TestBed } from '@angular/core/testing';
import { DynamicCodeEvaluator } from './evaluator.service';

describe('CodeEvaluator', () => {
  let service: DynamicCodeEvaluator;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicCodeEvaluator]
    });
    service = TestBed.inject(DynamicCodeEvaluator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to execute code', () => {
    const result = service.evaluate('return true', {});
    expect(result).toBeTrue();
  });

  it('should be able to access to the context', () => {
    const result = service.evaluate('return v', { v: true });
    expect(result).toBeTrue();
  });

  it('should not be able to access variables outside the context', () => {
    const result = service.evaluate('return window', {});
    expect(result).toBeFalsy();
  });
});
