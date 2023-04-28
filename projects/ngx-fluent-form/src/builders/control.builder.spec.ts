import { CascaderControlSchema, CheckboxControlSchema, HeadlessControlSchema, InputControlSchema, NumberInputControlSchema, RadioGroupControlSchema, RateControlSchema, SelectControlSchema, SliderControlSchema, TextareaControlSchema, ToggleControlSchema, TreeSelectControlSchema } from '../schemas';
import { standardSchema } from '../utils';
import { cascader, checkbox, checkboxGroup, date, dateRange, datetime, email, headless, input, integer, number, password, radioGroup, rate, select, slider, telephone, textarea, time, toggle, treeSelect, url } from './control.builder';

describe('control.builder', () => {
  it('headless', () => {
    const schema = standardSchema(headless('headless'));
    const value: HeadlessControlSchema<'headless'> = { kind: 'headless', name: 'headless' };
    expect(schema).toEqual(value);
  });

  it('input', () => {
    const schema = standardSchema(input('input'));
    const value: InputControlSchema<'input'> = { kind: 'input', name: 'input' };
    expect(schema).toEqual(value);
  });

  it('email', () => {
    const schema = standardSchema(email('email'));
    const value: InputControlSchema<'email'> = { kind: 'input', name: 'email', type: 'email' };
    expect(schema).toEqual(value);
  });

  it('telephone', () => {
    const schema = standardSchema(telephone('telephone'));
    const value: InputControlSchema<'telephone'> = { kind: 'input', name: 'telephone', type: 'tel' };
    expect(schema).toEqual(value);
  });

  it('url', () => {
    const schema = standardSchema(url('url'));
    const value: InputControlSchema<'url'> = { kind: 'input', name: 'url', type: 'url' };
    expect(schema).toEqual(value);
  });

  it('password', () => {
    const schema = standardSchema(password('password'));
    const value: InputControlSchema<'password'> = { kind: 'input', name: 'password', type: 'password' };
    expect(schema).toEqual(value);
  });

  it('textarea', () => {
    const schema = standardSchema(textarea('textarea'));
    const value: TextareaControlSchema<'textarea'> = { kind: 'textarea', name: 'textarea' };
    expect(schema).toEqual(value);
  });

  it('number', () => {
    const schema = standardSchema(number('number'));
    const value: NumberInputControlSchema<'number'> = { kind: 'number', name: 'number' };
    expect(schema).toEqual(value);
  });

  it('integer', () => {
    const schema = standardSchema(integer('integer'));
    const value: NumberInputControlSchema<'integer'> = { kind: 'number', name: 'integer', precision: { value: 0, mode: 'cut' } };
    expect(schema).toEqual(value);
  });

  it('date', () => {
    const schema = standardSchema(date('date'));
    expect(schema.kind).toEqual('date');
    expect(schema.name).toEqual('date');
  });

  it('datetime', () => {
    const schema = standardSchema(datetime('datetime'));
    expect(schema.kind).toEqual('date');
    expect(schema.name).toEqual('datetime');
    expect(schema.format).toEqual('yyyy-MM-dd HH:mm:ss');
    expect(schema.time).toBeTrue();
  });

  it('time', () => {
    const schema = standardSchema(time('time'));
    expect(schema.kind).toEqual('time');
    expect(schema.name).toEqual('time');
  });

  it('toggle', () => {
    const schema = standardSchema(toggle('toggle'));
    const value: ToggleControlSchema<'toggle'> = { kind: 'toggle', name: 'toggle' };
    expect(schema).toEqual(value);
  });

  it('select', () => {
    const schema = standardSchema(select('select').options([]));
    const value: SelectControlSchema<'select'> = { kind: 'select', name: 'select', options: [] };
    expect(schema).toEqual(value);
  });

  it('cascader', () => {
    const schema = standardSchema(cascader('cascader').options([]));
    const value: CascaderControlSchema<'cascader'> = { kind: 'cascader', name: 'cascader', options: [] };
    expect(schema).toEqual(value);
  });

  it('treeSelect', () => {
    const schema = standardSchema(treeSelect('treeSelect').options([]));
    const value: TreeSelectControlSchema<'treeSelect'> = { kind: 'tree-select', name: 'treeSelect', options: [] };
    expect(schema).toEqual(value);
  });

  it('radio-group', () => {
    const schema = standardSchema(radioGroup('radioGroup').options([]));
    const value: RadioGroupControlSchema<'radioGroup'> = { kind: 'radio-group', name: 'radioGroup', options: [] };
    expect(schema).toEqual(value);
  });

  it('checkbox', () => {
    const schema = standardSchema(checkbox('checkbox'));
    const value: CheckboxControlSchema<'checkbox'> = { kind: 'checkbox', name: 'checkbox' };
    expect(schema).toEqual(value);
  });

  it('checkboxGroup', () => {
    const schema = standardSchema(checkboxGroup('checkboxGroup').options([]));
    expect(schema.kind).toEqual('checkbox-group');
    expect(schema.name).toEqual('checkboxGroup');
    expect(schema.options).toEqual([]);
  });

  it('rate', () => {
    const schema = standardSchema(rate('rate'));
    const value: RateControlSchema<'rate'> = { kind: 'rate', name: 'rate' };
    expect(schema).toEqual(value);
  });

  it('slider', () => {
    const schema = standardSchema(slider('slider'));
    const value: SliderControlSchema<'slider'> = { kind: 'slider', name: 'slider' };
    expect(schema).toEqual(value);
  });

  it('date-range', () => {
    const schema = standardSchema(dateRange('dateRange'));
    expect(schema.kind).toEqual('date-range');
    expect(schema.name).toEqual('dateRange');
  });
});
