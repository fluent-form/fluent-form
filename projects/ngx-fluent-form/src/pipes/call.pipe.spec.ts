import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { AnyObject } from '@ngify/types';
import { withAllWidgets, withStaticExpression } from '../features';
import { provideFluentForm } from '../provider';
import { AnyControlSchema } from '../schemas';
import { FormUtil } from '../utils';
import { FluentCallPipe } from './call.pipe';

describe('FluentCallPipe', () => {
  let model: AnyObject;
  let schema: AnyControlSchema;
  let ctrl: FormControl;
  let pipe: FluentCallPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withAllWidgets(),
          withStaticExpression()
        ),
        FluentCallPipe
      ]
    });

    model = { value: true };
    schema = { kind: 'toggle' };
    ctrl = TestBed.inject(FormUtil).createFormControl(schema);
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
