import { RenderablePipe } from './renderable.pipe';

describe('RenderablePipe', () => {
  it('create an instance', () => {
    const pipe = new RenderablePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return true for HeadlessControlSchema with template', () => {
    const pipe = new RenderablePipe();
    const schema = {
      kind: 'headless',
      template: 'template'
    };
    expect(pipe.transform(schema)).toBe(true);
  });

  it('should return false for HeadlessControlSchema without template', () => {
    const pipe = new RenderablePipe();
    const schema = {
      kind: 'headless'
    };
    expect(pipe.transform(schema)).toBe(false);
  });

  it('should return true for AbstractSchema', () => {
    const pipe = new RenderablePipe();
    const schema = {
      kind: 'input'
    };
    expect(pipe.transform(schema)).toBe(true);
  });
});
