import { Directive, EventEmitter, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AnySchema, ComponentSchema, ControlSchema } from '../../schemas';
import { AnyArray, AnyObject } from '../../types';
import { schemasUtils } from '../../utils';
import { FluentOutletDirective } from '../outlet.directive';

/**
 * 抽象的控件容器
 */
export abstract class ControlContainer<T extends AnyObject | AnyArray> {
  /** 当前图示 */
  abstract schemas: AnySchema[];
  /** 当前表单 */
  abstract form: AbstractControl;
  /** 当前模型 */
  abstract model: T;

  /** 当前容器的指令 */
  abstract get directive(): ControlContainerDirective<T>;

}

@Directive()
export abstract class ControlContainerDirective<T extends AnyObject | AnyArray> extends ControlContainer<T> {
  @Output('fluentFormChange') formChange: EventEmitter<AbstractControl> = new EventEmitter();

  protected directives: FluentOutletDirective<T>[] = [];

  /**
   * 添加子指令
   * @param directive
   */
  addDirective(directive: FluentOutletDirective<T>) {
    this.assignDirective(directive);
    this.directives = this.directives.concat(directive);
  }

  /**
   * 分配参数到子指令
   * @param directive
   */
  assignDirective(directive: FluentOutletDirective<T>) {
    directive.control = this.form.get([directive.name]) ?? this.form;
    directive.schema = schemasUtils(this.schemas).find<ComponentSchema | ControlSchema>(directive.name)!;
  }

  /**
   * 移除子指令
   * @param directive
   */
  removeDirective(directive: FluentOutletDirective<T>) {
    this.directives = this.directives.filter(o => o !== directive);
  }
}