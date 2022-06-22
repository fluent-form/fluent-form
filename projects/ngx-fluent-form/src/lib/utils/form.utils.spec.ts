import { array, checkbox, date, group, inputGroup, number, range, slider, time } from '../fluent-form.builder';
import { assignFormToModel, assignModelToForm } from './form.utils';
import { convertSchemasToGroup, standardSchemas } from './schema.utils';

describe('form.utils', () => {
  describe('model to form', () => {
    it('应该能正确处理一级对象', () => {
      const model = { o: 1 };
      const schemas = standardSchemas([number('o')]);
      const form = convertSchemasToGroup(schemas);

      assignModelToForm(model, form, schemas);

      expect(form.getRawValue()).toEqual(model);
    });

    it('应该能正确处理一级对象（input-group）', () => {
      const model = { one: 1, two: 2 };
      const schemas = standardSchemas([
        inputGroup('ig').schemas([
          number('one'),
          number('two'),
        ])
      ]);
      const form = convertSchemasToGroup(schemas);

      assignModelToForm(model, form, schemas);

      expect(form.getRawValue()).toEqual(model);
    });

    it('应该能正确处理多级对象', () => {
      const model = { detail: { o: 1 } };
      const schemas = standardSchemas([
        group('detail').schemas([
          number('o')
        ])
      ]);
      const form = convertSchemasToGroup(schemas);

      assignModelToForm(model, form, schemas);

      expect(form.getRawValue()).toEqual(model);
    });

    it('应该能正确处理一级数组', () => {
      const model = { details: [1] };
      const schemas = standardSchemas([
        array('details').schemas([
          number(0)
        ])
      ]);
      const form = convertSchemasToGroup(schemas);

      assignModelToForm(model, form, schemas);

      expect(form.getRawValue()).toEqual(model);
    });

    it('应该能正确处理多级数组', () => {
      const model = { details: [[1]] };
      const schemas = standardSchemas([
        array('details').schemas([
          array(0).schemas([
            number(0)
          ])
        ])
      ]);
      const form = convertSchemasToGroup(schemas);

      assignModelToForm(model, form, schemas);

      expect(form.getRawValue()).toEqual(model);
    });

    it('应该能正确处理双字段模式', () => {
      const model = { begin: 0, end: 1 };
      const fields = ['begin', 'end'] as const;
      const schemas = standardSchemas([slider(fields)]);
      const form = convertSchemasToGroup(schemas);

      assignModelToForm(model, form, schemas);

      expect(form.getRawValue()).toEqual({
        [fields.toString()]: [0, 1]
      });
    });

    it('应该能正确处理日期控件', () => {
      const d = new Date();
      const model = { date: d.getTime() };
      const schemas = standardSchemas([date('date')]);
      const form = convertSchemasToGroup(schemas);

      assignModelToForm(model, form, schemas);

      expect(form.getRawValue()).toEqual({ date: d });
    });

    it('应该能正确处理时间控件', () => {
      const d = new Date();
      const model = { time: d.getTime() };
      const schemas = standardSchemas([time('time')]);
      const form = convertSchemasToGroup(schemas);

      assignModelToForm(model, form, schemas);

      expect(form.getRawValue()).toEqual({ time: d });
    });

    it('应该能正确处理时间区间控件（单字段）', () => {
      const begin = new Date();
      const end = new Date();
      const model = { range: [begin.getTime(), end.getTime()] };
      const schemas = standardSchemas([range('range')]);
      const form = convertSchemasToGroup(schemas);

      assignModelToForm(model, form, schemas);

      expect(form.getRawValue()).toEqual({ range: [begin, end] });
    });

    it('应该能正确处理时间区间控件（双字段）', () => {
      const begin = new Date();
      const end = new Date();
      const model = { begin: begin.getTime(), end: end.getTime() };
      const fields = ['begin', 'end'] as const;
      const schemas = standardSchemas([range(fields)]);
      const form = convertSchemasToGroup(schemas);

      assignModelToForm(model, form, schemas);

      expect(form.getRawValue()).toEqual({ [fields.toString()]: [begin, end] });
    });

    it('应该能正确处理多选框控件', () => {
      const model = { active: [1] };
      const schemas = standardSchemas([
        checkbox('active').options([
          { label: 'one', value: 1 },
          { label: 'two', value: 2 },
        ])
      ]);
      const form = convertSchemasToGroup(schemas);

      assignModelToForm(model, form, schemas);

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
          output: (o: Date) => [o.getFullYear(), o.getMonth() + 1, o.getDate()].join('-')
        })
      ]);
      const form = convertSchemasToGroup(schemas);

      assignModelToForm(model, form, schemas);

      expect(form.getRawValue()).toEqual({
        date: new Date(model.date)
      });
    });
  });

  describe('form to model', () => {
    it('应该能正确处理一级对象', () => {
      const model = {};
      const schemas = standardSchemas([number('o').value(1)]);
      const form = convertSchemasToGroup(schemas);

      assignFormToModel(form, model, schemas);

      expect(model).toEqual({ o: 1 });
    });

    it('应该能正确处理多级对象', () => {
      const model = {};
      const schemas = standardSchemas([
        group('detail').schemas([
          number('o').value(1)
        ])
      ]);
      const form = convertSchemasToGroup(schemas);

      assignFormToModel(form, model, schemas);

      expect(model).toEqual({ detail: { o: 1 } });
    });

    it('应该能正确处理一级数组', () => {
      const model = {};
      const schemas = standardSchemas([
        array('details').schemas([
          number(0).value(1)
        ])
      ]);
      const form = convertSchemasToGroup(schemas);

      assignFormToModel(form, model, schemas);

      expect(model).toEqual({ details: [1] });
    });

    it('应该能正确处理多级数组', () => {
      const model = {};
      const schemas = standardSchemas([
        array('details').schemas([
          array(0).schemas([
            number(0).value(1)
          ])
        ])
      ]);
      const form = convertSchemasToGroup(schemas);

      assignFormToModel(form, model, schemas);

      expect(model).toEqual({ details: [[1]] });
    });

    it('应该能正确处理双字段模式', () => {
      const model = {};
      const schemas = standardSchemas([
        slider(['begin', 'end']).value([0, 1])
      ]);
      const form = convertSchemasToGroup(schemas);

      assignFormToModel(form, model, schemas);

      expect(model).toEqual({ begin: 0, end: 1 });
    });

    it('应该能正确处理日期控件', () => {
      const d = new Date();
      const model = {};
      const schemas = standardSchemas([
        date('date').value(d)
      ]);
      const form = convertSchemasToGroup(schemas);

      assignFormToModel(form, model, schemas);

      expect(model).toEqual({ date: d.getTime() });
    });

    it('应该能正确处理时间控件', () => {
      const d = new Date();
      const model = {};
      const schemas = standardSchemas([
        time('time').value(d)
      ]);
      const form = convertSchemasToGroup(schemas);

      assignFormToModel(form, model, schemas);

      expect(model).toEqual({ time: d.getTime() });
    });

    it('应该能正确处理时间区间控件（单字段）', () => {
      const begin = new Date();
      const end = new Date();
      const model = {};
      const schemas = standardSchemas([
        range('range').value([begin, end])
      ]);
      const form = convertSchemasToGroup(schemas);

      assignFormToModel(form, model, schemas);

      expect(model).toEqual({ range: [begin.getTime(), end.getTime()] });
    });

    it('应该能正确处理时间区间控件（双字段）', () => {
      const begin = new Date();
      const end = new Date();
      const model = {};
      const schemas = standardSchemas([
        range(['begin', 'end']).value([begin, end])
      ]);
      const form = convertSchemasToGroup(schemas);

      assignFormToModel(form, model, schemas);

      expect(model).toEqual({ begin: begin.getTime(), end: end.getTime() });
    });

    it('应该能正确处理多选框控件', () => {
      const model = {};
      const schemas = standardSchemas([
        checkbox('active').value([
          { label: 'one', value: 1, checked: true },
          { label: 'two', value: 2 },
        ]).options([
          { label: 'one', value: 1 },
          { label: 'two', value: 2 },
        ])
      ]);
      const form = convertSchemasToGroup(schemas);

      assignFormToModel(form, model, schemas);

      expect(model).toEqual({ active: [1] });
    });

    it('应该能正确应用映射器', () => {
      const dateStr = '2022-2-22';
      const model = {};
      const schemas = standardSchemas([
        date('date').value(new Date(dateStr)).mapper({
          input: (o: string) => new Date(o),
          output: (o: Date) => [o.getFullYear(), o.getMonth() + 1, o.getDate()].join('-')
        })
      ]);
      const form = convertSchemasToGroup(schemas);

      assignFormToModel(form, model, schemas);

      expect(model).toEqual({ date: dateStr });
    });
  });
});