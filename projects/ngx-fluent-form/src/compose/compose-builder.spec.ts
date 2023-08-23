import { composeBuilder, isBuilder } from './compose-builder';

describe('compose builder', () => {
  it('isBuilder', () => {
    const builder = composeBuilder();

    expect(isBuilder(builder)).toBeTrue();
    expect(isBuilder({})).toBeFalse();
  });
});
