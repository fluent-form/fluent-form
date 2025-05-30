import { computed, DestroyRef, Directive, effect, forwardRef, HostListener, inject, input, model, output, untracked } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { type FormControlStatus, FormGroup } from '@angular/forms';
import type { AnyArray, AnyObject } from '@ngify/types';
import type { AbstractFormGroupSchema } from '../../schemas';
import { NAMED_TEMPLATES } from '../../tokens';
import { FormUtil, ModelUtil } from '../../utils';
import { FluentControlContainer, FluentControlContainerDirective } from './models/control-container';

@Directive({
  selector: '[fluentSchema]',
  exportAs: 'fluentForm',
  standalone: true,
  providers: [
    {
      provide: FluentControlContainer,
      useExisting: forwardRef(() => FluentFormDirective)
    },
    {
      provide: NAMED_TEMPLATES,
      useFactory: () => []
    }
  ]
})
export class FluentFormDirective<T extends AnyObject | AnyArray> extends FluentControlContainerDirective<T> {
  private readonly formUtil = inject(FormUtil);
  private readonly modelUtil = inject(ModelUtil);
  private internalModel!: T;

  readonly schema = input.required<AbstractFormGroupSchema>({ alias: 'fluentSchema' });
  readonly model = model.required<T>({ alias: 'fluentModel' });

  readonly patchedSchema = computed(() => this.schemaUtil.patch(this.schema()));
  readonly form = computed<FormGroup>(() =>
    this.formUtil.createFormGroup(this.patchedSchema(), untracked(() => this.model()))
  );

  readonly formChange = output<FormGroup>({ alias: 'fluentFormChange' });
  readonly valueChanges = output<T>({ alias: 'fluentValueChanges' });
  readonly statusChanges = output<FormControlStatus>({ alias: 'fluentStatusChanges' });
  /** The submit event will only be triggered when the host element is a form element */
  // eslint-disable-next-line @angular-eslint/no-output-native
  readonly submit = output<SubmitEvent>({ alias: 'fluentSubmit' });

  constructor() {
    super();

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
  }

  @HostListener('submit', ['$event'])
  onSubmit(event: SubmitEvent) {
    this.submit.emit(event);
    return (event?.target as HTMLFormElement | null)?.method === 'dialog';
  }

  private onValueChanges() {
    const form = this.form();
    const { schemas } = this.patchedSchema();

    this.formUtil.updateForm(
      form,
      this.internalModel = this.formUtil.updateModel(
        {} as T,
        form,
        schemas,
      ),
      schemas,
    );
    this.model.set(this.internalModel);
  }

}
