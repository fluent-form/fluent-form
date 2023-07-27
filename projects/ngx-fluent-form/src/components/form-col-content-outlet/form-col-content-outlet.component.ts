import { NgClass, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AnyArray, AnyObject } from '@ngify/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FluentWithInjectorDirective } from '../../directives';
import { FluentControlPipe, FluentReactivePipe, FluentSchemaPipe, FluentSchemaTypePipe, FluentTemplatePipe, TypeofPipe } from '../../pipes';
import { AnySchema, StandardSchema } from '../../schemas';
import { SchemaKind, SchemaType } from '../../schemas/interfaces';
import { CONFIG } from '../../tokens';

interface FluentFormColContentTemplateContext<T extends AnyObject | AnyArray> {
  /** 当前控件 */
  control: AbstractControl;
  /** 当前图示 */
  schema: StandardSchema<AnySchema>;
  /** 当前模型值 */
  model: T;
}

@Component({
  selector: 'fluent-form-col-content-outlet',
  standalone: true,
  imports: [
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgClass,
    NgTemplateOutlet,
    NzFormModule,
    FluentWithInjectorDirective,
    FluentReactivePipe,
    FluentSchemaPipe,
    FluentControlPipe,
    FluentTemplatePipe,
    FluentSchemaTypePipe,
    TypeofPipe
  ],
  templateUrl: './form-col-content-outlet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FluentFormColContentOutletComponent<T extends AnyObject | AnyArray> implements OnInit {
  protected readonly config = inject(CONFIG);
  protected readonly SchemaKind = SchemaKind;
  protected readonly SchemaType = SchemaType;
  private readonly viewContainerRef = inject(ViewContainerRef);

  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<FluentFormColContentTemplateContext<T>>;

  @Input() control!: AbstractControl;
  @Input() schema!: StandardSchema<AnySchema>;
  @Input() model!: T;

  ngOnInit(): void {
    this.viewContainerRef.createEmbeddedView(this.templateRef, this);
  }

}
