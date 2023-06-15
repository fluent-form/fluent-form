import { Directive, forwardRef, Host, Input, OnInit, SkipSelf } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AnyArray, AnyObject } from '@ngify/types';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { startWith, takeUntil } from 'rxjs';
import { AnyControlContainerSchema, AnySchema, StandardSchema } from '../../schemas';
import { schemasUtils } from '../../utils';
import { ControlContainerDirective, FluentControlContainer } from './models/control-container';

@Directive({
  selector: '[fluentFormKey]',
  exportAs: 'fluentFormKey',
  standalone: true,
  providers: [
    NzDestroyService,
    {
      provide: FluentControlContainer,
      useExisting: forwardRef(() => FluentFormKeyDirective)
    }
  ]
})
export class FluentFormKeyDirective<T extends AnyObject | AnyArray> extends ControlContainerDirective<T> implements OnInit {
  /** @internal */
  schemas!: StandardSchema<AnySchema>[];
  /** @internal */
  form!: AbstractControl;

  @Input('fluentFormKey') key!: string | number;

  /** @internal */
  get directive(): ControlContainerDirective<T> {
    return this;
  }
  /** @internal */
  get model(): T {
    return this.controlContainer.directive.model[this.key as keyof T] as T;
  }

  constructor(
    @Host() @SkipSelf() private controlContainer: FluentControlContainer<T>,
    private destroy$: NzDestroyService
  ) {
    super();
  }

  ngOnInit() {
    this.controlContainer.directive.formChange.pipe(
      startWith(this.controlContainer.directive.form),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.formChange.emit(
        this.form = this.controlContainer.directive.form.get([this.key])!
      );
      this.schemas = schemasUtils(this.controlContainer.directive.schemas)
        .find<StandardSchema<AnyControlContainerSchema>>(this.key)!.schemas;

      this.directives.forEach(directive => this.assignDirective(directive));
    });
  }
}
