import { composeBuilder, isBuilder } from './builder';

describe('compose builder', () => {
  it('isBuilder', () => {
    const builder = composeBuilder();

    expect(isBuilder(builder)).toBe(true);
    expect(isBuilder({})).toBe(false);
  });
});
