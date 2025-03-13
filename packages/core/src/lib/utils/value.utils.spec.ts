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
        const schema = schemaUtil.patch({ kind: 'text-field', key: 'txt' });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBeNull();
      });

      it('with init value', () => {
        const model = { txt: '1' };
        const schema = schemaUtil.patch({ kind: 'text-field', key: 'txt' });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBe('1');
      });

      it('with default value', () => {
        const model = {};
        const schema = schemaUtil.patch({ kind: 'text-field', key: 'txt', defaultValue: '1' });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBe('1');
      });

      it('with init value and default value', () => {
        const model = { txt: '2' };
        const schema = schemaUtil.patch({ kind: 'text-field', key: 'txt', defaultValue: '1' });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBe('2');
      });

      it('with mapper', () => {
        const model = { txt: 1 };
        const schema = schemaUtil.patch({
          kind: 'text-field',
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
        const schema = schemaUtil.patch({ kind: 'text-field', key: 'user.name' });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBeNull();
      });

      it('with init value', () => {
        const model = { user: { name: 'joy' } };
        const schema = schemaUtil.patch({ kind: 'text-field', key: 'user.name' });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBe('joy');
      });

      it('with default value', () => {
        const model = {};
        const schema = schemaUtil.patch({ kind: 'text-field', key: 'user.name', defaultValue: 'mike' });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBe('mike');
      });

      it('with init value and default value', () => {
        const model = { user: { name: 'joy' } };
        const schema = schemaUtil.patch({ kind: 'text-field', key: 'user.name', defaultValue: 'mike' });
        const value = valueUtil.valueOfModel(model, schema);

        expect(value).toBe('joy');
      });

      it('with mapper', () => {
        const model = { user: { name: 'joy' } };
        const schema = schemaUtil.patch({
          kind: 'text-field',
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
  });

  describe('get value from control', () => {
    it('normal', () => {
      const schema = schemaUtil.patch({ kind: 'text-field', key: 'txt' });
      const control = new FormControl('1');
      const value = valueUtil.valueOfControl(control, schema);

      expect(value).toBe('1');
    });

    it('with mapper', () => {
      const schema = schemaUtil.patch({
        kind: 'text-field',
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
  });
});
