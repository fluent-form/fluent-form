import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { withAllWidgets } from '../features';
import { provideFluentForm } from '../provider';
import { SchemaUtil } from './schema.utils';
import { ValueUtil } from './value.utils';

describe('ValueUtils', () => {
  let valueUtil: ValueUtil;
  let schemaUtil: SchemaUtil;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withAllWidgets()
        )
      ]
    });

    valueUtil = TestBed.inject(ValueUtil);
    schemaUtil = TestBed.inject(SchemaUtil);
  });

  describe('get value from model', () => {
    describe('normal', () => {
      it('no init value and default value', () => {
        const model = {};
        const schema = schemaUtil.patch({ kind: 'number', key: 'num' });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBeNull();
      });

      it('with init value', () => {
        const model = { num: 1 };
        const schema = schemaUtil.patch({ kind: 'number', key: 'num' });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBe(1);
      });

      it('with default value', () => {
        const model = {};
        const schema = schemaUtil.patch({ kind: 'number', key: 'num', defaultValue: 1 });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBe(1);
      });

      it('with init value and default value', () => {
        const model = { num: 2 };
        const schema = schemaUtil.patch({ kind: 'number', key: 'num', defaultValue: 1 });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBe(2);
      });

      it('with mapper', () => {
        const model = { num: '1' };
        const schema = schemaUtil.patch({
          kind: 'number',
          key: 'num',
          mapper: {
            parser: (value: string) => Number(value),
            formatter: (value: SafeAny) => String(value)
          }
        });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBe(1);
      });
    });

    describe('path key schema', () => {
      it('no init value and default value', () => {
        const model = {};
        const schema = schemaUtil.patch({ kind: 'number', key: 'user.age' });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBeNull();
      });

      it('with init value', () => {
        const model = { user: { age: 1 } };
        const schema = schemaUtil.patch({ kind: 'number', key: 'user.age' });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBe(1);
      });

      it('with default value', () => {
        const model = {};
        const schema = schemaUtil.patch({ kind: 'number', key: 'user.age', defaultValue: 1 });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBe(1);
      });

      it('with init value and default value', () => {
        const model = { user: { age: 2 } };
        const schema = schemaUtil.patch({ kind: 'number', key: 'user.age', defaultValue: 1 });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBe(2);
      });

      it('with mapper', () => {
        const model = { user: { age: '1' } };
        const schema = schemaUtil.patch({
          kind: 'number',
          key: 'user.age',
          mapper: {
            parser: (value: string) => Number(value),
            formatter: (value: SafeAny) => String(value)
          }
        });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBe(1);
      });
    });

    describe('double key control', () => {
      it('no init value and default value', () => {
        const model = {};
        const schema = schemaUtil.patch({ kind: 'slider', key: ['start', 'end'], type: 'range', });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBeNull();
      });

      it('with init value', () => {
        const model = { start: 0, end: 100 };
        const schema = schemaUtil.patch({ kind: 'slider', key: ['start', 'end'], type: 'range', });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toEqual([0, 100]);
      });

      it('with default value', () => {
        const model = {};
        const schema = schemaUtil.patch({ kind: 'slider', key: ['start', 'end'], type: 'range', defaultValue: [0, 100] });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toEqual([0, 100]);
      });

      it('with init value and default value', () => {
        const model = { start: 1, end: 99 };
        const schema = schemaUtil.patch({ kind: 'slider', key: ['start', 'end'], type: 'range', defaultValue: [0, 100] });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toEqual([1, 99]);
      });

      it('with mapper', () => {
        const model = { start: '0', end: '100' };
        const schema = schemaUtil.patch({
          kind: 'slider',
          key: ['start', 'end'],
          type: 'range',
          mapper: {
            parser: (value: [string, string]) => value.map(Number) as [number, number],
            formatter: (value?: [number, number] | number | null) => (value as [number, number]).map(String) as [string, string]
          }
        });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toEqual([0, 100]);
      });
    });

    describe('date control', () => {
      it('with no init value and default value', () => {
        const model = {};
        const schema = schemaUtil.patch({ kind: 'date', key: 'date' });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBeNull();
      });

      it('with init value', () => {
        const now = Date.now();
        const model = { date: now };
        const schema = schemaUtil.patch({ kind: 'date', key: 'date' });
        const value = valueUtil.valueOfModel(model, schema) as Date;

        expect(value).toBeInstanceOf(Date);
        expect(value.getTime()).toBe(now);
      });

      it('with default value', () => {
        const now = Date.now();
        const model = {};
        const schema = schemaUtil.patch({ kind: 'date', key: 'date', defaultValue: now });
        const value = valueUtil.valueOfModel(model, schema) as Date;

        expect(value).toBeInstanceOf(Date);
        expect(value.getTime()).toBe(now);
      });
    });

    describe('time control', () => {
      it('with no init value and default value', () => {
        const model = {};
        const schema = schemaUtil.patch({ kind: 'time', key: 'time' });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBeNull();
      });

      it('with init value', () => {
        const now = Date.now();
        const model = { time: now };
        const schema = schemaUtil.patch({ kind: 'time', key: 'time' });
        const value = valueUtil.valueOfModel(model, schema) as Date;

        expect(value).toBeInstanceOf(Date);
        expect(value.getTime()).toBe(now);
      });

      it('with default value', () => {
        const now = Date.now();
        const model = {};
        const schema = schemaUtil.patch({ kind: 'time', key: 'time', defaultValue: now });
        const value = valueUtil.valueOfModel(model, schema) as Date;

        expect(value).toBeInstanceOf(Date);
        expect(value.getTime()).toBe(now);
      });
    });

    describe('date range control', () => {
      it('with no init value and default value', () => {
        const schema = schemaUtil.patch({ kind: 'date-range', key: ['begin', 'end'] });
        const model = {};
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toEqual(null);
      });

      it('with init value', () => {
        const begin = new Date(), end = new Date();
        const schema = schemaUtil.patch({ kind: 'date-range', key: ['begin', 'end'] });
        const model = { begin, end };
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toEqual([begin, end]);
      });

      it('with init value but is null', () => {
        const schema = schemaUtil.patch({ kind: 'date-range', key: ['begin', 'end'] });
        const model = { begin: null, end: null };
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toEqual(null);
      });

      it('with default value', () => {
        const begin = new Date(), end = new Date();
        const schema = schemaUtil.patch({ kind: 'date-range', key: ['begin', 'end'], defaultValue: [begin, end] });
        const model = {};
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toEqual([begin, end]);
      });
    });

    it('checkbox group control', () => {
      const schema = schemaUtil.patch({
        kind: 'checkbox-group',
        key: 'active',
        options: [
          { label: 'one', value: 1 },
          { label: 'two', value: 2 },
        ],
        defaultValue: [1]
      });
      const model = {};
      const value = valueUtil.valueOfModel(model, schema);

      expect(value).toEqual([
        { label: 'one', value: 1, checked: true },
        { label: 'two', value: 2, checked: false },
      ]);
    });
  });

  describe('get value from control', () => {
    it('normal', () => {
      const schema = schemaUtil.patch({ kind: 'number', key: 'num' });
      const control = new FormControl(1);
      const value = valueUtil.valueOfControl(control, schema);

      expect(value).toBe(1);
    });

    it('with mapper', () => {
      const schema = schemaUtil.patch({
        kind: 'number',
        key: 'num',
        mapper: {
          parser: (value: string) => Number(value),
          formatter: (value: SafeAny) => String(value)
        }
      });
      const control = new FormControl(1);
      const value = valueUtil.valueOfControl(control, schema);

      expect(value).toEqual('1');
    });

    describe('date control', () => {
      it('with has no value', () => {
        const schema = schemaUtil.patch({ kind: 'date', key: 'date', });
        const control = new FormControl(null);
        const value = valueUtil.valueOfControl(control, schema);

        expect(value).toBeNull();
      });

      it('with has value', () => {
        const now = new Date();
        const schema = schemaUtil.patch({ kind: 'date', key: 'date', });
        const control = new FormControl(now);
        const value = valueUtil.valueOfControl(control, schema);

        expect(value).toBe(new Date().setHours(0, 0, 0, 0));
      });

      it('with has value (time mode)', () => {
        const now = new Date();
        const schema = schemaUtil.patch({ kind: 'date', key: 'date', time: true });
        const control = new FormControl(now);
        const value = valueUtil.valueOfControl(control, schema);

        expect(value).toBe(now.getTime());
      });
    });

    describe('time control', () => {
      it('with has no value', () => {
        const schema = schemaUtil.patch({ kind: 'time', key: 'time', });
        const control = new FormControl(null);
        const value = valueUtil.valueOfControl(control, schema);

        expect(value).toBeNull();
      });

      it('with has value', () => {
        const now = new Date();
        const schema = schemaUtil.patch({ kind: 'time', key: 'time', });
        const control = new FormControl(now);
        const value = valueUtil.valueOfControl(control, schema);

        expect(value).toBe(now.getTime());
      });
    });

    describe('date range control', () => {
      it('with has no value', () => {
        const schema = schemaUtil.patch({ kind: 'date-range', key: 'range', });
        const control = new FormControl(null);
        const value = valueUtil.valueOfControl(control, schema);

        expect(value).toBeNull();
      });

      it('with has value', () => {
        const begin = new Date(), end = new Date();
        const schema = schemaUtil.patch({ kind: 'date-range', key: 'range', });
        const control = new FormControl([begin, end]);
        const value = valueUtil.valueOfControl(control, schema);

        expect(value).toEqual([new Date().setHours(0, 0, 0, 0), new Date().setHours(0, 0, 0, 0)]);
      });

      it('with has value (time mode)', () => {
        const begin = new Date(), end = new Date();
        const schema = schemaUtil.patch({ kind: 'date-range', key: 'range', time: true });
        const control = new FormControl([begin, end]);
        const value = valueUtil.valueOfControl(control, schema);

        expect(value).toEqual([begin.getTime(), end.getTime()]);
      });
    });

    it('checkbox group control', () => {
      const schema = schemaUtil.patch({ kind: 'checkbox-group', key: 'active', options: [] });
      const control = new FormControl([
        { label: 'one', value: 1, checked: true },
        { label: 'two', value: 2, checked: false },
      ]);
      const value = valueUtil.valueOfControl(control, schema);

      expect(value).toEqual([1]);
    });
  });
});
