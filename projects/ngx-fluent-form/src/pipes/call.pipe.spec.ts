import { control, switcher } from '../builders';
import { ControlSchema } from '../schemas';
import { createFormControl } from '../utils';
import { CallPipe } from './call.pipe';

describe('CallPipe', () => {
  const model = { value: true } as const;
  const schema = control(switcher('value')) as ControlSchema;
  const ctrl = createFormControl(schema);

  let pipe: CallPipe;

  beforeEach(() => {
    pipe = new CallPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('正确处理布尔值参数', () => {
    const value = pipe.transform(true, model, schema, ctrl);
    expect(value).toEqual(true);
  });

  it('正确处理函数参数', () => {
    const value = pipe.transform(({ model }) => model.value, model, schema, ctrl);
    expect(value).toEqual(true);
  });

  describe('正确处理字符串参数', () => {
    it('简写表达式', () => {
      const expression = 'model.value';
      const value = pipe.transform(expression, model, schema, ctrl);
      expect(value).toEqual(true);
    });

    it('完整表达式', () => {
      const expression = 'return !model.value';
      const value = pipe.transform(expression, model, schema, ctrl);
      expect(value).toEqual(false);
    });
  });
});
