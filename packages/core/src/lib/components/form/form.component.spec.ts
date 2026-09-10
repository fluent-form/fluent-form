import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SafeAny } from '@ngify/core';
import { form } from '../../compose';
import { provideFluentForm } from '../../provider';
import { AbstractFormGroupSchema } from '../../schemas';
import { textField, withTesting } from '../../testing';
import { FluentFormComponent } from './form.component';

@Component({
  imports: [FluentFormComponent],
  template: `<fluent-form [schema]="schema()" [(model)]="model" (formChange)="form = $event" />`
})
class TestComponent {
  form!: FormGroup;
  readonly schema = signal<AbstractFormGroupSchema>(form([]));
  readonly model = signal<SafeAny>({});
}

describe('FluentFormComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFluentForm(
          withTesting()
        )
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('应该能创建组件', () => {
    expect(component).toBeTruthy();
  });

  describe('模型应该能正确赋值表单', () => {
    it('先设置 schema，后设置 model', async () => {
      component.schema.set(form(() => textField('text'))());
      component.model.set({ text: 'test' });
      await fixture.whenStable();

      expect(component.form.value).toEqual({ text: 'test' });
    });

    it('先设置 model，后设置 schema', async () => {
      component.model.set({ text: 'test' });
      component.schema.set(form(() => textField('text'))());
      await fixture.whenStable();

      expect(component.form.value).toEqual({ text: 'test' });
    });

    it('多次设置 model', async () => {
      component.schema.set(form(() => textField('text'))());
      component.model.set({ text: 'test' });
      await fixture.whenStable();

      expect(component.form.value).toEqual({ text: 'test' });

      component.model.set({ text: 'test change' });
      await fixture.whenStable();

      expect(component.form.value).toEqual({ text: 'test change' });
    });
  });

  describe('表单应该能正确赋值模型', () => {
    it('先设置 schema，后设置 model', async () => {
      component.schema.set(form(() => {
        textField('text').col(1).defaultValue('test');
      })());
      component.model.set({});
      await fixture.whenStable();

      expect(component.model()).toEqual({ text: 'test' });
    });

    it('先设置 model，后设置 schema', async () => {
      component.model.set({});
      component.schema.set(form(() => {
        textField('text').col(1).defaultValue('test');
      })());
      await fixture.whenStable();

      expect(component.model()).toEqual({ text: 'test' });
    });

    it('多次设置 schema', async () => {
      component.model.set({});
      component.schema.set(form(() => {
        textField('text').col(1).defaultValue('test');
      })());
      await fixture.whenStable();

      expect(component.model()).toEqual({ text: 'test' });

      component.schema.set(form(() => {
        textField('text').col(1).defaultValue('test change');
      })());
      await fixture.whenStable();

      expect(component.model()).toEqual({ text: 'test' });
    });
  });

  it('应该能正确处理控件的 disabled 选项', async () => {
    component.schema.set(form(() => {
      textField('a').disabled('{{true}}' as SafeAny);
      textField('b').disabled(() => true);
      textField('c').disabled(true);
    })());
    component.model.set({});
    await fixture.whenStable();

    expect(component.form.get('a')!.disabled).toEqual(true);
    expect(component.form.get('b')!.disabled).toEqual(true);
    expect(component.form.get('c')!.disabled).toEqual(true);
  });

  it('should be callable onSubmit', () => {
    const { componentInstance } = fixture.debugElement.query(By.directive(FluentFormComponent));
    const result = componentInstance.onSubmit(new Event('submit') as SubmitEvent);
    expect(result).toBe(false);
  });
});
