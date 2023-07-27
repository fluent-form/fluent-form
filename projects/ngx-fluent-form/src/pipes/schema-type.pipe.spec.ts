import { TestBed } from '@angular/core/testing';
import { withAllWidgets } from '../features';
import { provideFluentForm } from '../provider';
import { SchemaKind, SchemaType } from '../schemas/interfaces';
import { FluentSchemaTypePipe } from './schema-type.pipe';

describe('FluentSchemaTypePipe', () => {
  let pipe: FluentSchemaTypePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withAllWidgets()
        )
      ]
    });

    pipe = TestBed.runInInjectionContext(() => new FluentSchemaTypePipe());
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform the control schema type', () => {
    expect(pipe.transform(SchemaKind.Headless)).toBe(SchemaType.Control);
    expect(pipe.transform(SchemaKind.Input)).toBe(SchemaType.Control);
    expect(pipe.transform(SchemaKind.Textarea)).toBe(SchemaType.Control);
    expect(pipe.transform(SchemaKind.Number)).toBe(SchemaType.Control);
    expect(pipe.transform(SchemaKind.Date)).toBe(SchemaType.Control);
    expect(pipe.transform(SchemaKind.DateRange)).toBe(SchemaType.Control);
    expect(pipe.transform(SchemaKind.Time)).toBe(SchemaType.Control);
    expect(pipe.transform(SchemaKind.Toggle)).toBe(SchemaType.Control);
    expect(pipe.transform(SchemaKind.Select)).toBe(SchemaType.Control);
    expect(pipe.transform(SchemaKind.Cascader)).toBe(SchemaType.Control);
    expect(pipe.transform(SchemaKind.Slider)).toBe(SchemaType.Control);
    expect(pipe.transform(SchemaKind.RadioGroup)).toBe(SchemaType.Control);
    expect(pipe.transform(SchemaKind.Checkbox)).toBe(SchemaType.Control);
    expect(pipe.transform(SchemaKind.CheckboxGroup)).toBe(SchemaType.Control);
    expect(pipe.transform(SchemaKind.Rate)).toBe(SchemaType.Control);
    expect(pipe.transform(SchemaKind.TreeSelect)).toBe(SchemaType.Control);
  });

  it('should transform the control container schema type', () => {
    expect(pipe.transform(SchemaKind.Group)).toBe(SchemaType.ControlContainer);
    expect(pipe.transform(SchemaKind.Array)).toBe(SchemaType.ControlContainer);
  });

  it('should transform the control wrapper schema type', () => {
    expect(pipe.transform(SchemaKind.InputGroup)).toBe(SchemaType.ControlWrapper);
  });

  it('should transform the component schema type', () => {
    expect(pipe.transform(SchemaKind.Template)).toBe(SchemaType.Component);
    expect(pipe.transform(SchemaKind.Text)).toBe(SchemaType.Component);
    expect(pipe.transform(SchemaKind.Button)).toBe(SchemaType.Component);
  });

  it('should transform the component container schema type', () => {
    expect(pipe.transform(SchemaKind.Steps)).toBe(SchemaType.ComponentContainer);
    expect(pipe.transform(SchemaKind.Step)).toBe(SchemaType.ComponentContainer);
    expect(pipe.transform(SchemaKind.Tabs)).toBe(SchemaType.ComponentContainer);
    expect(pipe.transform(SchemaKind.Tab)).toBe(SchemaType.ComponentContainer);
    expect(pipe.transform(SchemaKind.Row)).toBe(SchemaType.ComponentContainer);
  });

  it('should transform the component wrapper schema type', () => {
    expect(pipe.transform(SchemaKind.ButtonGroup)).toBe(SchemaType.ComponentWrapper);
  });
});
