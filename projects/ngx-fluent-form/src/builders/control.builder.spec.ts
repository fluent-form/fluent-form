import { SafeAny } from '@ngify/types';
import { AbstractTextControlSchema, CheckboxControlSchema, DatePickerControlSchema, InputControlSchema, NumberInputControlSchema, RangePickerControlSchema, RateControlSchema, SliderControlSchema, SwitchControlSchema, TextareaControlSchema, TimePickerControlSchema } from '../schemas';
import { array, cascader, checkbox, checkboxGroup, control, date, datetime, group, input, number, radio, range, rate, select, slider, switcher, textarea, time, treeSelect } from './control.builder';

describe('control.builder', () => {
  it('input', () => {
    const schema = control(input('input'));
    const value = { type: 'input', name: 'input' } as InputControlSchema<'input', string>;
    expect(schema).toEqual(value);
  });

  it('input with autocomplete', () => {
    const schema = control(input('input').autocomplete({ options: [] })) as AbstractTextControlSchema<'input', string>;
    expect(schema.autocomplete!.compare).toBeTruthy();
    const schema2 = control(input('input').autocomplete({ options: [], compare: (a, b) => a === b })) as AbstractTextControlSchema<'input', string>;
    expect(schema2.autocomplete!.compare).toBeTruthy();
  });

  it('textarea', () => {
    const schema = control(textarea('textarea'));
    const value = control({ type: 'textarea', name: 'textarea' }) as TextareaControlSchema<'textarea', string>;
    expect(schema).toEqual(value);
  });

  it('number', () => {
    const schema = control(number('number'));
    const value = { type: 'number', name: 'number' } as NumberInputControlSchema<'number', number>;
    expect(schema).toEqual(value);
  });

  it('date', () => {
    const schema = control(date('date'));
    const value = { type: 'date', name: 'date' } as DatePickerControlSchema<'date', Date>;
    expect(schema).toEqual(value);
  });

  it('datetime', () => {
    const schema = control(datetime('datetime'));
    const value = {
      type: 'date',
      name: 'datetime',
      format: 'yyyy-MM-dd HH:mm:ss',
      time: true
    } as DatePickerControlSchema<'datetime', Date>;
    expect(schema).toEqual(value);
  });

  it('time', () => {
    const schema = control(time('time'));
    const value = { type: 'time', name: 'time' } as TimePickerControlSchema<'time', Date>;
    expect(schema).toEqual(value);
  });

  it('switcher', () => {
    const schema = control(switcher('switcher'));
    const value = { type: 'switch', name: 'switcher' } as SwitchControlSchema<'switcher', boolean>;
    expect(schema).toEqual(value);
  });

  it('select', () => {
    const schema = control(select('select').options([]));
    const value = { type: 'select', name: 'select', options: [] } as SafeAny;
    expect(schema).toEqual(value);
  });

  it('cascader', () => {
    const schema = control(cascader('cascader').options([]));
    const value = { type: 'cascader', name: 'cascader', options: [] } as SafeAny;
    expect(schema).toEqual(value);
  });

  it('treeSelect', () => {
    const schema = control(treeSelect('treeSelect').options([]));
    const value = { type: 'tree-select', name: 'treeSelect', options: [] } as SafeAny;
    expect(schema).toEqual(value);
  });

  it('radio', () => {
    const schema = control(radio('radio').options([]));
    const value = { type: 'radio', name: 'radio', options: [] } as SafeAny;
    expect(schema).toEqual(value);
  });

  it('checkbox', () => {
    const schema = control(checkbox('checkbox'));
    const value = { type: 'checkbox', name: 'checkbox' } as CheckboxControlSchema<'checkbox', boolean>;
    expect(schema).toEqual(value);
  });

  it('checkboxGroup', () => {
    const schema = control(checkboxGroup('checkboxGroup').options([]));
    const value = { type: 'checkbox-group', name: 'checkboxGroup', options: [] } as SafeAny;
    expect(schema).toEqual(value);
  });

  it('rate', () => {
    const schema = control(rate('rate'));
    const value = { type: 'rate', name: 'rate' } as RateControlSchema<'rate', number>;
    expect(schema).toEqual(value);
  });

  it('slider', () => {
    const schema = control(slider('slider'));
    const value = { type: 'slider', name: 'slider' } as SliderControlSchema<'slider', number | [number, number]>;
    expect(schema).toEqual(value);
  });

  it('range', () => {
    const schema = control(range('range'));
    const value = { type: 'range', name: 'range' } as RangePickerControlSchema<'range', [Date, Date]>;
    expect(schema).toEqual(value);
  });

  it('group', () => {
    const schema = control(group('group').schemas());
    const value = { type: 'group', name: 'group', schemas: [] } as SafeAny;
    expect(schema).toEqual(value);
  });

  it('array', () => {
    const schema = control(array('array').schemas());
    const value = { type: 'array', name: 'array', schemas: [] } as SafeAny;
    expect(schema).toEqual(value);
  });
});