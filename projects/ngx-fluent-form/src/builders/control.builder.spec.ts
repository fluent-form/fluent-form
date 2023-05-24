import { CascaderControlSchema, CheckboxControlSchema, HeadlessControlSchema, InputControlSchema, NumberInputControlSchema, RadioGroupControlSchema, RateControlSchema, SelectControlSchema, SliderControlSchema, TextareaControlSchema, ToggleControlSchema, TreeSelectControlSchema } from '../schemas';
import { standardSchema } from '../utils';
import { cascader, checkbox, checkboxGroup, date, dateRange, datetime, headless, input, number, password, radioGroup, rate, select, slider, textarea, time, toggle, treeSelect } from './control.builder';

describe('control.builder', () => {
  it('headless', () => {
    const schema = standardSchema(headless('headless'));
    const value: HeadlessControlSchema<'headless'> = { kind: 'headless', key: 'headless' };
    expect(schema).toEqual(value);
  });

  it('input', () => {
    const schema = standardSchema(input('input'));
    const value: InputControlSchema<'input'> = { kind: 'input', key: 'input' };
    expect(schema).toEqual(value);
  });

  it('password', () => {
    const schema = standardSchema(password('password'));
    const value: InputControlSchema<'password'> = { kind: 'input', key: 'password', type: 'password' };
    expect(schema).toEqual(value);
  });

  it('textarea', () => {
    const schema = standardSchema(textarea('textarea'));
    const value: TextareaControlSchema<'textarea'> = { kind: 'textarea', key: 'textarea' };
    expect(schema).toEqual(value);
  });

  it('number', () => {
    const schema = standardSchema(number('number'));
    const value: NumberInputControlSchema<'number'> = { kind: 'number', key: 'number' };
    expect(schema).toEqual(value);
  });

  it('date', () => {
    const schema = standardSchema(date('date'));
    expect(schema.kind).toEqual('date');
    expect(schema.key).toEqual('date');
  });

  it('datetime', () => {
    const schema = standardSchema(datetime('datetime'));
    expect(schema.kind).toEqual('date');
    expect(schema.key).toEqual('datetime');
    expect(schema.format).toEqual('yyyy-MM-dd HH:mm:ss');
    expect(schema.time).toBeTrue();
  });

  it('time', () => {
    const schema = standardSchema(time('time'));
    expect(schema.kind).toEqual('time');
    expect(schema.key).toEqual('time');
  });

  it('toggle', () => {
    const schema = standardSchema(toggle('toggle'));
    const value: ToggleControlSchema<'toggle'> = { kind: 'toggle', key: 'toggle' };
    expect(schema).toEqual(value);
  });

  it('select', () => {
    const schema = standardSchema(select('select').options([]));
    const value: SelectControlSchema<'select'> = { kind: 'select', key: 'select', options: [] };
    expect(schema).toEqual(value);
  });

  it('cascader', () => {
    const schema = standardSchema(cascader('cascader').options([]));
    const value: CascaderControlSchema<'cascader'> = { kind: 'cascader', key: 'cascader', options: [] };
    expect(schema).toEqual(value);
  });

  it('treeSelect', () => {
    const schema = standardSchema(treeSelect('treeSelect').options([]));
    const value: TreeSelectControlSchema<'treeSelect'> = { kind: 'tree-select', key: 'treeSelect', options: [] };
    expect(schema).toEqual(value);
  });

  it('radio-group', () => {
    const schema = standardSchema(radioGroup('radioGroup').options([]));
    const value: RadioGroupControlSchema<'radioGroup'> = { kind: 'radio-group', key: 'radioGroup', options: [] };
    expect(schema).toEqual(value);
  });

  it('checkbox', () => {
    const schema = standardSchema(checkbox('checkbox'));
    const value: CheckboxControlSchema<'checkbox'> = { kind: 'checkbox', key: 'checkbox' };
    expect(schema).toEqual(value);
  });

  it('checkboxGroup', () => {
    const schema = standardSchema(checkboxGroup('checkboxGroup').options([]));
    expect(schema.kind).toEqual('checkbox-group');
    expect(schema.key).toEqual('checkboxGroup');
    expect(schema.options).toEqual([]);
  });

  it('rate', () => {
    const schema = standardSchema(rate('rate'));
    const value: RateControlSchema<'rate'> = { kind: 'rate', key: 'rate' };
    expect(schema).toEqual(value);
  });

  it('slider', () => {
    const schema = standardSchema(slider('slider'));
    const value: SliderControlSchema<'slider'> = { kind: 'slider', key: 'slider' };
    expect(schema).toEqual(value);
  });

  it('date-range', () => {
    const schema = standardSchema(dateRange('dateRange'));
    expect(schema.kind).toEqual('date-range');
    expect(schema.key).toEqual('dateRange');
  });
});
