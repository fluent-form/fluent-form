import { dateRange, form, input } from '../builders';
import { createFormGroup } from '../utils';
import { ControlPipe } from './control.pipe';

describe('ControlPipe', () => {
  let pipe: ControlPipe;
  const schemas = form(
    input('a'),
    dateRange(['b', 'c'])
  );
  const formGroup = createFormGroup(schemas);

  beforeEach(() => {
    pipe = new ControlPipe();
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
