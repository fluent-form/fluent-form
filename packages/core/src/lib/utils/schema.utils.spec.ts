import { TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';
import { SafeAny } from '@ngify/types';
import { form } from '../compose';
import { withSchemaPatchers } from '../features';
import { SCHEMA_PATCHERS } from '../patcher';
import { provideFluentForm } from '../provider';
import { AbstractSchema } from '../schemas';
import { SchemaType } from '../schemas/interfaces';
import { array, group, inputGroup, range, text, withTesting } from '../testing';
import { SchemaUtil } from './schema.utils';

describe('SchemaUtil', () => {
  let schemaUtil: SchemaUtil;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withTesting()
        )
      ]
    });

    schemaUtil = TestBed.inject(SchemaUtil);
  });

  describe('patchSchema', () => {
    it('should throw error', () => {
      expect(() => schemaUtil.patch({ kind: 'undefinded' } as SafeAny)).toThrow(`The 'undefinded' widget was not found`);
    });
  });

  it('isPathKeyControl', () => {
    expect(schemaUtil.isPathKeySchema({ kind: 'text', key: 'name' })).toBe(false);
    expect(schemaUtil.isPathKeySchema({ kind: 'text', key: 'name.first' })).toBe(true);
  });

  it('parsePathKey', () => {
    expect(schemaUtil.parsePathKey('name.first')).toEqual(['name', 'first']);
  });

  it('isAnySchema', () => {
    expect(schemaUtil.isComponentContainer({ kind: 'row' })).toBe(true);
    expect(schemaUtil.isComponent({ kind: 'button' })).toBe(true);
    expect(schemaUtil.isComponentWrapper({ kind: 'button-group' })).toBe(true);
    expect(schemaUtil.isControlGroup({ kind: 'group' })).toBe(true);
    expect(schemaUtil.isControlArray({ kind: 'array' })).toBe(true);
    expect(schemaUtil.isControlContainer({ kind: 'group' })).toBe(true);
    expect(schemaUtil.isControlContainer({ kind: 'array' })).toBe(true);
    expect(schemaUtil.isControlWrapper({ kind: 'input-group' })).toBe(true);
    expect(schemaUtil.isControl({ kind: 'text' })).toBe(true);
    expect(schemaUtil.isNonControl({ kind: 'button' })).toBe(true);
    expect(schemaUtil.isNonControl({ kind: 'button-group' })).toBe(true);
  });

  it('filterControlSchemas', () => {
    expect(schemaUtil.filterControls([
      { kind: 'button-group', schemas: [] },
      { kind: 'text' },
      { kind: 'group', schemas: [] },
      { kind: 'array', schemas: [] },
      {
        kind: 'input-group',
        schemas: [
          { kind: 'text' }
        ]
      },
      {
        kind: 'row',
        schemas: [
          { kind: 'text' }
        ]
      }
    ])).toEqual([
      { kind: 'text' },
      { kind: 'group', schemas: [] },
      { kind: 'array', schemas: [] },
      { kind: 'text' },
      { kind: 'text' },
    ]);
  });

  describe('带验证器的图示', () => {
    it('required', () => {
      const schema = text('name').required(true).build();
      const validators = schemaUtil.validatorsOf(schema);

      expect(validators).toEqual([Validators.required]);
    });

    it('email', () => {
      const schema = text('name').type('email').required(true).build();
      const validators = schemaUtil.validatorsOf(schema);

      expect(validators.length).toBe(2);
      expect(validators).toContain(Validators.email);
      expect(validators).toContain(Validators.required);
    });
  });

  describe('应该能正确标准化图示', () => {
    it('普通图示', () => {
      const { schemas } = form(() => {
        text('name');
      });
      expect(schemas).toEqual([{ kind: 'text', key: 'name' }]);
    });

    describe('嵌套图示', () => {
      it('group', () => {
        const { schemas } = form(() => {
          group('name').schemas(() => {
            text('name');
          });
        });

        expect(schemas).toEqual([{
          kind: 'group',
          key: 'name',
          schemas: [
            { kind: 'text', key: 'name' }
          ]
        }]);
      });

      it('array', () => {
        const { schemas } = form(() => {
          array('name').schemas(() => {
            group(0).schemas(() => {
              text('name');
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
              { kind: 'text', key: 'name' }
            ]
          }]
        }]);
      });

      it('input-group', () => {
        const { schemas } = form(() => {
          inputGroup().schemas(() => {
            text('name');
          });
        });

        expect(schemas).toEqual([{
          kind: 'input-group',
          schemas: [
            { kind: 'text', key: 'name' }
          ]
        }]);
      });
    });
  });

  describe('应该能在图示列表中找到目标图示', () => {
    it('普通图示', () => {
      const schema = form(() => {
        text('name');
      });

      expect(schemaUtil.find(schema, 'name')).toEqual({ kind: 'text', key: 'name' });
    });

    it('二级图示', () => {
      const schema = form(() => {
        group('group').schemas(() => {
          text('name');
        });
      });

      expect(schemaUtil.find(schema, ['group', 'name'])).toEqual({ kind: 'text', key: 'name' });
      expect(schemaUtil.find(schema, 'group.name')).toEqual({ kind: 'text', key: 'name' });
    });

    it('多级图示', () => {
      const schema = form(() => {
        group('group').schemas(() => {
          group('group').schemas(() => {
            text('name');
          });
        });
      });

      expect(schemaUtil.find(schema, ['group', 'group', 'name'])).toEqual({ kind: 'text', key: 'name' });
      expect(schemaUtil.find(schema, 'group.group.name')).toEqual({ kind: 'text', key: 'name' });
    });

    it('多字段图示', () => {
      const schema = form(() => {
        range(['begin', 'end']);
      });

      expect(schemaUtil.find(schema, [['begin', 'end']])).toEqual({ kind: 'range', key: ['begin', 'end'] });
      expect(schemaUtil.find(schema, ['begin', 'end'].toString())).toEqual({ kind: 'range', key: ['begin', 'end'] });
    });

    it('不存在的图示', () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const schema = form(() => { });

      expect(schemaUtil.find(schema, 'x')).toBe(null);
    });

    it('不存在的多图示', () => {
      const schema = form(() => {
        range(['begin', 'end']);
      });

      expect(schemaUtil.find(schema, null!)).toBe(null);
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
          withTesting(),
          withSchemaPatchers([
            {
              selector: '*',
              patch: schema => {
                schema.class = [];
                return schema;
              }
            },
            {
              selector: 'text',
              patch: schema => {
                (schema.class as string[]).push('kind-selector');
                return schema;
              }
            },
            {
              selector: ['text', 'range'],
              patch: schema => {
                (schema.class as string[]).push('multi-kind-selector');
                return schema;
              }
            },
            {
              selector: SchemaType.Control,
              patch: schema => {
                (schema.class as string[]).push('schema-type-selector');
                return schema;
              }
            },
            {
              selector: [SchemaType.Control, SchemaType.Component],
              patch: schema => {
                (schema.class as string[]).push('multi-schema-type-selector');
                return schema;
              }
            },
            {
              selector: ['button', SchemaType.Control],
              patch: schema => {
                (schema.class as string[]).push('mix-selector');
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
    const schema: AbstractSchema = { kind: 'text' };
    expect(schemaUtil.patch(schema).class).toBeInstanceOf(Array);
  });

  it('with kind selector', () => {
    const inputSchema: AbstractSchema = { kind: 'text' };
    const otherSchema: AbstractSchema = { kind: 'range' };
    expect(schemaUtil.patch(inputSchema).class).toContain('kind-selector');
    expect(schemaUtil.patch(otherSchema).class).not.toContain('kind-selector');
  });

  it('with multi-kind selector', () => {
    const inputSchema: AbstractSchema = { kind: 'text' };
    const rangeSchema: AbstractSchema = { kind: 'range' };
    expect(schemaUtil.patch(inputSchema).class).toContain('multi-kind-selector');
    expect(schemaUtil.patch(rangeSchema).class).toContain('multi-kind-selector');
  });

  it('with schema-kind selector', () => {
    const inputSchema: AbstractSchema = { kind: 'text' };
    const buttonSchema: AbstractSchema = { kind: 'button' };
    expect(schemaUtil.patch(inputSchema).class).toContain('schema-type-selector');
    expect(schemaUtil.patch(buttonSchema).class).not.toContain('schema-type-selector');
  });

  it('with multi-schema-type selector', () => {
    const inputSchema: AbstractSchema = { kind: 'text' };
    const buttonSchema: AbstractSchema = { kind: 'button' };
    expect(schemaUtil.patch(inputSchema).class).toContain('multi-schema-type-selector');
    expect(schemaUtil.patch(buttonSchema).class).toContain('multi-schema-type-selector');
  });

  it('with mix selector', () => {
    const inputSchema: AbstractSchema = { kind: 'text' };
    const buttonSchema: AbstractSchema = { kind: 'button' };
    expect(schemaUtil.patch(inputSchema).class).toContain('mix-selector');
    expect(schemaUtil.patch(buttonSchema).class).toContain('mix-selector');
  });

  it('with multi patchers', () => {
    const schema: AbstractSchema = { kind: 'text' };
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
          withTesting()
        )
      ]
    });
    TestBed.overrideProvider(SCHEMA_PATCHERS, { useFactory: () => null });
    schemaUtil = TestBed.inject(SchemaUtil);
  });

  it('no patcher', () => {
    const schema = { kind: 'button', content: '' };
    expect(schemaUtil.patch(schema)).toEqual({ kind: 'button', content: '' });
  });
});
