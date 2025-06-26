import { form } from '@fluent-form/core';
import { space, spaceCompact, tableColumn } from './control-wrapper';

describe('control-wrapper', () => {
  it('space', () => {
    const schema = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      space().schemas(() => { });
    });
    expect(schema().schemas).toEqual([
      {
        kind: 'space',
        schemas: []
      }
    ]);
  });

  it('spaceCompact', () => {
    const schema = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      spaceCompact().schemas(() => { });
    });
    expect(schema().schemas).toEqual([
      {
        kind: 'space-compact',
        schemas: []
      }
    ]);
  });

  it('tableColumn', () => {
    const schema = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      tableColumn().schemas(() => { });
    });
    expect(schema().schemas).toEqual([
      {
        kind: 'table-column',
        schemas: []
      }
    ]);
  });
});
