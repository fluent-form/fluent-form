import { RenderablePipe } from './renderable.pipe';

describe('RenderablePipe', () => {
  it('create an instance', () => {
    const pipe = new RenderablePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return true for HeadedControlSchema', () => {
    const pipe = new RenderablePipe();
    const schema = {
      kind: 'headed',
      template: 'template'
    };
    expect(pipe.transform(schema)).toBe(true);
  });

  it('should return false for HeadlessControlSchema', () => {
    const pipe = new RenderablePipe();
    const schema = {
      kind: 'headless'
    };
    expect(pipe.transform(schema)).toBe(false);
  });

  it('should return true for AbstractSchema', () => {
    const pipe = new RenderablePipe();
    const schema = {
      kind: 'text-field'
    };
    expect(pipe.transform(schema)).toBe(true);
  });
});
