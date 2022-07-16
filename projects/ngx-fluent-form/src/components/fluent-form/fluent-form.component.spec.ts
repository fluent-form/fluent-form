import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { form, input } from '../../builders';
import { FluentFormModule } from '../../fluent-form.module';
import { AnySchema } from '../../schemas/index.schema';
import { FluentFormComponent } from './fluent-form.component';

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
});
