import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EnvironmentInjector,
  Injector,
  computed,
  createComponent,
  effect,
  inject,
  input,
  model,
  output,
  untracked
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { type FormControlStatus, FormGroup } from '@angular/forms';
import type { AnyObject } from '@ngify/core';
import type { AbstractFormGroupSchema } from '../../schemas';
import { FLUENT_FORM_CONTENT, NAMED_TEMPLATES } from '../../tokens';
import { FormUtil, ModelUtil, SchemaUtil } from '../../utils';

@Component({
  selector: 'fluent-form',
  imports: [NgTemplateOutlet],
  templateUrl: './form.component.html',
  providers: [
    {
      provide: NAMED_TEMPLATES,
      useFactory: () => []
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FluentForm<T extends AnyObject> {
  private readonly formUtil = inject(FormUtil);
  private readonly modelUtil = inject(ModelUtil);
  private readonly schemaUtil = inject(SchemaUtil);
  private internalModel!: T;

  protected readonly formContentRef = createComponent(
    inject(FLUENT_FORM_CONTENT),
    {
      environmentInjector: inject(EnvironmentInjector),
      elementInjector: inject(Injector)
    }
  );

  readonly schema = input.required<AbstractFormGroupSchema>();
  readonly model = model.required<T>();

  readonly patchedSchema = computed(() => this.schemaUtil.patch(this.schema()));
  readonly form = computed<FormGroup>(() =>
    this.formUtil.createFormGroup(this.patchedSchema(), untracked(this.model)));

  readonly formChange = output<FormGroup>();
  readonly valueChanges = output<T>();
  readonly statusChanges = output<FormControlStatus>();
  // eslint-disable-next-line @angular-eslint/no-output-native
  readonly submit = output<SubmitEvent>();

  readonly onSubmit = (event: SubmitEvent) => {
    event.stopPropagation();
    this.submit.emit(event);
    // Forms with `method="dialog"` have some special behavior that won't reload the page and that
    // shouldn't be prevented. Note that we need to null check the `event` and the `target`, because
    // some internal apps call this method directly with the wrong arguments.
    return (event?.target as HTMLFormElement | null)?.method === 'dialog';
  };

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
          this.statusChanges.emit(status));
      });
    });

    let modelChangeCounter = 0;
    effect(() => {
      const model = this.model();
      untracked(() => {
        // If the change comes from outside, assign the value to the form.
        if (modelChangeCounter++ > 0 && model !== this.internalModel) {
          this.modelUtil.updateForm(
            this.form(),
            model,
            this.patchedSchema().schemas
          );
        }
      });
    });

    destroyRef.onDestroy(() => this.formContentRef.destroy());
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

/**
 * @deprecated
 * This component will be removed in future versions. Please use {@link FluentForm} instead.
 */
export const FluentFormComponent = FluentForm;
