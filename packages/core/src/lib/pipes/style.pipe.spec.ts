import { StylePipe } from './style.pipe';

describe('StylePipe', () => {
  it('create an instance', () => {
    const pipe = new StylePipe();
    expect(pipe).toBeTruthy();
  });

  it('should normalize object style to host', () => {
    const pipe = new StylePipe();
    expect(pipe.transform({ color: 'red' }, 'host')).toEqual({ color: 'red' });
    expect(pipe.transform({ color: 'red' }, 'wrapper')).toBeUndefined();
  });

  it('should normalize null/undefined to host', () => {
    const pipe = new StylePipe();
    expect(pipe.transform(null, 'host')).toBeNull();
    expect(pipe.transform(null, 'wrapper')).toBeUndefined();

    expect(pipe.transform(undefined, 'host')).toBeUndefined();
    expect(pipe.transform(undefined, 'wrapper')).toBeUndefined();
  });

  it('should read semantic object values', () => {
    const pipe = new StylePipe();

    expect(pipe.transform({ host: 'x' }, 'host')).toBe('x');
    expect(pipe.transform({ host: 'x' }, 'wrapper')).toBeUndefined();

    expect(pipe.transform({ wrapper: 'y' }, 'wrapper')).toBe('y');
    expect(pipe.transform({ wrapper: 'y' }, 'host')).toBeUndefined();

    expect(pipe.transform({ host: 'x', wrapper: 'y' }, 'host')).toBe('x');
    expect(pipe.transform({ host: 'x', wrapper: 'y' }, 'wrapper')).toBe('y');

    expect(pipe.transform({ host: { color: 'red' } }, 'host')).toEqual({ color: 'red' });
    expect(pipe.transform({ wrapper: { marginTop: '8px' } }, 'wrapper')).toEqual({ marginTop: '8px' });
  });
});
