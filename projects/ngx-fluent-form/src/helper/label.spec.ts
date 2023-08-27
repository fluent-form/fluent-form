import { labelHelper } from './label';

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
  });
});
