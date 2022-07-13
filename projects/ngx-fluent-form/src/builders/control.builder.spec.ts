import { SafeAny } from '@ngify/types';
import { CheckboxControlSchema, DatePickerControlSchema, InputControlSchema, NumberInputControlSchema, RangePickerControlSchema, RateControlSchema, SliderControlSchema, SwitchControlSchema, TextareaControlSchema, TimePickerControlSchema } from '../schemas';
import { standardSchema } from '../utils/schema.utils';
import { array, cascader, checkbox, checkboxGroup, date, datetime, group, input, number, radio, range, rate, select, slider, switcher, textarea, time } from './control.builder';

describe('control.builder', () => {
  it('input', () => {
    const schema = standardSchema(input('input'));
    const value = { type: 'input', name: 'input' } as InputControlSchema<'input', string>;
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
      showTime: true
    } as DatePickerControlSchema<'datetime', Date>;
    expect(schema).toEqual(value);
  });

  it('time', () => {
    const schema = standardSchema(time('time'));
    const value = { type: 'time', name: 'time' } as TimePickerControlSchema<'time', Date>;
    expect(schema).toEqual(value);
  });

  it('switcher', () => {
    const schema = standardSchema(switcher('switcher'));
    const value = { type: 'switch', name: 'switcher' } as SwitchControlSchema<'switcher', boolean>;
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

  it('group', () => {
    const schema = standardSchema(group('group').schemas());
    const value = { type: 'group', name: 'group', schemas: [] } as SafeAny;
    expect(schema).toEqual(value);
  });

  it('array', () => {
    const schema = standardSchema(array('array').schemas());
    const value = { type: 'array', name: 'array', schemas: [] } as SafeAny;
    expect(schema).toEqual(value);
  });
});