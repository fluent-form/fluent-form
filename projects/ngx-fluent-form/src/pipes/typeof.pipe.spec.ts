import { TypeofPipe } from './typeof.pipe';

describe('TypeofPipe', () => {
  let pipe: TypeofPipe;

  beforeEach(() => {
    pipe = new TypeofPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be return type of value', () => {
    expect(pipe.transform(1)).toEqual('number');
  });

  it('should be return boolean', () => {
    expect(pipe.transform(1, 'number')).toBeTrue();
    expect(pipe.transform(1, 'string')).toBeFalse();
  });
});
