import { FluentColumnPipe } from './col.pipe';

describe('FluentColumnPipe', () => {
  let pipe: FluentColumnPipe;

  beforeEach(() => {
    pipe = new FluentColumnPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('span', () => {
    expect(pipe.transform(undefined, 'span')).toBeNull();
    expect(pipe.transform(1, 'span')).toBe(1);
    expect(pipe.transform({ span: 1 }, 'span')).toBe(1);
    expect(pipe.transform({ flex: 1 }, 'span')).toBeNull();
  });

  it('flex', () => {
    expect(pipe.transform(undefined, 'flex')).toBeNull();
    expect(pipe.transform(1, 'flex')).toBeNull();
    expect(pipe.transform({ span: 1 }, 'flex')).toBeNull();
    expect(pipe.transform({ flex: 1 }, 'flex')).toBe(1);
  });

  it('offset', () => {
    expect(pipe.transform(undefined, 'offset')).toBeNull();
    expect(pipe.transform(1, 'offset')).toBeNull();
    expect(pipe.transform({ span: 1 }, 'offset')).toBeNull();
    expect(pipe.transform({ offset: 1 }, 'offset')).toBe(1);
  });
});
