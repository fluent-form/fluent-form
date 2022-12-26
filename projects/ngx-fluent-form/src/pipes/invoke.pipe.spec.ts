import { FluentInvokePipe } from './invoke.pipe';

describe('InvokePipe', () => {
  let pipe: FluentInvokePipe;

  beforeEach(() => {
    pipe = new FluentInvokePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be invoke', () => {
    const value = pipe.transform(o => o, true);
    expect(value).toBeTrue();
  });
});
