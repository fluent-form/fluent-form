import { CallPipe } from './call.pipe';

describe('CallPipe', () => {
  interface Model {
    value: boolean;
  }

  let pipe: CallPipe;
  const model: Model = { value: true };

  beforeEach(() => {
    pipe = new CallPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('正确处理非函数参数', () => {
    const value = pipe.transform(true, model);
    expect(value).toEqual(true);
  });

  it('正确处理函数参数', () => {
    const value = pipe.transform(model => model.value, model);
    expect(value).toEqual(true);
  });
});
