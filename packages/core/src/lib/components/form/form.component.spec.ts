import { Component, Signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AnyObject, SafeAny } from '@ngify/types';
import { form } from '../../compose';
import { provideFluentForm } from '../../provider';
import { AbstractFormGroupSchema } from '../../schemas';
import { textField, withTesting } from '../../testing';
import { FluentFormComponent } from './form.component';

@Component({
  standalone: true,
  imports: [FluentFormComponent],
  template: `<fluent-form [schema]="schema()" [(model)]="model" (formChange)="form = $event" />`,
})
class TestComponent<T extends AnyObject> {
  form!: FormGroup;
  schema!: Signal<AbstractFormGroupSchema>;
  model: T = {} as T;
}

describe('FluentFormComponent', () => {
  let component: TestComponent<{}>;
  let fixture: ComponentFixture<TestComponent<{}>>;

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
    it('先设置 schema，后设置 model', () => {
      component.schema = form(() => textField('text'));
      component.model = { text: 'test' };
      fixture.detectChanges();

      expect(component.form.value).toEqual({ text: 'test' });
    });

    it('先设置 model，后设置 schema', () => {
      component.model = { text: 'test' };
      component.schema = form(() => textField('text'));
      fixture.detectChanges();

      expect(component.form.value).toEqual({ text: 'test' });
    });

    it('多次设置 model', () => {
      component.schema = form(() => textField('text'));
      component.model = { text: 'test' };
      fixture.detectChanges();

      expect(component.form.value).toEqual({ text: 'test' });

      component.model = { text: 'test change' };
      fixture.detectChanges();

      expect(component.form.value).toEqual({ text: 'test change' });
    });
  });

  describe('表单应该能正确赋值模型', () => {
    it('先设置 schema，后设置 model', () => {
      component.schema = form(() => {
        textField('text').col(1).defaultValue('test');
      });
      component.model = {};
      fixture.detectChanges();

      expect(component.model).toEqual({ text: 'test' });
    });

    it('先设置 model，后设置 schema', () => {
      component.model = {};
      component.schema = form(() => {
        textField('text').col(1).defaultValue('test');
      });
      fixture.detectChanges();

      expect(component.model).toEqual({ text: 'test' });
    });

    it('多次设置 schema', () => {
      component.model = {};
      component.schema = form(() => {
        textField('text').col(1).defaultValue('test');
      });
      fixture.detectChanges();

      expect(component.model).toEqual({ text: 'test' });

      component.schema = form(() => {
        textField('text').col(1).defaultValue('test change');
      });
      fixture.detectChanges();

      expect(component.model).toEqual({ text: 'test' });
    });
  });

  it('应该能正确处理控件的 disabled 选项', () => {
    component.schema = form(() => {
      textField('a').disabled('{{true}}' as SafeAny);
      textField('b').disabled(() => true);
      textField('c').disabled(true);
    });
    component.model = {};
    fixture.detectChanges();

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
