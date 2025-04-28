import { fluentForm, form } from '@fluent-form/core';
import { textField } from './control';
import { applyGroup, array, cardsArray, group, tabsArray } from './control-container';

describe('control-container', () => {
  it('group', () => {
    const { schemas } = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      group('group').schemas(() => { });
    });
    expect(schemas).toEqual([{
      kind: 'group',
      key: 'group',
      schemas: []
    }]);
  });

  it('array', () => {
    const { schemas } = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      array('array').schemas(() => { });
    });
    expect(schemas).toEqual([{
      kind: 'array',
      key: 'array',
      schemas: []
    }]);
  });

  it('tabs-array', () => {
    const { schemas } = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      tabsArray('tabs-array').schemas(() => { });
    });
    expect(schemas).toEqual([{
      kind: 'tabs-array',
      key: 'tabs-array',
      schemas: []
    }]);
  });

  it('cards-array', () => {
    const { schemas } = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      cardsArray('cards-array').schemas(() => { });
    });
    expect(schemas).toEqual([{
      kind: 'cards-array',
      key: 'cards-array',
      schemas: []
    }]);
  });

  it('applyGroup', () => {
    const schema = fluentForm(() => {
      applyGroup({ updateOn: 'blur' });
      textField('input');
    });
    expect(schema()).toEqual({
      kind: 'group',
      key: 'root',
      updateOn: 'blur',
      schemas: [
        { kind: 'text-field', key: 'input' }
      ]
    });
  });
});
