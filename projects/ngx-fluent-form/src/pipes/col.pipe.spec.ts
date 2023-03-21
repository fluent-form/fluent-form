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

  it('push', () => {
    expect(pipe.transform(undefined, 'push')).toBeNull();
    expect(pipe.transform(1, 'push')).toBeNull();
    expect(pipe.transform({ span: 1 }, 'push')).toBeNull();
    expect(pipe.transform({ push: 1 }, 'push')).toBe(1);
  });

  it('pull', () => {
    expect(pipe.transform(undefined, 'pull')).toBeNull();
    expect(pipe.transform(1, 'pull')).toBeNull();
    expect(pipe.transform({ span: 1 }, 'pull')).toBeNull();
    expect(pipe.transform({ pull: 1 }, 'pull')).toBe(1);
  });

  it('order', () => {
    expect(pipe.transform(undefined, 'order')).toBeNull();
    expect(pipe.transform(1, 'order')).toBeNull();
    expect(pipe.transform({ span: 1 }, 'order')).toBeNull();
    expect(pipe.transform({ order: 1 }, 'order')).toBe(1);
  });
});
