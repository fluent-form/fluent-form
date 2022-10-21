import { SafeAny } from '@ngify/types';
import { AbstractTextControlSchema, CheckboxControlSchema, DatePickerControlSchema, InputControlSchema, NumberInputControlSchema, RangePickerControlSchema, RateControlSchema, SliderControlSchema, TextareaControlSchema, TimePickerControlSchema, ToggleControlSchema } from '../schemas';
import { standardSchema } from '../utils';
import { cascader, checkbox, checkboxGroup, date, datetime, email, input, number, password, radio, range, rate, select, slider, string, textarea, time, toggle, treeSelect } from './control.builder';

describe('control.builder', () => {
  it('input', () => {
    const schema = standardSchema(input('input'));
    const value = { type: 'input', name: 'input' } as InputControlSchema<'input', string>;
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
    const value = { type: 'input', name: 'string', subtype: 'text' } as InputControlSchema<'string', string>;
    expect(schema).toEqual(value);
  });

  it('email', () => {
    const schema = standardSchema(email('email'));
    const value = { type: 'input', name: 'email', subtype: 'email' } as InputControlSchema<'email', string>;
    expect(schema).toEqual(value);
  });

  it('password', () => {
    const schema = standardSchema(password('password'));
    const value = { type: 'input', name: 'password', subtype: 'password' } as InputControlSchema<'password', string>;
    expect(schema).toEqual(value);
  });

  it('textarea', () => {
    const schema = standardSchema(textarea('textarea'));
    const value = standardSchema({ type: 'textarea', name: 'textarea' }) as TextareaControlSchema<'textarea', string>;
    expect(schema).toEqual(value);
  });

  it('number', () => {
    const schema = standardSchema(number('number'));
    const value = { type: 'number', name: 'number' } as NumberInputControlSchema<'number', number>;
    expect(schema).toEqual(value);
  });

  it('date', () => {
    const schema = standardSchema(date('date'));
    const value = { type: 'date', name: 'date' } as DatePickerControlSchema<'date', Date>;
    expect(schema).toEqual(value);
  });

  it('datetime', () => {
    const schema = standardSchema(datetime('datetime'));
    const value = {
      type: 'date',
      name: 'datetime',
      format: 'yyyy-MM-dd HH:mm:ss',
      time: true
    } as DatePickerControlSchema<'datetime', Date>;
    expect(schema).toEqual(value);
  });

  it('time', () => {
    const schema = standardSchema(time('time'));
    const value = { type: 'time', name: 'time' } as TimePickerControlSchema<'time', Date>;
    expect(schema).toEqual(value);
  });

  it('toggle', () => {
    const schema = standardSchema(toggle('toggle'));
    const value = { type: 'toggle', name: 'toggle' } as ToggleControlSchema<'toggle', boolean>;
    expect(schema).toEqual(value);
  });

  it('select', () => {
    const schema = standardSchema(select('select').options([]));
    const value = { type: 'select', name: 'select', options: [] } as SafeAny;
    expect(schema).toEqual(value);
  });

  it('cascader', () => {
    const schema = standardSchema(cascader('cascader').options([]));
    const value = { type: 'cascader', name: 'cascader', options: [] } as SafeAny;
    expect(schema).toEqual(value);
  });

  it('treeSelect', () => {
    const schema = standardSchema(treeSelect('treeSelect').options([]));
    const value = { type: 'tree-select', name: 'treeSelect', options: [] } as SafeAny;
    expect(schema).toEqual(value);
  });

  it('radio', () => {
    const schema = standardSchema(radio('radio').options([]));
    const value = { type: 'radio', name: 'radio', options: [] } as SafeAny;
    expect(schema).toEqual(value);
  });

  it('checkbox', () => {
    const schema = standardSchema(checkbox('checkbox'));
    const value = { type: 'checkbox', name: 'checkbox' } as CheckboxControlSchema<'checkbox', boolean>;
    expect(schema).toEqual(value);
  });

  it('checkboxGroup', () => {
    const schema = standardSchema(checkboxGroup('checkboxGroup').options([]));
    const value = { type: 'checkbox-group', name: 'checkboxGroup', options: [] } as SafeAny;
    expect(schema).toEqual(value);
  });

  it('rate', () => {
    const schema = standardSchema(rate('rate'));
    const value = { type: 'rate', name: 'rate' } as RateControlSchema<'rate', number>;
    expect(schema).toEqual(value);
  });

  it('slider', () => {
    const schema = standardSchema(slider('slider'));
    const value = { type: 'slider', name: 'slider' } as SliderControlSchema<'slider', number | [number, number]>;
    expect(schema).toEqual(value);
  });

  it('range', () => {
    const schema = standardSchema(range('range'));
    const value = { type: 'range', name: 'range' } as RangePickerControlSchema<'range', [Date, Date]>;
    expect(schema).toEqual(value);
  });
});