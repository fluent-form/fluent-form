import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { AnyObject } from '@ngify/types';
import { withStaticExpression } from '../features';
import { provideFluentForm } from '../provider';
import { AbstractControlSchema } from '../schemas';
import { withTesting } from '../testing';
import { FormUtil } from '../utils';
import { FluentReactivePipe } from './reactive.pipe';

describe('FluentReactivePipe', () => {
  let model: AnyObject;
  let schema: AbstractControlSchema;
  let ctrl: FormControl;
  let pipe: FluentReactivePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withTesting(),
          withStaticExpression()
        ),
        FluentReactivePipe
      ]
    });

    model = { value: true };
    schema = { kind: 'toggle' };
    ctrl = TestBed.inject(FormUtil).createFormControl(schema, {});
    pipe = TestBed.inject(FluentReactivePipe);
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
      const expression = '{{model.value}}';
      const value = pipe.transform(expression, model, schema, ctrl);
      expect(value).toEqual(true);
    });
  });
});
