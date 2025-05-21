import { form } from '@fluent-form/core';
import { cascader, checkbox, checkboxGroup, color, datePicker, dateRangePicker, datetimePicker, headed, numberField, passwordField, radioGroup, rate, select, slider, textArea, textField, timePicker, toggle, transfer, treeSelect } from './control';

describe('control', () => {
  it('headed', () => {
    const { schemas } = form(() => headed('headed'));
    expect(schemas).toEqual([{ kind: 'headed', key: 'headed' }]);
  });

  it('text', () => {
    const { schemas } = form(() => textField('txt'));
    expect(schemas).toEqual([{ kind: 'text-field', key: 'txt' }]);
  });

  it('password', () => {
    const { schemas } = form(() => passwordField('password'));
    expect(schemas).toEqual([{ kind: 'text-field', key: 'password', type: 'password' }]);
  });

  it('textarea', () => {
    const { schemas } = form(() => textArea('textarea'));
    expect(schemas).toEqual([{ kind: 'text-area', key: 'textarea' }]);
  });

  it('number', () => {
    const { schemas } = form(() => numberField('number'));
    expect(schemas).toEqual([{ kind: 'number-field', key: 'number' }]);
  });

  it('date-picker', () => {
    const { schemas } = form(() => datePicker('date'));
    expect(schemas).toEqual([{ kind: 'date-picker', key: 'date' }]);
  });

  it('datetime-picker', () => {
    const { schemas } = form(() => datetimePicker('datetime'));
    expect(schemas).toEqual([{
      kind: 'date-picker',
      key: 'datetime',
      time: true
    }]);
  });

  it('time-picker', () => {
    const { schemas } = form(() => timePicker('time'));
    expect(schemas).toEqual([{ kind: 'time-picker', key: 'time' }]);
  });

  it('toggle', () => {
    const { schemas } = form(() => toggle('toggle'));
    expect(schemas).toEqual([{ kind: 'toggle', key: 'toggle' }]);
  });

  it('select', () => {
    const { schemas } = form(() => select('select').options([]));
    expect(schemas).toEqual([{ kind: 'select', key: 'select', options: [] }]);
  });

  it('cascader', () => {
    const { schemas } = form(() => cascader('cascader').options([]));
    expect(schemas).toEqual([{ kind: 'cascader', key: 'cascader', options: [] }]);
  });

  it('tree-select', () => {
    const { schemas } = form(() => treeSelect('treeSelect').options([]));
    expect(schemas).toEqual([{ kind: 'tree-select', key: 'treeSelect', options: [] }]);
  });

  it('radio-group', () => {
    const { schemas } = form(() => radioGroup('radioGroup').options([]));
    expect(schemas).toEqual([{ kind: 'radio-group', key: 'radioGroup', options: [] }]);
  });

  it('checkbox', () => {
    const { schemas } = form(() => checkbox('checkbox'));
    expect(schemas).toEqual([{ kind: 'checkbox', key: 'checkbox' }]);
  });

  it('checkbox-group', () => {
    const { schemas } = form(() => checkboxGroup('checkboxGroup').options([]));
    expect(schemas).toEqual([{ kind: 'checkbox-group', key: 'checkboxGroup', options: [] }]);
  });

  it('rate', () => {
    const { schemas } = form(() => rate('rate'));
    expect(schemas).toEqual([{ kind: 'rate', key: 'rate' }]);
  });

  it('slider', () => {
    const { schemas } = form(() => slider('slider'));
    expect(schemas).toEqual([{ kind: 'slider', key: 'slider' }]);
  });

  it('date-range-picker', () => {
    const { schemas } = form(() => dateRangePicker('dateRange'));
    expect(schemas).toEqual([{ kind: 'date-range-picker', key: 'dateRange' }]);
  });

  it('transfer', () => {
    const { schemas } = form(() => transfer('transfer'));
    expect(schemas).toEqual([{ kind: 'transfer', key: 'transfer' }]);
  });

  it('color', () => {
    const { schemas } = form(() => color('color'));
    expect(schemas).toEqual([{ kind: 'color', key: 'color' }]);
  });
});
