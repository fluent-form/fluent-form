import { isBoolean, isFunction, isNumber, isString, isUndefined } from './is.utils';

describe('is.utils', () => {
  it('should be able to identify number', () => {
    expect(isNumber(1)).toBe(true);
    expect(isNumber('1')).toBe(false);
  });

  it('should be able to identify string', () => {
    expect(isString('1')).toBe(true);
    expect(isString(1)).toBe(false);
  });

  it('should be able to identify function', () => {
    expect(isFunction(() => undefined)).toBe(true);
    expect(isFunction({})).toBe(false);
  });

  it('should be able to identify boolean', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean(null)).toBe(false);
  });

  it('should be able to identify undefined', () => {
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(null)).toBe(false);
  });
});
