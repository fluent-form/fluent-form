import { Directive, EventEmitter, forwardRef, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { AnySchema, ComponentSchema, ControlSchema } from '../schemas';
import { Destroyer } from '../services/destroyer.service';
import { Arr, Obj } from '../type';
import { createFormGroup, formUtils, FormUtils, modelUtils, schemasUtils, standardSchemas } from '../utils';
import { ControlContainer } from './control-container';
import { FluentControlOutletDirective } from './fluent-control-outlet.directive';
import { FluentFormNameDirective } from './fluent-form-name.directive';

@Directive({
  selector: '[fluentForm]',
  providers: [
    Destroyer,
    {
      provide: ControlContainer,
      useExisting: forwardRef(() => FluentFormDirective)
    }
  ]
})
export class FluentFormDirective<T extends Obj> extends ControlContainer {
  private _model!: T;
  private _schemas!: AnySchema[];
  private directives: FluentControlOutletDirective<Obj | Arr>[] = [];

  /** @internal */
  form!: FormGroup;

  @Input('fluentForm')
  get schemas(): AnySchema[] {
    return this._schemas;
  }
  set schemas(value: AnySchema[]) {
    this._schemas = standardSchemas(value);
  }

  /** 模型 */
  @Input() model!: T;

  @Output() formChange: EventEmitter<FormGroup> = new EventEmitter();
  @Output() modelChange: EventEmitter<T> = new EventEmitter();

  override get directive(): FluentFormDirective<Obj> | FluentFormNameDirective<Obj> | null {
    return this as FluentFormDirective<Obj>;
  }

  constructor(private destroy$: Destroyer) {
    super();
  }

  ngOnChanges({ schemas: schemasChange, model: modelChange }: SimpleChanges): void {
    if (schemasChange) {
      schemasChange.firstChange || this.destroy$.next();

      this.formChange.emit(this.form = createFormGroup(this.schemas));

      this.directives.forEach(directive => {
        directive.control = this.form.get([directive.name])!;
        directive.schema = schemasUtils(this.schemas).find<ComponentSchema | ControlSchema>(directive.name)!;
      });

      // 先把模型赋值到表单（使用模型初始化表单）
      modelUtils(this.model as Obj, this.schemas).assign(this.form);
      // 此时表单已就绪，把表单赋值到模型
      const utils = formUtils(this.form, this.schemas);
      this.updateModel(utils);

      this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.updateModel(utils);
      });
    }

    // 如果是首次变更（首次的初始化已在上面处理了）
    // 并且当前模型值与内部的模型值不一致
    if (modelChange && !modelChange.firstChange && modelChange.currentValue !== this._model) {
      modelUtils(this.model as Obj, this.schemas).assign(this.form);
    }
  }

  addDirective(directive: FluentControlOutletDirective<Obj | Arr>) {
    this.updateDirective(directive);
    this.directives = this.directives.concat(directive);
  }

  updateDirective(directive: FluentControlOutletDirective<Obj | Arr>) {
    directive.control = this.form.get([directive.name])!;
    directive.schema = schemasUtils(this.schemas).find<ComponentSchema | ControlSchema>(directive.name)!;
  }

  removeDirective(directive: FluentControlOutletDirective<Obj | Arr>) {
    this.directives = this.directives.filter(o => o !== directive);
  }

  /**
   * 更新模型
   * @param utils
   */
  private updateModel(utils: FormUtils<FormGroup>) {
    utils.assign(this.model);
    this.modelChange.emit(this._model = utils.assign({} as T));
  }
}
