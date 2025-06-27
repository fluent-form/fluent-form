import { labelHelper, lengthHelper, tooltipHelper } from './helper';

describe('label helper', () => {
  describe('label', () => {
    it('content', () => {
      expect(labelHelper.content(undefined)).toBeUndefined();
      expect(labelHelper.content('label')).toEqual('label');
      expect(labelHelper.content({ content: 'label' })).toEqual('label');
    });

    it('span', () => {
      expect(labelHelper.span(undefined)).toBeUndefined();
      expect(labelHelper.span('label')).toBeNull();
      expect(labelHelper.span({ content: 'label' })).toBeUndefined();
      expect(labelHelper.span({ content: 'label', span: 1 })).toBe(1);
    });

    it('width', () => {
      expect(labelHelper.width(undefined)).toBeNull();
      expect(labelHelper.width('label')).toBeNull();
      expect(labelHelper.width({ content: 'label' })).toBeNull();
      expect(labelHelper.width({ content: 'label', width: 1 })).toEqual('1px');
      expect(labelHelper.width({ content: 'label', width: '1rem' })).toEqual('1rem');
    });

    it('wrap', () => {
      expect(labelHelper.wrap(undefined)).toBeFalsy();
      expect(labelHelper.wrap('label')).toBeFalsy();
      expect(labelHelper.wrap({ content: 'label' })).toBeFalsy();
      expect(labelHelper.wrap({ content: 'label', wrap: true })).toBe(true);
    });
  });
});

describe('tooltip helper', () => {
  it('content', () => {
    expect(tooltipHelper.content(undefined)).toBeUndefined();
    expect(tooltipHelper.content('tooltip')).toEqual('tooltip');
    expect(tooltipHelper.content({ content: 'tooltip', icon: 'icon' })).toEqual('tooltip');
  });

  it('icon', () => {
    expect(tooltipHelper.icon(undefined)).toBeUndefined();
    expect(tooltipHelper.icon('tooltip')).toBeNull();
    expect(tooltipHelper.icon({ content: 'tooltip', icon: 'icon' })).toEqual('icon');
  });
});

describe('length', () => {
  it('min', () => {
    expect(lengthHelper.min(undefined)).toBe(0);
    expect(lengthHelper.min(1)).toBe(1);
    expect(lengthHelper.min({ max: 1 })).toBe(0);
    expect(lengthHelper.min({ min: 1 })).toBe(1);
  });

  it('max', () => {
    expect(lengthHelper.max(undefined)).toBe(Infinity);
    expect(lengthHelper.max(1)).toBe(1);
    expect(lengthHelper.max({ min: 1 })).toBe(Infinity);
    expect(lengthHelper.max({ max: 1 })).toBe(1);
  });
});
