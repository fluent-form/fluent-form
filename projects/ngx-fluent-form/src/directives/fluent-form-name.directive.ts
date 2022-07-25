import { Directive, EventEmitter, forwardRef, Host, Input, OnInit, Output, SkipSelf } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { startWith, takeUntil } from 'rxjs';
import { AnySchema, ComponentSchema, ControlContainerSchema, ControlSchema } from '../schemas';
import { Destroyer } from '../services/destroyer.service';
import { Arr, Obj } from '../type';
import { schemasUtils } from '../utils';
import { ControlContainer } from './control-container';
import { FluentControlOutletDirective } from './fluent-control-outlet.directive';
import { FluentFormDirective } from './fluent-form.directive';

@Directive({
  selector: '[fluentFormName]',
  providers: [
    Destroyer,
    {
      provide: ControlContainer,
      useExisting: forwardRef(() => FluentFormNameDirective)
    }
  ]
})
export class FluentFormNameDirective<T extends Obj | Arr> extends ControlContainer implements OnInit {
  private directives: FluentControlOutletDirective<T>[] = [];
  schemas!: AnySchema[];
  form!: AbstractControl;
  model!: T;
  @Input('fluentFormName') name!: string | number;

  @Output() formChange: EventEmitter<FormGroup> = new EventEmitter();

  override get directive(): FluentFormDirective<Obj> | FluentFormNameDirective<Obj> | null {
    return this as FluentFormNameDirective<Obj>;
  }

  constructor(
    @Host() @SkipSelf() private controlContainer: ControlContainer,
    private destroy$: Destroyer
  ) {
    super();
  }

  ngOnInit() {
    this.controlContainer.directive!.formChange.pipe(
      startWith(this.controlContainer.directive!.form),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.form = this.controlContainer.directive!.form.get([this.name])!;
      this.schemas = schemasUtils(this.controlContainer.directive!.schemas).find<ControlContainerSchema>(this.name)!.schemas as AnySchema[];
      this.model = this.controlContainer.directive!.model[this.name as keyof (Obj | Arr)] as T;

      this.directives.forEach(directive => {
        directive.control = this.form.get([directive.name])!;
        directive.schema = schemasUtils(this.schemas).find<ComponentSchema | ControlSchema>(directive.name)!;
      });
    });
  }

  addDirective(directive: FluentControlOutletDirective<T>) {
    this.updateDirective(directive);
    this.directives = this.directives.concat(directive);
  }

  updateDirective(directive: FluentControlOutletDirective<T>) {
    directive.control = this.form.get([directive.name])!;
    directive.schema = schemasUtils(this.schemas).find<ComponentSchema | ControlSchema>(directive.name)!;
  }

  removeDirective(directive: FluentControlOutletDirective<T>) {
    this.directives = this.directives.filter(o => o !== directive);
  }
}
