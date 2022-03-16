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
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { FluentFormComponent } from './fluent-form.component';
import { embed, form, range, text } from './fluent-form.control';
import { AnyControlOptions } from './fluent-form.interface';

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
        NzRadioModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FluentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be an empty array', () => {
    const schema = form();
    expect(schema).toEqual([]);
  });

  it('results of the three configurations should be the same', () => {
    const schema: AnyControlOptions[] = [{ type: 'text', name: 'text', span: 1 }];
    const schema1: AnyControlOptions[] = [text('text').span(1).build()];
    const schema2: AnyControlOptions[] = form(text('text').span(1));

    expect(schema).toEqual(schema1);
    expect(schema).toEqual(schema2);
  });

  it('form value should match the configuration (basic)', () => {
    component.schema = form(
      text('text').span(1)
    );

    expect(component.form.getRawValue()).toEqual({ text: null });
  });

  it('form value should match the configuration (nested forms)', () => {
    component.schema = form(
      embed('embed').span(1).schema(form(
        text('text').span(1)
      ))
    );

    expect(component.form.getRawValue()).toEqual({ embed: { text: null } });
  });

  it('form value should match the configuration (range mode)', () => {
    component.schema = form(
      range(['start', 'end']).span(1)
    );

    expect(component.form.getRawValue()).toEqual({ 'start,end': null });
  });

  it('model value should match the configuration (basic)', () => {
    component.schema = form(
      text('text').span(1)
    );
    component['form2model'](
      component.form.getRawValue(),
      component.model ??= {},
      component.schema
    );

    expect(component.model).toEqual({ text: null });
  });

  it('model value should match the configuration (nested forms)', () => {
    component.schema = form(
      embed('embed').span(1).schema(form(
        text('text').span(1)
      ))
    );
    component['form2model'](
      component.form.getRawValue(),
      component.model ??= {},
      component.schema
    );

    expect(component.model).toEqual({ embed: { text: null } });
  });

  it('model value should match the configuration (range mode)', () => {
    component.schema = form(
      range(['start', 'end']).span(1)
    );
    component['form2model'](
      component.form.getRawValue(),
      component.model ??= {},
      component.schema
    );

    expect(component.model).toEqual({ start: null, end: null });
  });

  it('form value should match the model value (basic)', () => {
    component.schema = form(
      text('text').span(1)
    );
    component.model = { text: 'test' };

    expect(component.form.getRawValue()).toEqual(component.model);
  });

  it('form value should match the model value (nested forms)', () => {
    component.schema = form(
      embed('embed').span(1).schema(form(
        text('text').span(1)
      ))
    );
    component.model = { embed: { text: 'test' } };

    expect(component.form.getRawValue()).toEqual(component.model);
  });

  it('form value should match the model value (range mode)', () => {
    component.schema = form(
      range(['start', 'end']).span(1)
    );
    component.model = { start: null, end: null };

    expect(component.form.getRawValue()).toEqual({ 'start,end': [null, null] });
  });
});
