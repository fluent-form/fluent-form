import { Directive, forwardRef, Host, Input, OnInit, SkipSelf } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { startWith, takeUntil } from 'rxjs';
import { AnyControlContainerSchema, AnySchema } from '../schemas';
import { AnyArray, AnyObject } from '../types';
import { schemasUtils } from '../utils';
import { ControlContainer, ControlContainerDirective } from './models/control-container';

@Directive({
  selector: '[fluentFormName]',
  exportAs: 'fluentFormName',
  standalone: true,
  providers: [
    NzDestroyService,
    {
      provide: ControlContainer,
      useExisting: forwardRef(() => FluentFormNameDirective)
    }
  ]
})
export class FluentFormNameDirective<T extends AnyObject | AnyArray> extends ControlContainerDirective<T> implements OnInit {
  /** @internal */
  schemas!: AnySchema[];
  /** @internal */
  form!: AbstractControl;

  @Input('fluentFormName') name!: string | number;

  /** @internal */
  get directive(): ControlContainerDirective<T> {
    return this;
  }
  /** @internal */
  get model(): T {
    return this.controlContainer.directive.model[this.name as keyof T] as T;
  }

  constructor(
    @Host() @SkipSelf() private controlContainer: ControlContainer<T>,
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
        this.form = this.controlContainer.directive.form.get([this.name])!
      );
      this.schemas = schemasUtils(this.controlContainer.directive.schemas).find<AnyControlContainerSchema>(this.name)!.schemas as AnySchema[];

      this.directives.forEach(directive => this.assignDirective(directive));
    });
  }
}
