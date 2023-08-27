import { tooltipHelper } from './tooltip';

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
