import { InvokePipe } from './invoke.pipe';

describe('InvokePipe', () => {
  let pipe: InvokePipe;

  beforeEach(() => {
    pipe = new InvokePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be invoke', () => {
    const value = pipe.transform(o => o, true);
    expect(value).toBe(true);
  });
});
