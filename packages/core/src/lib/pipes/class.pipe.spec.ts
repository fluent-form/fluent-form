import { ClassPipe } from './class.pipe';

describe('ClassPipe', () => {
  it('create an instance', () => {
    const pipe = new ClassPipe();
    expect(pipe).toBeTruthy();
  });

  it('should normalize primitive/string to host', () => {
    const pipe = new ClassPipe();
    expect(pipe.transform('a', 'host')).toBe('a');
    expect(pipe.transform('a', 'wrapper')).toBeUndefined();
  });

  it('should normalize array to host', () => {
    const pipe = new ClassPipe();
    expect(pipe.transform(['a', 'b'], 'host')).toEqual(['a', 'b']);
    expect(pipe.transform(['a', 'b'], 'wrapper')).toBeUndefined();
  });

  it('should normalize null to host', () => {
    const pipe = new ClassPipe();
    expect(pipe.transform(null, 'host')).toBeNull();
    expect(pipe.transform(null, 'wrapper')).toBeUndefined();
  });

  it('should read semantic object values', () => {
    const pipe = new ClassPipe();

    expect(pipe.transform({ host: 'x' }, 'host')).toBe('x');
    expect(pipe.transform({ host: 'x' }, 'wrapper')).toBeUndefined();

    expect(pipe.transform({ wrapper: 'y' }, 'wrapper')).toBe('y');
    expect(pipe.transform({ wrapper: 'y' }, 'host')).toBeUndefined();

    expect(pipe.transform({ host: 'x', wrapper: 'y' }, 'host')).toBe('x');
    expect(pipe.transform({ host: 'x', wrapper: 'y' }, 'wrapper')).toBe('y');
  });
});
