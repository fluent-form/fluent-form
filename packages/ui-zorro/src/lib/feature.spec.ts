import { TestBed } from '@angular/core/testing';
import { SchemaUtil, provideFluentForm } from '@fluent-form/core';
import { withZorro } from './feature';
import { FormGroupSchema } from './schemas';
import { useAllWidgets } from './widgets';

describe('useWidget', () => {
  let schemaUtil: SchemaUtil;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withZorro(useAllWidgets())
        )
      ]
    });

    schemaUtil = TestBed.inject(SchemaUtil);
  });

  describe('built-in patcher', () => {
    it('group patcher', () => {
      const schema: FormGroupSchema = { kind: 'group', schemas: [] };
      expect(schemaUtil.patch(schema)).toEqual({
        kind: 'group',
        layout: 'vertical',
        gap: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
        schemas: []
      });
    });
  });
});
