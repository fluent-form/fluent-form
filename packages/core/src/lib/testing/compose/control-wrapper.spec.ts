import { form } from './control-container';
import { fieldGroup } from './control-wrapper';

describe('control-wrapper', () => {
  it('fieldGroup', () => {
    const schema = form(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      fieldGroup().schemas(() => { });
    });
    expect(schema().schemas).toEqual([
      {
        kind: 'field-group',
        schemas: []
      }
    ]);
  });
});
