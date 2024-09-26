import { affixHelper, labelHelper, tooltipHelper } from './helper';

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

describe('affix helper', () => {
  it('content', () => {
    expect(affixHelper.content(undefined)).toBeUndefined();
    expect(affixHelper.content('user')).toEqual('user');
  });

  it('icon', () => {
    expect(affixHelper.icon(undefined)).toBeUndefined();
    expect(affixHelper.icon('user')).toBeUndefined();
    expect(affixHelper.icon({ icon: 'user' })).toEqual('user');
  });
});
