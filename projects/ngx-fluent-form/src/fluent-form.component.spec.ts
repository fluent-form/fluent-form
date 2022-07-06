import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { array, form, group, input, inputGroup, range, slider } from './fluent-form.builder';
import { FluentFormComponent } from './fluent-form.component';
import { FluentFormModule } from './fluent-form.module';
import { AnySchema } from './schemas/index.schema';

@Component({
  template: `<fluent-form [schemas]="schemas" [model]="model"></fluent-form>`,
})
class TestWarpperComponent<T extends Record<string, unknown>> {
  @ViewChild(FluentFormComponent) target!: FluentFormComponent<T>;
  schemas!: AnySchema[];
  model: T = {} as T;
}

describe('FluentFormComponent', () => {
  let component: TestWarpperComponent<{}>;
  let fixture: ComponentFixture<TestWarpperComponent<{}>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestWarpperComponent],
      imports: [FluentFormModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWarpperComponent);
    component = fixture.componentInstance;
    component.schemas = form();
    fixture.detectChanges();
  });

  it('应该能创建组件', () => {
    expect(component).toBeTruthy();
  });

  it('模型的值应该与图示匹配', () => {
    component.schemas = form(input('text'));
    fixture.detectChanges();

    expect(component.model).toEqual({ text: null });
  });

  it('模型的值应该与图示匹配（input-group）', () => {
    component.schemas = form(
      inputGroup().schemas(
        input('text1'),
        input('text2'),
      )
    );
    fixture.detectChanges();

    expect(component.model).toEqual({ text1: null, text2: null });
  });

  it('模型的值应该与图示匹配（多级模型）', () => {
    component.schemas = form(
      group('group').schemas(
        input('text')
      )
    );
    fixture.detectChanges();

    expect(component.model).toEqual({ group: { text: null } });
  });

  it('模型的值应该与图示匹配（数组）', () => {
    component.schemas = form(
      array('array').schemas(
        input(0)
      )
    );
    fixture.detectChanges();

    expect(component.model).toEqual({ array: [null] });
  });

  it('模型的值应该与图示匹配（多维数组）', () => {
    component.schemas = form(
      array('array').schemas(
        array(0).schemas(
          input(0)
        )
      )
    );
    fixture.detectChanges();

    expect(component.model).toEqual({ array: [[null]] });
  });

  it('模型的值应该与图示匹配（双字段模式）', () => {
    component.schemas = form(
      range(['start', 'end']).span(1)
    );
    fixture.detectChanges();

    expect(component.model).toEqual({ start: null, end: null });
  });

  it('模型应该能正确赋值表单', () => {
    component.schemas = form(
      input('text').span(1)
    );
    component.model = { text: 'test' };
    fixture.detectChanges();

    expect(component.target.form.getRawValue()).toEqual({ text: 'test' });
  });

  it('模型应该能正确赋值表单（多级模型）', () => {
    component.schemas = form(
      group('group').schemas(
        input('text')
      )
    );
    component.model = { group: { text: 'test' } };
    fixture.detectChanges();

    expect(component.target.form.getRawValue()).toEqual({ group: { text: 'test' } });
  });

  it('模型应该能正确赋值表单（数组）', () => {
    component.schemas = form(
      array('array').schemas(
        input(0)
      )
    );
    component.model = { array: ['test'] };
    fixture.detectChanges();

    expect(component.target.form.getRawValue()).toEqual({ array: ['test'] });
  });

  it('模型应该能正确赋值表单（多级数组）', () => {
    component.schemas = form(
      array('array').schemas(
        array(0).schemas(
          input(0)
        )
      )
    );
    component.model = { array: [['test']] };
    fixture.detectChanges();

    expect(component.target.form.getRawValue()).toEqual({ array: [['test']] });
  });

  it('模型应该能正确赋值表单（双字段模式）', () => {
    const fields = ['start', 'end'] as const;
    component.schemas = form(
      slider(fields).range(true)
    );
    component.model = { start: 0, end: 1 };
    fixture.detectChanges();

    expect(component.target.form.getRawValue()).toEqual({ [fields.toString()]: [0, 1] });
  });

  it('应该能正确应用映射器', () => {
    const initialValue = 'hello', newValue = 'world';

    component.schemas = form(
      input('text').mapper({
        input: (o: string[]) => o.join(''),
        output: (o: string) => o.split('')
      })
    );
    component.model = { text: initialValue.split('') };
    fixture.detectChanges();

    expect(component.target.form.getRawValue()).toEqual({ text: initialValue });

    component.target.form.controls['text'].setValue(newValue);
    fixture.detectChanges();

    expect(component.model).toEqual({ text: newValue.split('') });
  });
});
