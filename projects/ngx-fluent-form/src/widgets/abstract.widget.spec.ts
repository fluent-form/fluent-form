import { AbstractTextControlWidget } from './abstract.widget';

class TextControlWidget extends AbstractTextControlWidget<unknown> { }

describe('AbstractTextControlWidget', () => {
  let component: AbstractTextControlWidget<unknown>;
  let helper: AbstractTextControlWidget<unknown>['helper'];

  beforeEach(() => {
    component = new TextControlWidget();
    helper = component['helper'];
  });

  describe('helper function', () => {
    it('col.span', () => {
      expect(helper.col.span(undefined)).toBeNull();
      expect(helper.col.span(1)).toBe(1);
      expect(helper.col.span({ span: 1 })).toBe(1);
      expect(helper.col.span({ flex: 1 })).toBeNull();
    });

    it('col.flex', () => {
      expect(helper.col.flex(undefined)).toBeNull();
      expect(helper.col.flex(1)).toBeNull();
      expect(helper.col.flex({ span: 1 })).toBeNull();
      expect(helper.col.flex({ flex: 1 })).toBe(1);
    });

    it('col.offset', () => {
      expect(helper.col.offset(undefined)).toBeNull();
      expect(helper.col.offset(1)).toBeNull();
      expect(helper.col.offset({ span: 1 })).toBeNull();
      expect(helper.col.offset({ offset: 1 })).toBe(1);
    });

    it('length.min', () => {
      expect(helper.length.min(undefined)).toBeUndefined();
      expect(helper.length.min(1)).toBe(1);
      expect(helper.length.min({ max: 1 })).toBeUndefined();
      expect(helper.length.min({ min: 1 })).toBe(1);
    });

    it('length.max', () => {
      expect(helper.length.max(undefined)).toBeUndefined();
      expect(helper.length.max(1)).toBe(1);
      expect(helper.length.max({ min: 1 })).toBeUndefined();
      expect(helper.length.max({ max: 1 })).toBe(1);
    });

    it('autocomplete.compare', () => {
      const fn = (a: unknown, b: unknown) => a === b;
      expect(helper.autocomplete.compare(undefined)).toBeTruthy();
      expect(helper.autocomplete.compare(undefined)(1, 1)).toBeTrue();
      expect(helper.autocomplete.compare(undefined)(1, 2)).toBeFalse();
      expect(helper.autocomplete.compare({ options: [] })).toBeTruthy();
      expect(helper.autocomplete.compare({ options: [], compare: fn })).toBe(fn);
    });
  });
});
