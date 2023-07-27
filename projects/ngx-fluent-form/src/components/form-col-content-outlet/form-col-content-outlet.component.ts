import { NgClass, NgFor, NgIf, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AnyArray, AnyObject } from '@ngify/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FluentBindingDirective, FluentWithInjectorDirective } from '../../directives';
import { FluentColumnPipe, FluentControlPipe, FluentReactivePipe, FluentSchemaPipe, FluentTemplatePipe, TypeofPipe } from '../../pipes';
import { AnySchema, StandardSchema } from '../../schemas';
import { SchemaKind } from '../../schemas/interfaces';
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
    NgFor,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    NzFormModule,
    NzGridModule,
    FluentBindingDirective,
    FluentWithInjectorDirective,
    FluentReactivePipe,
    FluentSchemaPipe,
    FluentControlPipe,
    FluentTemplatePipe,
    FluentColumnPipe,
    TypeofPipe
  ],
  templateUrl: './form-col-content-outlet.component.html',
  host: {
    '[style.display]': `'none'`
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FluentFormColContentOutletComponent<T extends AnyObject | AnyArray> implements OnInit {
  protected readonly config = inject(CONFIG);
  protected readonly SchemaKind = SchemaKind;
  private readonly viewContainerRef = inject(ViewContainerRef);

  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<FluentFormColContentTemplateContext<T>>;

  @Input() control!: AbstractControl;
  @Input() schema!: StandardSchema<AnySchema>;
  @Input() model!: T;

  ngOnInit(): void {
    this.viewContainerRef.createEmbeddedView(this.templateRef, this);
  }

}
