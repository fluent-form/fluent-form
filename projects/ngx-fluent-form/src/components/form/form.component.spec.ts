import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { form, input } from '../../builders';
import { FluentFormModule } from '../../fluent-form.module';
import { FormGroupSchema } from '../../schemas';
import { AnySchema } from '../../schemas/index.schema';
import { AnyObject } from '../../types';
import { FluentFormComponent } from './form.component';

@Component({
  template: `<fluent-form [schemas]="schemas" [(model)]="model"></fluent-form>`,
})
class TestWarpperComponent<T extends AnyObject> {
  @ViewChild(FluentFormComponent) target!: FluentFormComponent<T>;
  schemas!: AnySchema[] | FormGroupSchema;
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
  });

  it('应该能创建组件', () => {
    expect(component).toBeTruthy();
  });

  it('能够配置顶层表单', () => {
    component.schemas = form(it => it.updateOn('blur').schemas(
      input('text')
    ));
    component.model = {};
    fixture.detectChanges();

    expect(component.model).toEqual({ text: null });
  });

  it('模型应该能正确赋值表单', () => {
    component.schemas = form(
      input('text')
    );
    component.model = { text: 'test' };
    fixture.detectChanges();

    expect(component.target['form'].value).toEqual(component.model);
  });

  it('表单应该能正确赋值模型', () => {
    component.schemas = form(
      input('text').col(1).defaultValue('test')
    );
    component.model = {};
    fixture.detectChanges();

    expect(component.model).toEqual({ text: 'test' });
  });

  it('应该能正确处理控件的 disabled 选项', () => {
    component.schemas = form(
      input('a').disabled('true'),
      input('b').disabled(() => true),
      input('c').disabled(true)
    );
    component.model = {};
    fixture.detectChanges();

    expect(component.target['form'].get('a')!.disabled).toEqual(true);
    expect(component.target['form'].get('b')!.disabled).toEqual(true);
    expect(component.target['form'].get('c')!.disabled).toEqual(true);
  });
});
