import { Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ComponentSchema, ControlSchema } from '../../schemas';
import { Arr, Obj } from '../../types';

export type ComponentTemplateRef<T extends Obj | Arr> = TemplateRef<{
  /** 当前控件 */
  control: AbstractControl;
  /** 当前图示 */
  schema: ComponentSchema | ControlSchema;
  /** 当前模型值 */
  model: T;
  /** 有类名 */
  classful: boolean;
}>;

@Component({
  selector: 'fluent-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.css']
})
export class FluentOutletComponent<T extends Obj | Arr> implements OnInit {
  @Input() control!: AbstractControl;
  @Input() schema!: ControlSchema | ComponentSchema;
  @Input() model!: T;
  @Input() classful: boolean = true;

  @ViewChild('componentTemplate', { static: true }) componentTemplate!: ComponentTemplateRef<T>;

  /** @internal */
  readonly infinity: number = Infinity;

  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    this.viewContainerRef.createEmbeddedView(this.componentTemplate, this);
  }

}
