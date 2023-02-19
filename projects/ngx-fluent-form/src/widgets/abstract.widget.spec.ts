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
