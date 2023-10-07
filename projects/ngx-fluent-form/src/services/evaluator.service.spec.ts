import { TestBed } from '@angular/core/testing';
import { DynamicCodeEvaluator } from './evaluator.service';

describe('CodeEvaluator', () => {
  let evaluator: DynamicCodeEvaluator;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicCodeEvaluator]
    });
    evaluator = TestBed.inject(DynamicCodeEvaluator);
  });

  it('should be created', () => {
    expect(evaluator).toBeTruthy();
  });

  it('should be able to execute code', () => {
    const result1 = evaluator.evaluate('return true', {});
    expect(result1).toBeTrue();
    const result2 = evaluator.evaluate('true', {});
    expect(result2).toBeTrue();
  });

  it('should be able to access to the context', () => {
    const result = evaluator.evaluate('return v', { v: true });
    expect(result).toBeTrue();
  });

  it('should not be able to access variables outside the context', () => {
    const result = evaluator.evaluate('return window', {});
    expect(result).toBeFalsy();
  });
});
