import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ComponentSchema, ComposableComponentSchema, ControlSchema } from '../../schemas';

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
export class FluentTemplateComponent<T extends Record<string, unknown>> {
  @ViewChild('componentTemplate', { static: true })
  componentTemplate!: TemplateRef<{ control: AbstractControl, schema: ComponentSchema | ControlSchema, model: T }>;
  @ViewChild('composableComponentTemplate', { static: true })
  composableComponentTemplate!: TemplateRef<{ control: AbstractControl, schema: ComposableComponentSchema, model: T }>;

  /** @internal */
  readonly infinity: number = Infinity;

}
