import { TestBed } from '@angular/core/testing';
import { provideFluentForm } from '../provider';
import { SchemaKind, SchemaType } from '../schemas/interfaces';
import { withTesting } from '../testing';
import { FluentSchemaTypePipe } from './schema-type.pipe';

describe('FluentSchemaTypePipe', () => {
  let pipe: FluentSchemaTypePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withTesting()
        )
      ]
    });

    pipe = TestBed.runInInjectionContext(() => new FluentSchemaTypePipe());
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform the control schema type', () => {
    expect(pipe.transform(SchemaKind.Headful)).toBe(SchemaType.Control);
    expect(pipe.transform(SchemaKind.Headless)).toBe(SchemaType.Control);
    expect(pipe.transform('text')).toBe(SchemaType.Control);
    expect(pipe.transform('range')).toBe(SchemaType.Control);
  });

  it('should transform the control container schema type', () => {
    expect(pipe.transform('group')).toBe(SchemaType.ControlGroup);
    expect(pipe.transform('array')).toBe(SchemaType.ControlArray);
  });

  it('should transform the control wrapper schema type', () => {
    expect(pipe.transform('input-group')).toBe(SchemaType.ControlWrapper);
  });

  it('should transform the component schema type', () => {
    expect(pipe.transform(SchemaKind.Template)).toBe(SchemaType.Component);
    expect(pipe.transform('button')).toBe(SchemaType.Component);
  });

  it('should transform the component container schema type', () => {
    expect(pipe.transform(SchemaKind.Row)).toBe(SchemaType.ComponentContainer);
  });

  it('should transform the component wrapper schema type', () => {
    expect(pipe.transform('button-group')).toBe(SchemaType.ComponentWrapper);
  });
});
