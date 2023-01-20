import { FormControl } from '@angular/forms';
import { AnySchema } from '../schemas';
import { valueUtils } from './value.utils';

describe('ValueUtils', () => {
  describe('getValueFromModel', () => {
    describe('normal', () => {
      it('no init value and default value', () => {
        const model = {};
        const schema: AnySchema = { kind: 'number', name: 'num' };
        const value = valueUtils(model, schema).getValue();

        expect(value).toBeNull();
      });

      it('with init value', () => {
        const model = { num: 1 };
        const schema: AnySchema = { kind: 'number', name: 'num' };
        const value = valueUtils(model, schema).getValue();

        expect(value).toBe(1);
      });

      it('with default value', () => {
        const model = {};
        const schema: AnySchema = { kind: 'number', name: 'num', defaultValue: 1 };
        const value = valueUtils(model, schema).getValue();

        expect(value).toBe(1);
      });

      it('with init value and default value', () => {
        const model = { num: 2 };
        const schema: AnySchema = { kind: 'number', name: 'num', defaultValue: 1 };
        const value = valueUtils(model, schema).getValue();

        expect(value).toBe(2);
      });

      it('with mapper', () => {
        const model = { num: '1' };
        const schema: AnySchema = {
          kind: 'number',
          name: 'num',
          mapper: {
            input: (value: string) => Number(value),
            output: value => String(value)
          }
        };
        const value = valueUtils(model, schema).getValue();

        expect(value).toBe(1);
      });
    });

    describe('double key control', () => {
      it('no init value and default value', () => {
        const model = {};
        const schema: AnySchema = { kind: 'slider', name: ['start', 'end'], range: true, };
        const value = valueUtils(model, schema).getValue();

        expect(value).toBeNull();
      });

      it('with init value', () => {
        const model = { start: 0, end: 100 };
        const schema: AnySchema = { kind: 'slider', name: ['start', 'end'], range: true, };
        const value = valueUtils(model, schema).getValue();

        expect(value).toEqual([0, 100]);
      });

      it('with default value', () => {
        const model = {};
        const schema: AnySchema = { kind: 'slider', name: ['start', 'end'], range: true, defaultValue: [0, 100] };
        const value = valueUtils(model, schema).getValue();

        expect(value).toEqual([0, 100]);
      });

      it('with init value and default value', () => {
        const model = { start: 1, end: 99 };
        const schema: AnySchema = { kind: 'slider', name: ['start', 'end'], range: true, defaultValue: [0, 100] };
        const value = valueUtils(model, schema).getValue();

        expect(value).toEqual([1, 99]);
      });

      it('with mapper', () => {
        const model = { start: '0', end: '100' };
        const schema: AnySchema = {
          kind: 'slider',
          name: ['start', 'end'],
          range: true,
          mapper: {
            input: (value: [string, string]) => value.map(Number) as [number, number],
            output: (value?: [number, number] | number | null) => (value as [number, number]).map(String) as [string, string]
          }
        };
        const value = valueUtils(model, schema).getValue();

        expect(value).toEqual([0, 100]);
      });
    });

    describe('date control', () => {
      it('with no init value and default value', () => {
        const model = {};
        const schema: AnySchema = { kind: 'date', name: 'date' };
        const value = valueUtils(model, schema).getValue();

        expect(value).toBeNull();
      });

      it('with init value', () => {
        const now = Date.now();
        const model = { date: now };
        const schema: AnySchema = { kind: 'date', name: 'date' };
        const value = valueUtils(model, schema).getValue() as Date;

        expect(value).toBeInstanceOf(Date);
        expect(value.getTime()).toBe(now);
      });

      it('with default value', () => {
        const now = Date.now();
        const model = {};
        const schema: AnySchema = { kind: 'date', name: 'date', defaultValue: now };
        const value = valueUtils(model, schema).getValue() as Date;

        expect(value).toBeInstanceOf(Date);
        expect(value.getTime()).toBe(now);
      });
    });

    describe('time control', () => {
      it('with no init value and default value', () => {
        const model = {};
        const schema: AnySchema = { kind: 'time', name: 'time' };
        const value = valueUtils(model, schema).getValue();

        expect(value).toBeNull();
      });

      it('with init value', () => {
        const now = Date.now();
        const model = { time: now };
        const schema: AnySchema = { kind: 'time', name: 'time' };
        const value = valueUtils(model, schema).getValue() as Date;

        expect(value).toBeInstanceOf(Date);
        expect(value.getTime()).toBe(now);
      });

      it('with default value', () => {
        const now = Date.now();
        const model = {};
        const schema: AnySchema = { kind: 'time', name: 'time', defaultValue: now };
        const value = valueUtils(model, schema).getValue() as Date;

        expect(value).toBeInstanceOf(Date);
        expect(value.getTime()).toBe(now);
      });
    });

    describe('date range control', () => {
      it('with no init value and default value', () => {
        const schema: AnySchema = { kind: 'date-range', name: ['begin', 'end'] };
        const model = {};
        const value = valueUtils(model, schema).getValue();

        expect(value).toEqual(null);
      });

      it('with init value', () => {
        const begin = new Date(), end = new Date();
        const schema: AnySchema = { kind: 'date-range', name: ['begin', 'end'] };
        const model = { begin, end };
        const value = valueUtils(model, schema).getValue();

        expect(value).toEqual([begin, end]);
      });

      it('with init value but is null', () => {
        const schema: AnySchema = { kind: 'date-range', name: ['begin', 'end'] };
        const model = { begin: null, end: null };
        const value = valueUtils(model, schema).getValue();

        expect(value).toEqual(null);
      });

      it('with default value', () => {
        const begin = new Date(), end = new Date();
        const schema: AnySchema = { kind: 'date-range', name: ['begin', 'end'], defaultValue: [begin, end] };
        const model = {};
        const value = valueUtils(model, schema).getValue();

        expect(value).toEqual([begin, end]);
      });
    });

    it('checkbox group control', () => {
      const schema: AnySchema = {
        kind: 'checkbox-group',
        name: 'active',
        options: [
          { label: 'one', value: 1 },
          { label: 'two', value: 2 },
        ],
        defaultValue: [1]
      };
      const model = {};
      const value = valueUtils(model, schema).getValue();

      expect(value).toEqual([
        { label: 'one', value: 1, checked: true },
        { label: 'two', value: 2, checked: false },
      ]);
    });
  });

  describe('getValueFromControl', () => {
    it('normal', () => {
      const schema: AnySchema = { kind: 'number', name: 'num' };
      const control = new FormControl(1);
      const value = valueUtils(control, schema).getValue();

      expect(value).toBe(1);
    });

    it('with mapper', () => {
      const schema: AnySchema = {
        kind: 'number',
        name: 'num',
        mapper: {
          input: (value: string) => Number(value),
          output: value => String(value)
        }
      };
      const control = new FormControl(1);
      const value = valueUtils(control, schema).getValue();

      expect(value).toEqual('1');
    });

    describe('date control', () => {
      it('with has no value', () => {
        const schema: AnySchema = { kind: 'date', name: 'date', };
        const control = new FormControl(null);
        const value = valueUtils(control, schema).getValue();

        expect(value).toBeNull();
      });

      it('with has value', () => {
        const now = new Date();
        const schema: AnySchema = { kind: 'date', name: 'date', };
        const control = new FormControl(now);
        const value = valueUtils(control, schema).getValue();

        expect(value).toBe(now.getTime());
      });
    });

    describe('time control', () => {
      it('with has no value', () => {
        const schema: AnySchema = { kind: 'time', name: 'time', };
        const control = new FormControl(null);
        const value = valueUtils(control, schema).getValue();

        expect(value).toBeNull();
      });

      it('with has value', () => {
        const now = new Date();
        const schema: AnySchema = { kind: 'time', name: 'time', };
        const control = new FormControl(now);
        const value = valueUtils(control, schema).getValue();

        expect(value).toBe(now.getTime());
      });
    });

    describe('date range control', () => {
      it('with has no value', () => {
        const schema: AnySchema = { kind: 'date-range', name: 'range', };
        const control = new FormControl(null);
        const value = valueUtils(control, schema).getValue();

        expect(value).toBeNull();
      });

      it('with has value', () => {
        const begin = new Date(), end = new Date();
        const schema: AnySchema = { kind: 'date-range', name: 'range', };
        const control = new FormControl([begin, end]);
        const value = valueUtils(control, schema).getValue();

        expect(value).toEqual([begin.getTime(), end.getTime()]);
      });
    });

    it('checkbox group control', () => {
      const schema: AnySchema = { kind: 'checkbox-group', name: 'active', options: [] };
      const control = new FormControl([
        { label: 'one', value: 1, checked: true },
        { label: 'two', value: 2, checked: false },
      ]);
      const value = valueUtils(control, schema).getValue();

      expect(value).toEqual([1]);
    });
  });
});