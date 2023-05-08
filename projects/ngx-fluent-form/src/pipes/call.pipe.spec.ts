import { TestBed } from '@angular/core/testing';
import { toggle } from '../builders';
import { AnyControlSchema } from '../schemas';
import { CodeEvaluator, DynamicCodeEvaluator } from '../services';
import { createFormControl, standardSchema } from '../utils';
import { FluentCallPipe } from './call.pipe';

describe('FluentCallPipe', () => {
  const model = { value: true } as const;
  const schema = standardSchema(toggle('value')) as AnyControlSchema;
  const ctrl = createFormControl(schema);

  let pipe: FluentCallPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CodeEvaluator,
          useClass: DynamicCodeEvaluator
        }
      ]
    });

    pipe = TestBed.inject(FluentCallPipe);
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
