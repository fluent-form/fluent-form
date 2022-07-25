import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ComponentSchema, ControlSchema } from '../../schemas';
import { Arr, Obj } from '../../type';

export type ComponentTemplateRef<T extends Obj | Arr> = TemplateRef<{ control: AbstractControl, schema: ComponentSchema | ControlSchema, model: T }>;

/**
 * 这个组件专门用来放可复用的模板
 * @internal
 */
@Component({
  selector: 'fluent-template',
  templateUrl: './fluent-template.component.html',
  styleUrls: ['./fluent-template.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FluentTemplateComponent<T extends Obj | Arr> {
  @ViewChild('componentTemplate', { static: true }) componentTemplate!: ComponentTemplateRef<T>;

  /** @internal */
  readonly infinity: number = Infinity;

}
