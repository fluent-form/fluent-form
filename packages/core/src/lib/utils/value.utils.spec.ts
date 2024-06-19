import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { provideFluentForm } from '../provider';
import { withTesting } from '../testing';
import { SchemaUtil } from './schema.utils';
import { ValueUtil } from './value.utils';

describe('ValueUtils', () => {
  let valueUtil: ValueUtil;
  let schemaUtil: SchemaUtil;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withTesting()
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
        const schema = schemaUtil.patch({ kind: 'text', key: 'txt' });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBeNull();
      });

      it('with init value', () => {
        const model = { txt: '1' };
        const schema = schemaUtil.patch({ kind: 'text', key: 'txt' });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBe('1');
      });

      it('with default value', () => {
        const model = {};
        const schema = schemaUtil.patch({ kind: 'text', key: 'txt', defaultValue: '1' });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBe('1');
      });

      it('with init value and default value', () => {
        const model = { txt: '2' };
        const schema = schemaUtil.patch({ kind: 'text', key: 'txt', defaultValue: '1' });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBe('2');
      });

      it('with mapper', () => {
        const model = { txt: 1 };
        const schema = schemaUtil.patch({
          kind: 'text',
          key: 'txt',
          mapper: {
            parser: (value: number) => value.toString(),
            formatter: (value: SafeAny) => Number(value)
          }
        });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBe('1');
      });
    });

    describe('path key schema', () => {
      it('no init value and default value', () => {
        const model = {};
        const schema = schemaUtil.patch({ kind: 'text', key: 'user.name' });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBeNull();
      });

      it('with init value', () => {
        const model = { user: { name: 'joy' } };
        const schema = schemaUtil.patch({ kind: 'text', key: 'user.name' });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBe('joy');
      });

      it('with default value', () => {
        const model = {};
        const schema = schemaUtil.patch({ kind: 'text', key: 'user.name', defaultValue: 'mike' });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBe('mike');
      });

      it('with init value and default value', () => {
        const model = { user: { name: 'joy' } };
        const schema = schemaUtil.patch({ kind: 'text', key: 'user.name', defaultValue: 'mike' });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBe('joy');
      });

      it('with mapper', () => {
        const model = { user: { name: 'joy' } };
        const schema = schemaUtil.patch({
          kind: 'text',
          key: 'user.name',
          mapper: {
            parser: (value: string) => value.toUpperCase(),
            formatter: (value: string) => value.toLowerCase()
          }
        });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBe('JOY');
      });
    });

    describe('mulit key control', () => {
      it('no init value and default value', () => {
        const model = {};
        const schema = schemaUtil.patch({ kind: 'range', key: ['start', 'end'], type: 'range', });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBeNull();
      });

      it('with init value', () => {
        const model = { start: 0, end: 100 };
        const schema = schemaUtil.patch({ kind: 'range', key: ['start', 'end'], type: 'range', });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toEqual([0, 100]);
      });

      it('with default value', () => {
        const model = {};
        const schema = schemaUtil.patch({ kind: 'range', key: ['start', 'end'], type: 'range', defaultValue: [0, 100] });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toEqual([0, 100]);
      });

      it('with init value and default value', () => {
        const model = { start: 1, end: 99 };
        const schema = schemaUtil.patch({ kind: 'range', key: ['start', 'end'], type: 'range', defaultValue: [0, 100] });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toEqual([1, 99]);
      });

      it('with mapper', () => {
        const model = { start: '0', end: '100' };
        const schema = schemaUtil.patch({
          kind: 'range',
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

    // TODO
    xdescribe('date control', () => {
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

    // TODO
    xdescribe('time control', () => {
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

    // TODO
    xdescribe('date range control', () => {
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

    // TODO
    xit('checkbox group control', () => {
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
      const schema = schemaUtil.patch({ kind: 'text', key: 'txt' });
      const control = new FormControl('1');
      const value = valueUtil.valueOfControl(control, schema);

      expect(value).toBe('1');
    });

    it('with mapper', () => {
      const schema = schemaUtil.patch({
        kind: 'text',
        key: 'txt',
        mapper: {
          parser: (value: string) => value.toUpperCase(),
          formatter: (value: string) => value.toLowerCase()
        }
      });
      const control = new FormControl('TXT');
      const value = valueUtil.valueOfControl(control, schema);

      expect(value).toEqual('txt');
    });

    // TODO
    xdescribe('date control', () => {
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
    // TODO
    xdescribe('time control', () => {
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
    // TODO
    xdescribe('date range control', () => {
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
    // TODO
    xit('checkbox group control', () => {
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
