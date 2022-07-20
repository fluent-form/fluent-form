import { TypeofPipe } from './typeof.pipe';

describe('TypeofPipe', () => {
  let pipe: TypeofPipe;

  beforeEach(() => {
    pipe = new TypeofPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('应该能处理一个参数', () => {
    const value = pipe.transform(1);
    expect(value).toEqual('number');
  });

  it('应该能处理两个参数', () => {
    expect(pipe.transform(1, 'number')).toEqual(true);
    expect(pipe.transform(1, 'string')).toEqual(false);
  });
});
