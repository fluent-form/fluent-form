import { form } from '@fluent-form/core';
import {
  cascader,
  checkbox,
  checkboxGroup,
  colorPicker,
  datePicker,
  dateRangePicker,
  datetimePicker,
  headful,
  numberField,
  passwordField,
  radioGroup,
  rate,
  segmented,
  select,
  slider,
  textArea,
  textField,
  timePicker,
  toggle,
  transfer,
  treeSelect
} from './control';

describe('control', () => {
  it('headful', () => {
    const schema = form(() => headful('headful'));
    expect(schema().schemas).toEqual([{ kind: 'headful', key: 'headful' }]);
  });

  it('text', () => {
    const schema = form(() => textField('txt'));
    expect(schema().schemas).toEqual([{ kind: 'text-field', key: 'txt' }]);
  });

  it('password', () => {
    const schema = form(() => passwordField('password'));
    expect(schema().schemas).toEqual([{ kind: 'text-field', key: 'password', type: 'password' }]);
  });

  it('textarea', () => {
    const schema = form(() => textArea('textarea'));
    expect(schema().schemas).toEqual([{ kind: 'text-area', key: 'textarea' }]);
  });

  it('number', () => {
    const schema = form(() => numberField('number'));
    expect(schema().schemas).toEqual([{ kind: 'number-field', key: 'number' }]);
  });

  it('date-picker', () => {
    const schema = form(() => datePicker('date'));
    expect(schema().schemas).toEqual([{ kind: 'date-picker', key: 'date' }]);
  });

  it('datetime-picker', () => {
    const schema = form(() => datetimePicker('datetime'));
    expect(schema().schemas).toEqual([
      {
        kind: 'date-picker',
        key: 'datetime',
        time: true
      }
    ]);
  });

  it('time-picker', () => {
    const schema = form(() => timePicker('time'));
    expect(schema().schemas).toEqual([{ kind: 'time-picker', key: 'time' }]);
  });

  it('toggle', () => {
    const schema = form(() => toggle('toggle'));
    expect(schema().schemas).toEqual([{ kind: 'toggle', key: 'toggle' }]);
  });

  it('select', () => {
    const schema = form(() => select('select').options([]));
    expect(schema().schemas).toEqual([{ kind: 'select', key: 'select', options: [] }]);
  });

  it('cascader', () => {
    const schema = form(() => cascader('cascader').options([]));
    expect(schema().schemas).toEqual([{ kind: 'cascader', key: 'cascader', options: [] }]);
  });

  it('tree-select', () => {
    const schema = form(() => treeSelect('treeSelect').options([]));
    expect(schema().schemas).toEqual([{ kind: 'tree-select', key: 'treeSelect', options: [] }]);
  });

  it('radio-group', () => {
    const schema = form(() => radioGroup('radioGroup').options([]));
    expect(schema().schemas).toEqual([{ kind: 'radio-group', key: 'radioGroup', options: [] }]);
  });

  it('checkbox', () => {
    const schema = form(() => checkbox('checkbox'));
    expect(schema().schemas).toEqual([{ kind: 'checkbox', key: 'checkbox' }]);
  });

  it('checkbox-group', () => {
    const schema = form(() => checkboxGroup('checkboxGroup').options([]));
    expect(schema().schemas).toEqual([{ kind: 'checkbox-group', key: 'checkboxGroup', options: [] }]);
  });

  it('rate', () => {
    const schema = form(() => rate('rate'));
    expect(schema().schemas).toEqual([{ kind: 'rate', key: 'rate' }]);
  });

  it('slider', () => {
    const schema = form(() => slider('slider'));
    expect(schema().schemas).toEqual([{ kind: 'slider', key: 'slider' }]);
  });

  it('date-range-picker', () => {
    const schema = form(() => dateRangePicker('dateRange'));
    expect(schema().schemas).toEqual([{ kind: 'date-range-picker', key: 'dateRange' }]);
  });

  it('transfer', () => {
    const schema = form(() => transfer('transfer'));
    expect(schema().schemas).toEqual([{ kind: 'transfer', key: 'transfer' }]);
  });

  it('color-picker', () => {
    const schema = form(() => colorPicker('color'));
    expect(schema().schemas).toEqual([{ kind: 'color-picker', key: 'color' }]);
  });

  it('segmented', () => {
    const schema = form(() => segmented('segmented'));
    expect(schema().schemas).toEqual([{ kind: 'segmented', key: 'segmented' }]);
  });
});
