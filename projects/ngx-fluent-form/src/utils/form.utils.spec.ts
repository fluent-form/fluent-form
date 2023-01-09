import { createFormGroup, standardSchemas } from '.';
import { array, button, buttonGroup, checkboxGroup, date, dateRange, group, input, inputGroup, number, slider, time } from '../builders';
import { AnySchema } from '../schemas';
import { formUtils } from './form.utils';
import { modelUtils } from './model.utils';

describe('form.utils', () => {
  describe('model to form', () => {
    it('应该能正确处理一级对象', () => {
      const model = { o: 1 };
      const schemas: AnySchema[] = [{ kind: 'number', name: 'o' }];
      const form = createFormGroup(schemas);
      modelUtils(model, schemas).assign(form);

      expect(form.getRawValue()).toEqual(model);
    });

    it('应该能正确处理一级对象（input-group）', () => {
      const model = { one: 1, two: 2 };
      const schemas: AnySchema[] = [
        {
          kind: 'input-group',
          schemas: [
            { kind: 'number', name: 'one' },
            { kind: 'number', name: 'two' },
          ]
        }
      ];
      const form = createFormGroup(schemas);

      modelUtils(model, schemas).assign(form);

      expect(form.getRawValue()).toEqual(model);
    });

    it('应该能正确处理空对象（button-group）', () => {
      const model = {};
      const schemas: AnySchema[] = [
        {
          kind: 'button-group',
          schemas: [
            { kind: 'button' }
          ]
        }
      ];
      const form = createFormGroup(schemas);

      modelUtils(model, schemas).assign(form);

      expect(form.getRawValue()).toEqual(model);
    });

    describe('应该能正确处理多级对象', () => {
      it('空模型', () => {
        const schemas: AnySchema[] = [
          {
            kind: 'group',
            name: 'detail',
            schemas: [
              { kind: 'number', name: 'o' }
            ]
          }
        ];
        const form = createFormGroup(schemas);
        modelUtils({}, schemas).assign(form);

        expect(form.getRawValue()).toEqual({ detail: { o: null } });
      });

      it('非空模型', () => {
        const model = { detail: { o: 1 } };
        const schemas: AnySchema[] = [
          {
            kind: 'group',
            name: 'detail',
            schemas: [
              { kind: 'number', name: 'o' }
            ]
          }
        ];
        const form = createFormGroup(schemas);

        modelUtils(model, schemas).assign(form);

        expect(form.getRawValue()).toEqual(model);
      });
    });

    describe('应该能正确处理一级数组', () => {
      it('空模型', () => {
        const schemas: AnySchema[] = [
          {
            kind: 'array',
            name: 'details',
            schemas: [
              { kind: 'number', name: 0 }
            ]
          }
        ];
        const form = createFormGroup(schemas);

        modelUtils({}, schemas).assign(form);

        expect(form.getRawValue()).toEqual({ details: [null] });
      });

      it('非空模型', () => {
        const model = { details: [1] };
        const schemas: AnySchema[] = [
          {
            kind: 'array',
            name: 'details',
            schemas: [
              { kind: 'number', name: 0 }
            ]
          }
        ];
        const form = createFormGroup(schemas);

        modelUtils(model, schemas).assign(form);

        expect(form.getRawValue()).toEqual(model);
      });
    });

    it('应该能正确处理数组嵌套对象', () => {
      const schemas = standardSchemas([
        array('details').schemas(
          group().schemas(
            input('name')
          )
        )
      ]);
      const form = createFormGroup(schemas);

      modelUtils({}, schemas).assign(form);

      expect(form.getRawValue()).toEqual({
        details: [
          { name: null }
        ]
      });
    });

    it('应该能正确处理双字段模式', () => {
      const model = { begin: 0, end: 1 };
      const fields = ['begin', 'end'] as const;
      const schemas = standardSchemas([slider(fields)]);
      const form = createFormGroup(schemas);

      modelUtils(model, schemas).assign(form);

      expect(form.getRawValue()).toEqual({
        [fields.toString()]: [0, 1]
      });
    });

    it('应该能正确处理双字段模式（空模型）', () => {
      const model = {};
      const fields = ['begin', 'end'] as const;
      const schemas = standardSchemas([dateRange(fields)]);
      const form = createFormGroup(schemas);

      modelUtils(model, schemas).assign(form);

      expect(form.getRawValue()).toEqual({
        [fields.toString()]: null
      });
    });

    it('应该能正确处理日期控件', () => {
      const d = new Date();
      const model = { date: d.getTime() };
      const schemas = standardSchemas([date('date')]);
      const form = createFormGroup(schemas);

      modelUtils(model, schemas).assign(form);

      expect(form.getRawValue()).toEqual({ date: d });
    });

    it('应该能正确处理时间控件', () => {
      const d = new Date();
      const model = { time: d.getTime() };
      const schemas = standardSchemas([time('time')]);
      const form = createFormGroup(schemas);

      modelUtils(model, schemas).assign(form);

      expect(form.getRawValue()).toEqual({ time: d });
    });

    it('应该能正确处理时间区间控件（单字段）', () => {
      const begin = new Date();
      const end = new Date();
      const model = { range: [begin.getTime(), end.getTime()] };
      const schemas = standardSchemas([dateRange('range')]);
      const form = createFormGroup(schemas);

      modelUtils(model, schemas).assign(form);

      expect(form.getRawValue()).toEqual({ range: [begin, end] });
    });

    it('应该能正确处理时间区间控件（双字段）', () => {
      const begin = new Date();
      const end = new Date();
      const model = { begin: begin.getTime(), end: end.getTime() };
      const fields = ['begin', 'end'] as const;
      const schemas = standardSchemas([dateRange(fields)]);
      const form = createFormGroup(schemas);

      modelUtils(model, schemas).assign(form);

      expect(form.getRawValue()).toEqual({ [fields.toString()]: [begin, end] });
    });

    it('应该能正确处理多选框控件', () => {
      const model = { active: [1] };
      const schemas = standardSchemas([
        checkboxGroup('active').options([
          { label: 'one', value: 1 },
          { label: 'two', value: 2 },
        ])
      ]);
      const form = createFormGroup(schemas);

      modelUtils(model, schemas).assign(form);

      expect(form.getRawValue()).toEqual({
        active: [
          { label: 'one', value: 1, checked: true },
          { label: 'two', value: 2, checked: false },
        ]
      });
    });

    it('应该能正确应用映射器', () => {
      const model = { date: '2022-2-22' };
      const schemas = standardSchemas([
        date('date').mapper({
          input: (o: string) => new Date(o),
          output: o => [o!.getFullYear(), o!.getMonth() + 1, o!.getDate()].join('-')
        })
      ]);
      const form = createFormGroup(schemas);

      modelUtils(model, schemas).assign(form);

      expect(form.getRawValue()).toEqual({
        date: new Date(model.date)
      });
    });
  });

  describe('form to model', () => {
    it('应该能正确处理一级对象', () => {
      const schemas = standardSchemas([number('o').defaultValue(1)]);
      const form = createFormGroup(schemas);
      const model = formUtils(form, schemas).assign({});

      expect(model).toEqual({ o: 1 });
    });

    it('应该能正确处理一级对象（input-group）', () => {
      const schemas = standardSchemas([
        inputGroup().schemas(
          number('o').defaultValue(1)
        )
      ]);
      const form = createFormGroup(schemas);
      const model = formUtils(form, schemas).assign({});

      expect(model).toEqual({ o: 1 });
    });

    it('应该能正确处理一级对象（button-group）', () => {
      const schemas = standardSchemas([
        buttonGroup().schemas(button())
      ]);
      const form = createFormGroup(schemas);
      const model = formUtils(form, schemas).assign({});

      expect(model).toEqual({});
    });

    it('应该能正确处理多级对象', () => {
      const schemas = standardSchemas([
        group('detail').schemas(
          number('o').defaultValue(1)
        )
      ]);
      const form = createFormGroup(schemas);
      const model = formUtils(form, schemas).assign({});

      expect(model).toEqual({ detail: { o: 1 } });
    });

    it('应该能正确处理一级数组', () => {
      const schemas = standardSchemas([
        array('details').schemas(
          number(0).defaultValue(1)
        )
      ]);
      const form = createFormGroup(schemas);
      const model = formUtils(form, schemas).assign({});

      expect(model).toEqual({ details: [1] });
    });

    it('应该能正确处理多级数组', () => {
      const schemas = standardSchemas([
        array('details').schemas(
          array(0).schemas(
            number(0).defaultValue(1)
          )
        )
      ]);
      const form = createFormGroup(schemas);
      const model = formUtils(form, schemas).assign({});

      expect(model).toEqual({ details: [[1]] });
    });

    it('应该能正确处理双字段模式', () => {
      const schemas = standardSchemas([
        slider(['begin', 'end']).defaultValue([0, 1])
      ]);
      const form = createFormGroup(schemas);
      const model = formUtils(form, schemas).assign({});

      expect(model).toEqual({ begin: 0, end: 1 });
    });

    it('应该能正确处理双字段模式（空模型）', () => {
      const schemas = standardSchemas([
        dateRange(['begin', 'end'])
      ]);
      const form = createFormGroup(schemas);
      const model = formUtils(form, schemas).assign({});

      expect(model).toEqual({ begin: null, end: null });
    });

    it('应该能正确处理日期控件', () => {
      const d = new Date();
      const schemas = standardSchemas([
        date('date').defaultValue(d)
      ]);
      const form = createFormGroup(schemas);
      const model = formUtils(form, schemas).assign({});

      expect(model).toEqual({ date: d.getTime() });
    });

    it('应该能正确处理时间控件', () => {
      const d = new Date();
      const schemas = standardSchemas([
        time('time').defaultValue(d)
      ]);
      const form = createFormGroup(schemas);
      const model = formUtils(form, schemas).assign({});

      expect(model).toEqual({ time: d.getTime() });
    });

    it('应该能正确处理时间区间控件（单字段）', () => {
      const begin = new Date();
      const end = new Date();
      const schemas = standardSchemas([
        dateRange('range').defaultValue([begin, end])
      ]);
      const form = createFormGroup(schemas);
      const model = formUtils(form, schemas).assign({});

      expect(model).toEqual({ range: [begin.getTime(), end.getTime()] });
    });

    it('应该能正确处理时间区间控件（双字段）', () => {
      const begin = new Date();
      const end = new Date();
      const schemas = standardSchemas([
        dateRange(['begin', 'end']).defaultValue([begin, end])
      ]);
      const form = createFormGroup(schemas);
      const model = formUtils(form, schemas).assign({});

      expect(model).toEqual({ begin: begin.getTime(), end: end.getTime() });
    });

    it('应该能正确处理多选框控件', () => {
      const schemas = standardSchemas([
        checkboxGroup('active').defaultValue([
          { label: 'one', value: 1, checked: true },
          { label: 'two', value: 2 },
        ]).options([
          { label: 'one', value: 1 },
          { label: 'two', value: 2 },
        ])
      ]);
      const form = createFormGroup(schemas);
      const model = formUtils(form, schemas).assign({});

      expect(model).toEqual({ active: [1] });
    });

    it('应该能正确应用映射器', () => {
      const dateStr = '2022-2-22';
      const schemas = standardSchemas([
        date('date').defaultValue(new Date(dateStr)).mapper({
          input: (o: string) => new Date(o),
          output: o => [o!.getFullYear(), o!.getMonth() + 1, o!.getDate()].join('-')
        })
      ]);
      const form = createFormGroup(schemas);
      const model = formUtils(form, schemas).assign({});

      expect(model).toEqual({ date: dateStr });
    });
  });
});