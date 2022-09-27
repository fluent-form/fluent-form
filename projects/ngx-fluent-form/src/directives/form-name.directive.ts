import { Directive, EventEmitter, forwardRef, Host, Input, OnInit, Output, SkipSelf } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { startWith, takeUntil } from 'rxjs';
import { AnySchema, ComponentSchema, ControlContainerSchema, ControlSchema } from '../schemas';
import { Arr, Obj } from '../types';
import { schemasUtils } from '../utils';
import { ControlContainer } from './control-container';
import { FluentControlOutletDirective } from './control-outlet.directive';
import { FluentFormDirective } from './form.directive';

@Directive({
  selector: '[fluentFormName]',
  providers: [
    NzDestroyService,
    {
      provide: ControlContainer,
      useExisting: forwardRef(() => FluentFormNameDirective)
    }
  ]
})
export class FluentFormNameDirective<T extends Obj | Arr> extends ControlContainer<T> implements OnInit {
  private directives: FluentControlOutletDirective<T>[] = [];
  @Input('fluentFormName') name!: string | number;

  @Output() formChange: EventEmitter<FormGroup> = new EventEmitter();

  get directive(): FluentFormDirective<T> | FluentFormNameDirective<T> {
    return this;
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
      this.form = this.controlContainer.directive.form.get([this.name])!;
      this.schemas = schemasUtils(this.controlContainer.directive.schemas).find<ControlContainerSchema>(this.name)!.schemas as AnySchema[];
      this.model = this.controlContainer.directive.model[this.name as keyof (Obj | Arr)] as T;

      this.directives.forEach(directive => this.assignDirective(directive));
    });
  }

  /**
   * 添加子指令
   * @param directive
   */
  addDirective(directive: FluentControlOutletDirective<T>) {
    this.assignDirective(directive);
    this.directives = this.directives.concat(directive);
  }

  /**
   * 分配参数到子指令
   * @param directive
   */
  assignDirective(directive: FluentControlOutletDirective<T>) {
    directive.control = this.form.get([directive.name])!;
    directive.schema = schemasUtils(this.schemas).find<ComponentSchema | ControlSchema>(directive.name)!;
  }

  /**
   * 移除子指令
   * @param directive
   */
  removeDirective(directive: FluentControlOutletDirective<T>) {
    this.directives = this.directives.filter(o => o !== directive);
  }
}
