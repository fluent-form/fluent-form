import { FluentSchemaPipe } from './schema.pipe';

describe('FluentSchemaPipe', () => {
  it('create an instance', () => {
    const pipe = new FluentSchemaPipe();
    expect(pipe).toBeTruthy();
  });
});
