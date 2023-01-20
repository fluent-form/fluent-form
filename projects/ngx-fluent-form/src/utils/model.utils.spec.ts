import { AnySchema } from '../schemas';
import { createFormGroup } from './form.utils';
import { modelUtils } from './model.utils';

describe('ModelUtils', () => {
  it('with control', () => {
    const schemas: AnySchema[] = [{ kind: 'number', name: 'num' }];
    const form = createFormGroup(schemas);
    const model = { num: 1 };

    expect(modelUtils(model, schemas).assign(form).value).toEqual({ num: 1 });
  });

  it('with double key control', () => {
    const schemas: AnySchema[] = [{ kind: 'slider', name: ['start', 'end'] }];
    const form = createFormGroup(schemas);
    const model = { start: 0, end: 100 };

    expect(modelUtils(model, schemas).assign(form).value).toEqual({ 'start,end': [0, 100] });
  });

  it('with component', () => {
    const schemas: AnySchema[] = [{ kind: 'button' }];
    const form = createFormGroup(schemas);
    const model = {};

    expect(modelUtils(model, schemas).assign(form).value).toEqual({});
  });

  it('with component wrapper', () => {
    const schemas: AnySchema[] = [{ kind: 'button-group', schemas: [] }];
    const form = createFormGroup(schemas);
    const model = {};

    expect(modelUtils(model, schemas).assign(form).value).toEqual({});
  });

  it('with group (empty)', () => {
    const schemas: AnySchema[] = [
      {
        kind: 'group',
        name: 'obj',
        schemas: []
      }
    ];
    const form = createFormGroup(schemas);
    const model = { obj: {} };

    expect(modelUtils(model, schemas).assign(form).value).toEqual({ obj: {} });
  });

  it('with group', () => {
    const schemas: AnySchema[] = [
      {
        kind: 'group',
        name: 'obj',
        schemas: [
          { kind: 'number', name: 'num' }
        ]
      }
    ];
    const form = createFormGroup(schemas);
    const model = { obj: { num: 1 } };

    expect(modelUtils(model, schemas).assign(form).value).toEqual({ obj: { num: 1 } });
  });

  it('with array (empty)', () => {
    const schemas: AnySchema[] = [
      {
        kind: 'array',
        name: 'arr',
        schemas: []
      }
    ];
    const form = createFormGroup(schemas);
    const model = { arr: [] };

    expect(modelUtils(model, schemas).assign(form).value).toEqual({ arr: [] });
  });

  it('with array', () => {
    const schemas: AnySchema[] = [
      {
        kind: 'array',
        name: 'arr',
        schemas: [
          { kind: 'number', name: 0 }
        ]
      }
    ];
    const form = createFormGroup(schemas);
    const model = { arr: [1] };

    expect(modelUtils(model, schemas).assign(form).value).toEqual({ arr: [1] });
  });

  it('with mix', () => {
    const schemas: AnySchema[] = [
      {
        kind: 'group',
        name: 'obj',
        schemas: [
          {
            kind: 'array',
            name: 'arr',
            schemas: [
              { kind: 'number', name: 0 }
            ]
          }
        ]
      },
      {
        kind: 'array',
        name: 'arr',
        schemas: [
          {
            kind: 'group',
            name: 0,
            schemas: [
              { kind: 'number', name: 'num' }
            ]
          },
        ]
      }
    ];
    const form = createFormGroup(schemas);
    const model = {
      obj: { arr: [1] },
      arr: [{ num: 1 }]
    };

    expect(modelUtils(model, schemas).assign(form).value).toEqual({
      obj: { arr: [1] },
      arr: [{ num: 1 }]
    });
  });
});