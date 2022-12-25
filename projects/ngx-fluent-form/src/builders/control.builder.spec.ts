import { SafeAny } from '@ngify/types';
import { AbstractTextControlSchema, CheckboxControlSchema, DatePickerControlSchema, InputControlSchema, NumberInputControlSchema, RangePickerControlSchema, RateControlSchema, SliderControlSchema, TextareaControlSchema, TimePickerControlSchema, ToggleControlSchema } from '../schemas';
import { standardSchema } from '../utils';
import { cascader, checkbox, checkboxGroup, date, dateRange, datetime, email, input, integer, number, password, radioGroup, rate, select, slider, string, textarea, time, toggle, treeSelect } from './control.builder';

describe('control.builder', () => {
  it('input', () => {
    const schema = standardSchema(input('input'));
    const value = { kind: 'input', name: 'input' } as InputControlSchema<'input', string>;
    expect(schema).toEqual(value);
  });

  it('input with autocomplete', () => {
    const schema = standardSchema(input('input').autocomplete({ options: [] })) as AbstractTextControlSchema<'input', string>;
    expect(schema.autocomplete!.compare).toBeTruthy();
    const schema2 = standardSchema(input('input').autocomplete({ options: [], compare: (a, b) => a === b })) as AbstractTextControlSchema<'input', string>;
    expect(schema2.autocomplete!.compare).toBeTruthy();
  });

  it('string', () => {
    const schema = standardSchema(string('string'));
    const value = { kind: 'input', name: 'string', type: 'text' } as InputControlSchema<'string', string>;
    expect(schema).toEqual(value);
  });

  it('email', () => {
    const schema = standardSchema(email('email'));
    const value = { kind: 'input', name: 'email', type: 'email' } as InputControlSchema<'email', string>;
    expect(schema).toEqual(value);
  });

  it('password', () => {
    const schema = standardSchema(password('password'));
    const value = { kind: 'input', name: 'password', type: 'password' } as InputControlSchema<'password', string>;
    expect(schema).toEqual(value);
  });

  it('textarea', () => {
    const schema = standardSchema(textarea('textarea'));
    const value = standardSchema({ kind: 'textarea', name: 'textarea' }) as TextareaControlSchema<'textarea', string>;
    expect(schema).toEqual(value);
  });

  it('number', () => {
    const schema = standardSchema(number('number'));
    const value = { kind: 'number', name: 'number' } as NumberInputControlSchema<'number', number>;
    expect(schema).toEqual(value);
  });

  it('integer', () => {
    const schema = standardSchema(integer('integer'));
    const value = { kind: 'number', name: 'integer', precision: { value: 0, mode: 'cut' } } as NumberInputControlSchema<'integer', number>;
    expect(schema).toEqual(value);
  });

  it('date', () => {
    const schema = standardSchema(date('date'));
    const value = { kind: 'date', name: 'date' } as DatePickerControlSchema<'date', Date>;
    expect(schema).toEqual(value);
  });

  it('datetime', () => {
    const schema = standardSchema(datetime('datetime'));
    const value = {
      kind: 'date',
      name: 'datetime',
      format: 'yyyy-MM-dd HH:mm:ss',
      time: true
    } as DatePickerControlSchema<'datetime', Date>;
    expect(schema).toEqual(value);
  });

  it('time', () => {
    const schema = standardSchema(time('time'));
    const value = { kind: 'time', name: 'time' } as TimePickerControlSchema<'time', Date>;
    expect(schema).toEqual(value);
  });

  it('toggle', () => {
    const schema = standardSchema(toggle('toggle'));
    const value = { kind: 'toggle', name: 'toggle' } as ToggleControlSchema<'toggle', boolean>;
    expect(schema).toEqual(value);
  });

  it('select', () => {
    const schema = standardSchema(select('select').options([]));
    const value = { kind: 'select', name: 'select', options: [] } as SafeAny;
    expect(schema).toEqual(value);
  });

  it('cascader', () => {
    const schema = standardSchema(cascader('cascader').options([]));
    const value = { kind: 'cascader', name: 'cascader', options: [] } as SafeAny;
    expect(schema).toEqual(value);
  });

  it('treeSelect', () => {
    const schema = standardSchema(treeSelect('treeSelect').options([]));
    const value = { kind: 'tree-select', name: 'treeSelect', options: [] } as SafeAny;
    expect(schema).toEqual(value);
  });

  it('radio-group', () => {
    const schema = standardSchema(radioGroup('radio-group').options([]));
    const value = { kind: 'radio-group', name: 'radio-group', options: [] } as SafeAny;
    expect(schema).toEqual(value);
  });

  it('checkbox', () => {
    const schema = standardSchema(checkbox('checkbox'));
    const value = { kind: 'checkbox', name: 'checkbox' } as CheckboxControlSchema<'checkbox', boolean>;
    expect(schema).toEqual(value);
  });

  it('checkboxGroup', () => {
    const schema = standardSchema(checkboxGroup('checkboxGroup').options([]));
    const value = { kind: 'checkbox-group', name: 'checkboxGroup', options: [] } as SafeAny;
    expect(schema).toEqual(value);
  });

  it('rate', () => {
    const schema = standardSchema(rate('rate'));
    const value = { kind: 'rate', name: 'rate' } as RateControlSchema<'rate', number>;
    expect(schema).toEqual(value);
  });

  it('slider', () => {
    const schema = standardSchema(slider('slider'));
    const value = { kind: 'slider', name: 'slider' } as SliderControlSchema<'slider', number | [number, number]>;
    expect(schema).toEqual(value);
  });

  it('date-range', () => {
    const schema = standardSchema(dateRange('date-range'));
    const value = { kind: 'date-range', name: 'date-range' } as RangePickerControlSchema<'date-range', [Date, Date]>;
    expect(schema).toEqual(value);
  });
});