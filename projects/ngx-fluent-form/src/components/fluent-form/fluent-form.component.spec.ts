import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { array, button, form, group, input, inputGroup } from '../../builders';
import { FluentFormModule } from '../../fluent-form.module';
import { AnySchema } from '../../schemas/index.schema';
import { Obj } from '../../types';
import { FluentFormComponent } from './fluent-form.component';

@Component({
  template: `<fluent-form [schemas]="schemas" [(model)]="model"></fluent-form>`,
})
class TestWarpperComponent<T extends Obj> {
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

  it('模型应该能正确赋值表单', () => {
    component.schemas = form(
      input('text').span(1)
    );
    component.model = { text: 'test' };
    fixture.detectChanges();

    expect(component.target.form.getRawValue()).toEqual(component.model);
  });

  it('表单应该能正确赋值模型', () => {
    component.schemas = form(
      input('text').span(1).value('test')
    );
    component.model = {};
    fixture.detectChanges();

    expect(component.model).toEqual({ text: 'test' });
  });

  it('应该能正确处理控件的 disabled 选项', () => {
    component.schemas = form(
      inputGroup().schemas(
        input('text').disabled(() => true)
      ),
      group('group').schemas(
        input('text').disabled(() => false)
      ),
      array('array').schemas(
        input().disabled(true)
      ),
      button().content('btn')
    );
    component.model = { text: 'test' };
    fixture.detectChanges();

    expect(component.target.form.get('text')?.disabled).toEqual(true);
    expect(component.target.form.get('group.text')?.disabled).toEqual(false);
    expect(component.target.form.get(['array', 0])?.disabled).toEqual(true);
  });
});
