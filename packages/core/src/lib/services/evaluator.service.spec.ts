import { TestBed } from '@angular/core/testing';
import { DynamicCodeEvaluator } from './evaluator.service';

describe('CodeEvaluator', () => {
  let evaluator: DynamicCodeEvaluator;

  beforeEach(() => {
    evaluator = TestBed.inject(DynamicCodeEvaluator);
  });

  it('should be created', () => {
    expect(evaluator).toBeTruthy();
  });

  it('should be able to execute code', () => {
    const result1 = evaluator.evaluate('{{true}}', {});
    expect(result1).toBe(true);
    const result2 = evaluator.evaluate('true', {});
    expect(result2).toBe(true);
  });

  it('should be able to access to the context', () => {
    const result = evaluator.evaluate('v', { v: true });
    expect(result).toBe(true);
  });

  it('should not be able to access variables outside the context', () => {
    const result = evaluator.evaluate('window', {});
    expect(result).toBeFalsy();
  });
});
