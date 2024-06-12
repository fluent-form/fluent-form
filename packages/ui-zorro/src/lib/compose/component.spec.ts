import { form } from '@fluent-form/core';
import { alert, button, heading1, heading2, heading3, heading4, heading5, heading6, template, text } from './component';

describe('component', () => {
  it('template', () => {
    const { schemas } = form(() => {
      template('named');
    });
    expect(schemas).toEqual([
      { kind: 'template', key: 'named' }
    ]);
  });

  it('text', () => {
    const { schemas } = form(() => {
      text().content('');
    });
    expect(schemas).toEqual([
      { kind: 'text', content: '' }
    ]);
  });

  it('button', () => {
    const { schemas } = form(() => button());
    expect(schemas).toEqual([
      { kind: 'button' }
    ]);
  });

  it('heading', () => {
    expect(form(() => heading1().content('')).schemas).toEqual([{ kind: 'heading', level: 1, content: '' }]);
    expect(form(() => heading2().content('')).schemas).toEqual([{ kind: 'heading', level: 2, content: '' }]);
    expect(form(() => heading3().content('')).schemas).toEqual([{ kind: 'heading', level: 3, content: '' }]);
    expect(form(() => heading4().content('')).schemas).toEqual([{ kind: 'heading', level: 4, content: '' }]);
    expect(form(() => heading5().content('')).schemas).toEqual([{ kind: 'heading', level: 5, content: '' }]);
    expect(form(() => heading6().content('')).schemas).toEqual([{ kind: 'heading', level: 6, content: '' }]);
  });

  it('alert', () => {
    const { schemas } = form(() => {
      alert().message('');
    });
    expect(schemas).toEqual([
      { kind: 'alert', message: '' }
    ]);
  });
});
