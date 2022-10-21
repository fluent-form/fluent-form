import { Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ComponentSchema, ControlSchema } from '../../schemas';
import { AnyArray, AnyObject } from '../../types';

export interface FluentControlTemplateContext<T extends AnyObject | AnyArray> {
  /** 当前控件 */
  control: AbstractControl;
  /** 当前图示 */
  schema: ComponentSchema | ControlSchema;
  /** 当前模型值 */
  model: T;
  /** 有类名 */
  classful: boolean;
}

@Component({
  selector: 'fluent-control-outlet',
  templateUrl: './control-outlet.component.html',
  styleUrls: ['./control-outlet.component.css'],
  host: {
    '[style.display]': `'none'`
  }
})
export class FluentControlOutletComponent<T extends AnyObject | AnyArray> implements OnInit, FluentControlTemplateContext<T> {
  @Input() control!: AbstractControl;
  @Input() schema!: ControlSchema | ComponentSchema;
  @Input() model!: T;
  @Input() classful: boolean = true;

  @ViewChild('controlTemplate', { static: true }) controlTemplateRef!: TemplateRef<FluentControlTemplateContext<T>>;

  /** @internal */
  readonly infinity: number = Infinity;

  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    this.viewContainerRef.createEmbeddedView(this.controlTemplateRef, this);
  }

}
