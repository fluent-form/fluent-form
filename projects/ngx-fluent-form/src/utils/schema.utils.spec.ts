import { TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { array, form, group, input, inputGroup, slider, textarea } from '../compose';
import { useTextWidget, withAllWidgets, withSchemaPatchers, withWidgets } from '../features';
import { provideFluentForm } from '../provider';
import { AlertComponentSchema, AnySchema, ButtonComponentSchema, HeadingComponentSchema, InputControlSchema, NumberInputControlSchema, TextComponentSchema } from '../schemas';
import { SchemaType } from '../schemas/interfaces';
import { SchemaUtil } from './schema.utils';

describe('SchemaUtil', () => {
  let schemaUtil: SchemaUtil;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withAllWidgets()
        )
      ]
    });

    schemaUtil = TestBed.inject(SchemaUtil);
  });

  describe('patchSchema', () => {
    describe('with internal patcher', () => {
      it('heading patcher', () => {
        const schema: HeadingComponentSchema = { kind: 'heading', level: 1, content: '' };
        expect(schemaUtil.patch(schema)).toEqual({ kind: 'heading', level: 1, content: '', col: 24 });
      });

      it('button patcher', () => {
        const schema: ButtonComponentSchema = { kind: 'button', variants: { block: true } };
        expect(schemaUtil.patch(schema)).toEqual({ kind: 'button', variants: { block: true }, col: 24 });
      });

      it('alert patcher', () => {
        const schema: AlertComponentSchema = { kind: 'alert', message: '' };
        expect(schemaUtil.patch(schema)).toEqual({ kind: 'alert', message: '', col: 24 });
      });
    });

    it('should throw error', () => {
      expect(() => schemaUtil.patch({ kind: 'undefinded' } as SafeAny)).toThrowError(`The 'undefinded' widget was not found`);
    });
  });

  it('isAnySchema', () => {
    expect(schemaUtil.isComponentContainer({ kind: 'tab' })).toBeTrue();
    expect(schemaUtil.isComponent({ kind: 'text' })).toBeTrue();
    expect(schemaUtil.isComponentWrapper({ kind: 'button-group' })).toBeTrue();
    expect(schemaUtil.isControlContainer({ kind: 'group' })).toBeTrue();
    expect(schemaUtil.isControlWrapper({ kind: 'input-group' })).toBeTrue();
    expect(schemaUtil.isControl({ kind: 'input' })).toBeTrue();
    expect(schemaUtil.isNonControl({ kind: 'button' })).toBeTrue();
  });

  it('filterControlSchemas', () => {
    expect(schemaUtil.filterControls([
      { kind: 'text', content: '' },
      { kind: 'button-group', schemas: [] },
      { kind: 'input' },
      { kind: 'group', schemas: [] },
      { kind: 'array', schemas: [] },
      {
        kind: 'input-group',
        schemas: [
          { kind: 'input' }
        ]
      },
      {
        kind: 'row',
        schemas: [
          { kind: 'input' }
        ]
      }
    ])).toEqual([
      { kind: 'input' },
      { kind: 'group', schemas: [] },
      { kind: 'array', schemas: [] },
      { kind: 'input' },
      { kind: 'input' },
    ]);
  });

  describe('带验证器的图示', () => {
    it('length', () => {
      const schema: AnySchema = { kind: 'input', length: 1 };
      const validators = schemaUtil.validatorsOf(schema);
      // min & max
      expect(validators.length).toBe(2);
    });

    it('min/max', () => {
      const schema = textarea('name').length({ min: 1, max: 2 }).build();
      const validators = schemaUtil.validatorsOf(schema);

      expect(validators.length).toBe(2);
    });

    it('required', () => {
      const schema = input('name').required(true).build();
      const validators = schemaUtil.validatorsOf(schema);

      expect(validators).toEqual([Validators.required]);
    });

    it('email', () => {
      const schema = input('name').type('email').required(true).build();
      const validators = schemaUtil.validatorsOf(schema);

      expect(validators.length).toBe(2);
      expect(validators).toContain(Validators.email);
      expect(validators).toContain(Validators.required);
    });
  });

  describe('应该能正确标准化图示', () => {
    it('普通图示', () => {
      const { schemas } = form(() => {
        input('name');
      });
      expect(schemas).toEqual([{ kind: 'input', key: 'name' }]);
    });

    describe('嵌套图示', () => {
      it('group', () => {
        const { schemas } = form(() => {
          group('name').schemas(() => {
            input('name');
          });
        });

        expect(schemas).toEqual([{
          kind: 'group',
          key: 'name',
          schemas: [
            { kind: 'input', key: 'name' }
          ]
        }]);
      });

      it('array', () => {
        const { schemas } = form(() => {
          array('name').schemas(() => {
            group(0).schemas(() => {
              input('name');
            });
          });
        });

        expect(schemas).toEqual([{
          kind: 'array',
          key: 'name',
          schemas: [{
            kind: 'group',
            key: 0,
            schemas: [
              { kind: 'input', key: 'name' }
            ]
          }]
        }]);
      });

      it('input-group', () => {
        const { schemas } = form(() => {
          inputGroup().schemas(() => {
            input('name');
          });
        });

        expect(schemas).toEqual([{
          kind: 'input-group',
          schemas: [
            { kind: 'input', key: 'name' }
          ]
        }]);
      });
    });
  });

  describe('应该能在图示列表中找到目标图示', () => {
    it('普通图示', () => {
      const schema = form(() => {
        input('name');
      });

      expect(schemaUtil.find(schema, 'name')).toEqual({ kind: 'input', key: 'name' });
    });

    it('二级图示', () => {
      const schema = form(() => {
        group('group').schemas(() => {
          input('name');
        });
      });

      expect(schemaUtil.find(schema, ['group', 'name'])).toEqual({ kind: 'input', key: 'name' });
      expect(schemaUtil.find(schema, 'group.name')).toEqual({ kind: 'input', key: 'name' });
    });

    it('多级图示', () => {
      const schema = form(() => {
        group('group').schemas(() => {
          group('group').schemas(() => {
            input('name');
          });
        });
      });

      expect(schemaUtil.find(schema, ['group', 'group', 'name'])).toEqual({ kind: 'input', key: 'name' });
      expect(schemaUtil.find(schema, 'group.group.name')).toEqual({ kind: 'input', key: 'name' });
    });

    it('多字段图示', () => {
      const schema = form(() => {
        slider(['begin', 'end']);
      });

      expect(schemaUtil.find(schema, [['begin', 'end']])).toEqual({ kind: 'slider', key: ['begin', 'end'] });
      expect(schemaUtil.find(schema, ['begin', 'end'].toString())).toEqual({ kind: 'slider', key: ['begin', 'end'] });
    });

    it('不存在的图示', () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const schema = form(() => { });

      expect(schemaUtil.find(schema, 'x')).toBe(null);
    });

    it('不存在的多图示', () => {
      const schema = form(() => {
        slider(['begin', 'end']);
      });

      expect(schemaUtil.find(schema, [['begin', 'e']])).toBe(null);
      expect(schemaUtil.find(schema, ['begin', 'e'].toString())).toBe(null);
    });
  });
});

describe('SchemaUtil with patcher feature', () => {
  let schemaUtil: SchemaUtil;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withAllWidgets(),
          withSchemaPatchers([
            {
              selector: '*',
              patch: schema => {
                schema.class = new Set<string>();
                return schema;
              }
            },
            {
              selector: 'input',
              patch: schema => {
                (schema.class as Set<string>).add('kind-selector');
                return schema;
              }
            },
            {
              selector: ['input', 'number'],
              patch: schema => {
                (schema.class as Set<string>).add('multi-kind-selector');
                return schema;
              }
            },
            {
              selector: SchemaType.Control,
              patch: schema => {
                (schema.class as Set<string>).add('schema-type-selector');
                return schema;
              }
            },
            {
              selector: [SchemaType.Control, SchemaType.Component],
              patch: schema => {
                (schema.class as Set<string>).add('multi-schema-type-selector');
                return schema;
              }
            },
            {
              selector: ['button', SchemaType.Control],
              patch: schema => {
                (schema.class as Set<string>).add('mix-selector');
                return schema;
              }
            }
          ])
        )
      ]
    });

    schemaUtil = TestBed.inject(SchemaUtil);
  });

  it('with * selector', () => {
    const schema: InputControlSchema = { kind: 'input' };
    expect(schemaUtil.patch(schema).class).toBeInstanceOf(Set);
  });

  it('with kind selector', () => {
    const inputSchema: InputControlSchema = { kind: 'input' };
    const otherSchema: NumberInputControlSchema = { kind: 'number' };
    expect(schemaUtil.patch(inputSchema).class).toContain('kind-selector');
    expect(schemaUtil.patch(otherSchema).class).not.toContain('kind-selector');
  });

  it('with multi-kind selector', () => {
    const inputSchema: InputControlSchema = { kind: 'input' };
    const numberSchema: NumberInputControlSchema = { kind: 'number' };
    expect(schemaUtil.patch(inputSchema).class).toContain('multi-kind-selector');
    expect(schemaUtil.patch(numberSchema).class).toContain('multi-kind-selector');
  });

  it('with schema-kind selector', () => {
    const inputSchema: InputControlSchema = { kind: 'input' };
    const buttonSchema: ButtonComponentSchema = { kind: 'button' };
    expect(schemaUtil.patch(inputSchema).class).toContain('schema-type-selector');
    expect(schemaUtil.patch(buttonSchema).class).not.toContain('schema-type-selector');
  });

  it('with multi-schema-type selector', () => {
    const inputSchema: InputControlSchema = { kind: 'input' };
    const buttonSchema: ButtonComponentSchema = { kind: 'button' };
    expect(schemaUtil.patch(inputSchema).class).toContain('multi-schema-type-selector');
    expect(schemaUtil.patch(buttonSchema).class).toContain('multi-schema-type-selector');
  });

  it('with mix selector', () => {
    const inputSchema: InputControlSchema = { kind: 'input' };
    const buttonSchema: ButtonComponentSchema = { kind: 'button' };
    expect(schemaUtil.patch(inputSchema).class).toContain('mix-selector');
    expect(schemaUtil.patch(buttonSchema).class).toContain('mix-selector');
  });

  it('with multi patchers', () => {
    const schema: InputControlSchema = { kind: 'input' };
    expect(schemaUtil.patch(schema).class).toContain('kind-selector');
    expect(schemaUtil.patch(schema).class).toContain('multi-kind-selector');
    expect(schemaUtil.patch(schema).class).toContain('schema-type-selector');
    expect(schemaUtil.patch(schema).class).toContain('multi-schema-type-selector');
    expect(schemaUtil.patch(schema).class).toContain('mix-selector');
  });
});

describe('SchemaUtil with no patcher feature', () => {
  let schemaUtil: SchemaUtil;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withWidgets([
            useTextWidget()
          ])
        )
      ]
    });

    schemaUtil = TestBed.inject(SchemaUtil);
  });

  it('no patcher', () => {
    const schema: TextComponentSchema = { kind: 'text', content: '' };
    expect(schemaUtil.patch(schema)).toEqual({ kind: 'text', content: '' });
  });
});
