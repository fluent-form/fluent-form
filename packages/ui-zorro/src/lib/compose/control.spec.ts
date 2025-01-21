import { form } from '@fluent-form/core';
import { cascader, checkbox, checkboxGroup, color, datePicker, dateRangePicker, datetimePicker, headful, number, password, radioGroup, rate, select, slider, text, textarea, timePicker, toggle, treeSelect } from './control';

describe('control', () => {
  it('headful', () => {
    const { schemas } = form(() => headful('headful'));
    expect(schemas).toEqual([{ kind: 'headful', key: 'headful' }]);
  });

  it('text', () => {
    const { schemas } = form(() => text('txt'));
    expect(schemas).toEqual([{ kind: 'text', key: 'txt' }]);
  });

  it('password', () => {
    const { schemas } = form(() => password('password'));
    expect(schemas).toEqual([{ kind: 'text', key: 'password', type: 'password' }]);
  });

  it('textarea', () => {
    const { schemas } = form(() => textarea('textarea'));
    expect(schemas).toEqual([{ kind: 'textarea', key: 'textarea' }]);
  });

  it('number', () => {
    const { schemas } = form(() => number('number'));
    expect(schemas).toEqual([{ kind: 'number', key: 'number' }]);
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

  it('color', () => {
    const { schemas } = form(() => color('color'));
    expect(schemas).toEqual([{ kind: 'color', key: 'color' }]);
  });
});
