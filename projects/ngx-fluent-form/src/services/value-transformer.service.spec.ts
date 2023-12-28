import { TestBed } from '@angular/core/testing';

import { SafeAny } from '@ngify/types';
import { CodeEvaluator, DynamicCodeEvaluator } from './evaluator.service';
import { ValueTransformer } from './value-transformer.service';

describe('ValueTransformerService (disabled static expression support)', () => {
  let service: ValueTransformer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValueTransformer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('正确处理普通静态参数', () => {
    const value = service.transform(true);
    expect(value).toEqual(true);
  });

  it('正确处理函数参数', () => {
    const value = service.transform((ctx: SafeAny) => ctx.model, { model: true });
    expect(value).toEqual(true);
  });

  it('正确处理字符串参数', () => {
    const value = service.transform('str');
    expect(value).toEqual('str');
  });
});

describe('ValueTransformerService (enabled static expression support)', () => {
  let service: ValueTransformer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CodeEvaluator,
          useClass: DynamicCodeEvaluator
        }
      ]
    });
    service = TestBed.inject(ValueTransformer);
  });

  it('正确处理字符串参数', () => {
    const value = service.transform('{{return 1}}');
    expect(value).toEqual(1);
  });
});
