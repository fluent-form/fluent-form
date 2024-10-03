import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, EnvironmentInjector, Injector, computed, contentChildren, createComponent, effect, inject, input, model, output, untracked } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControlStatus, FormGroup } from '@angular/forms';
import { AnyObject } from '@ngify/types';
import { FluentTemplateDirective } from '../../directives';
import { AbstractFormGroupSchema } from '../../schemas';
import { FLUENT_FORM_CONTENT, TEMPLATE_DIRECTIVES } from '../../tokens';
import { FormUtil, ModelUtil, SchemaUtil } from '../../utils';

@Component({
  selector: 'fluent-form',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TEMPLATE_DIRECTIVES,
      useFactory: () => inject(FluentFormComponent).templateDirectives
    }
  ]
})
export class FluentFormComponent<T extends AnyObject> {
  private readonly formUtil = inject(FormUtil);
  private readonly modelUtil = inject(ModelUtil);
  private readonly schemaUtil = inject(SchemaUtil);
  private internalModel!: T;

  protected readonly templateRef = createComponent(
    inject(FLUENT_FORM_CONTENT),
    {
      environmentInjector: inject(EnvironmentInjector),
      elementInjector: inject(Injector)
    }
  ).instance.templateRef;

  readonly schema = input.required<AbstractFormGroupSchema>();
  readonly model = model.required<T>();

  readonly patchedSchema = computed(() => this.schemaUtil.patch(this.schema()));
  protected form = computed<FormGroup>(() =>
    this.formUtil.createFormGroup(this.patchedSchema(), untracked(() => this.model()))
  );

  readonly formChange = output<FormGroup>();
  readonly valueChanges = output<T>();
  readonly statusChanges = output<FormControlStatus>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  readonly submit = output<SubmitEvent>();

  readonly templateDirectives = contentChildren(FluentTemplateDirective);

  constructor() {
    const destroyRef = inject(DestroyRef);

    effect(() => {
      const form = this.form();
      untracked(() => {
        this.formChange.emit(form);
        this.onValueChanges();

        form.valueChanges.pipe(takeUntilDestroyed(destroyRef)).subscribe(value => {
          this.onValueChanges();
          this.valueChanges.emit(value);
        });

        form.statusChanges.pipe(takeUntilDestroyed(destroyRef)).subscribe(status =>
          this.statusChanges.emit(status)
        );
      });
    });

    let modelChangeCounter = 0;
    effect(() => {
      const model = this.model();
      untracked(() => {
        // 如果是外部变更，就赋值到表单
        if (modelChangeCounter++ > 0 && model !== this.internalModel) {
          this.modelUtil.updateForm(
            this.form(),
            model,
            this.patchedSchema().schemas
          );
        }
      });
    });
  }

  private onValueChanges() {
    const form = this.form();
    const { schemas } = this.patchedSchema();

    this.formUtil.updateForm(
      form,
      this.internalModel = this.formUtil.updateModel(
        {} as T,
        form,
        schemas
      ),
      schemas
    );
    this.model.set(this.internalModel);
  }

}
