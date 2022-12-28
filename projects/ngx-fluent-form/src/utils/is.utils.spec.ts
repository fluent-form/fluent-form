import { isBoolean, isFunction, isNumber, isString, isUndefined } from './is.utils';

describe('is.utils', () => {
  it('should be able to identify number', () => {
    expect(isNumber(1)).toBeTrue();
    expect(isNumber('1')).toBeFalse();
  });

  it('should be able to identify string', () => {
    expect(isString('1')).toBeTrue();
    expect(isString(1)).toBeFalse();
  });

  it('should be able to identify function', () => {
    expect(isFunction(() => undefined)).toBeTrue();
    expect(isFunction({})).toBeFalse();
  });

  it('should be able to identify boolean', () => {
    expect(isBoolean(true)).toBeTrue();
    expect(isBoolean(false)).toBeTrue();
    expect(isBoolean(null)).toBeFalse();
  });

  it('should be able to identify undefined', () => {
    expect(isUndefined(undefined)).toBeTrue();
    expect(isUndefined(null)).toBeFalse();
  });
});