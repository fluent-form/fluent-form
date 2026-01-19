import { form } from '@fluent-form/core';
import { applyGroup, array, cardsArray, group, tableArray, tableRowGroup, tabsArray } from './control-container';

describe('control-container', () => {
  it('applyGroup', () => {
    const schema = form(() => {
      applyGroup().layout('horizontal');
    });
    expect(schema()).toEqual({
      kind: 'group',
      key: 'root',
      layout: 'horizontal',
      schemas: []
    });
  });

  it('group', () => {
    const schema = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      group('group').schemas(() => { });
    });
    expect(schema().schemas).toEqual([
      {
        kind: 'group',
        key: 'group',
        schemas: []
      }
    ]);
  });

  it('tableRowGroup', () => {
    const schema = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      tableRowGroup('group').schemas(() => { });
    });
    expect(schema().schemas).toEqual([
      {
        kind: 'table-row-group',
        key: 'group',
        schemas: []
      }
    ]);
  });

  it('array', () => {
    const schema = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      array('array').schemas(() => { });
    });
    expect(schema().schemas).toEqual([
      {
        kind: 'array',
        key: 'array',
        schemas: []
      }
    ]);
  });

  it('tabsArray', () => {
    const schema = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      tabsArray('tabs-array').schemas(() => { });
    });
    expect(schema().schemas).toEqual([
      {
        kind: 'tabs-array',
        key: 'tabs-array',
        schemas: []
      }
    ]);
  });

  it('cardsArray', () => {
    const schema = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      cardsArray('cards-array').schemas(() => { });
    });
    expect(schema().schemas).toEqual([
      {
        kind: 'cards-array',
        key: 'cards-array',
        schemas: []
      }
    ]);
  });

  it('tableArray', () => {
    const schema = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      tableArray('table-array').schemas(() => { });
    });
    expect(schema().schemas).toEqual([
      {
        kind: 'table-array',
        key: 'table-array',
        schemas: []
      }
    ]);
  });
});
