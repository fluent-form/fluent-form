import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ComponentSchema, ComposableComponentSchema, ControlSchema } from '../../schemas';

export type ComponentTemplateRef<T extends Record<string, unknown>> = TemplateRef<{ control: AbstractControl, schema: ComponentSchema | ControlSchema, model: T }>;
export type ComposableComponentTemplateRef<T extends Record<string, unknown>> = TemplateRef<{ control: AbstractControl, schema: ComposableComponentSchema, model: T }>;

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
  @ViewChild('componentTemplate', { static: true }) componentTemplate!: ComponentTemplateRef<T>;
  @ViewChild('composableComponentTemplate', { static: true }) composableComponentTemplate!: ComposableComponentTemplateRef<T>;

  /** @internal */
  readonly infinity: number = Infinity;

}
