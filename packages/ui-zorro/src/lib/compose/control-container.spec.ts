import { form } from '@fluent-form/core';
import { array, cardsArray, group, tabsArray } from './control-container';

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
});
