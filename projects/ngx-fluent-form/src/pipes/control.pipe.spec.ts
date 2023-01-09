import { createFormGroup } from '../utils';
import { FluentControlPipe } from './control.pipe';

describe('FluentControlPipe', () => {
  let pipe: FluentControlPipe;
  const formGroup = createFormGroup([
    { kind: 'input', name: 'a' },
    { kind: 'date-range', name: ['b', 'c'] }
  ]);

  beforeEach(() => {
    pipe = new FluentControlPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be able to find the control', () => {
    expect(pipe.transform('a', formGroup)).toBeTruthy();
  });

  it('should be able to find the control', () => {
    expect(pipe.transform(['b', 'c'], formGroup)).toBeTruthy();
  });
});
