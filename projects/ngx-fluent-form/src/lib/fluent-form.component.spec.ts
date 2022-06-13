import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { FluentFormComponent } from './fluent-form.component';
import { array, group, range, slider, text } from './fluent-form.control';
import { form } from './models/fluent-form.model';
import { assignFormToModel } from './utils/form.utils';

describe('FluentFormComponent', () => {
  let component: FluentFormComponent<{}>;
  let fixture: ComponentFixture<FluentFormComponent<{}>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FluentFormComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        NzSpinModule,
        NzButtonModule,
        NzInputModule,
        NzInputNumberModule,
        NzCascaderModule,
        NzDatePickerModule,
        NzFormModule,
        NzCheckboxModule,
        NzSwitchModule,
        NzDividerModule,
        NzSelectModule,
        NzTimePickerModule,
        NzSliderModule,
        NzRadioModule,
        NzRateModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FluentFormComponent);
    component = fixture.componentInstance;
    component.fluent = form();
    fixture.detectChanges();
  });

  it('应该能创建组件', () => {
    expect(component).toBeTruthy();
  });

  it('模型的值应该与图示匹配', () => {
    component.fluent = form(
      text('text')
    );

    assignFormToModel(component.form, component.model ??= {}, component.fluent.schemas);

    expect(component.model).toEqual({ text: null });
  });

  it('模型的值应该与图示匹配（多级模型）', () => {
    component.fluent = form(
      group('group').schemas([
        text('text')
      ])
    );

    assignFormToModel(component.form, component.model ??= {}, component.fluent.schemas);

    expect(component.model).toEqual({ group: { text: null } });
  });

  it('模型的值应该与图示匹配（数组）', () => {
    component.fluent = form(
      array('array').schemas([
        text(0)
      ])
    );

    assignFormToModel(component.form, component.model ??= {}, component.fluent.schemas);

    expect(component.model).toEqual({ array: [null] });
  });

  it('模型的值应该与图示匹配（多维数组）', () => {
    component.fluent = form(
      array('array').schemas([
        array(0).schemas([
          text(0)
        ])
      ])
    );

    assignFormToModel(component.form, component.model ??= {}, component.fluent.schemas);

    expect(component.model).toEqual({ array: [[null]] });
  });

  it('模型的值应该与图示匹配（双字段模式）', () => {
    component.fluent = form(
      range(['start', 'end']).span(1)
    );

    assignFormToModel(component.form, component.model ??= {}, component.fluent.schemas);

    expect(component.model).toEqual({ start: null, end: null });
  });

  it('模型应该能正确赋值表单', () => {
    component.fluent = form(
      text('text').span(1)
    );
    component.model = { text: 'test' };

    expect(component.form.getRawValue()).toEqual({ text: 'test' });
  });

  it('模型应该能正确赋值表单（多级模型）', () => {
    component.fluent = form(
      group('group').schemas([
        text('text')
      ])
    );
    component.model = { group: { text: 'test' } };

    expect(component.form.getRawValue()).toEqual({ group: { text: 'test' } });
  });

  it('模型应该能正确赋值表单（数组）', () => {
    component.fluent = form(
      array('array').schemas([
        text(0)
      ])
    );
    component.model = { array: ['test'] };

    expect(component.form.getRawValue()).toEqual({ array: ['test'] });
  });

  it('模型应该能正确赋值表单（多级数组）', () => {
    component.fluent = form(
      array('array').schemas([
        array(0).schemas([
          text(0)
        ])
      ])
    );
    component.model = { array: [['test']] };

    expect(component.form.getRawValue()).toEqual({ array: [['test']] });
  });

  it('模型应该能正确赋值表单（双字段模式）', () => {
    const fields = ['start', 'end'] as const;
    component.fluent = form(
      slider(fields)
    );
    component.model = { start: 0, end: 1 };

    expect(component.form.getRawValue()).toEqual({ [fields.toString()]: [0, 1] });
  });

  it('应该能正确应用映射器', () => {
    const initialValue = 'hello', newValue = 'world';

    component.fluent = form(
      text('text').mapper({
        input: (o: string[]) => o.join(''),
        output: (o: string) => o.split('')
      })
    );
    component.model = { text: initialValue.split('') };

    expect(component.form.getRawValue()).toEqual({ text: initialValue });

    component.form.controls['text'].setValue(newValue);

    assignFormToModel(component.form, component.model, component.fluent.schemas);

    expect(component.model).toEqual({ text: newValue.split('') });
  });
});
