import { NgClass, NgFor, NgIf, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FluentBinderDirective, FluentWithContextGuardDirective, FluentWithInjectorDirective } from '../../directives';
import { FluentCallPipe, FluentControlPipe, FluentSchemaPipe, FluentTypeofPipe, FluentWidgetTemplateRefPipe } from '../../pipes';
import { AnySchema } from '../../schemas';
import { CONFIG } from '../../tokens';
import { AnyArray, AnyObject } from '../../types';
import { FluentControlOutletComponent } from '../control-outlet/control-outlet.component';

interface FluentFormColContentTemplateContext<T extends AnyObject | AnyArray> {
  /** 当前控件 */
  control: AbstractControl;
  /** 当前图示 */
  schema: AnySchema;
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
    NgClass,
    NgStyle,
    NgSwitchDefault,
    NgTemplateOutlet,
    NzDividerModule,
    NzFormModule,
    FluentControlOutletComponent,
    FluentBinderDirective,
    FluentWithContextGuardDirective,
    FluentWithInjectorDirective,
    FluentCallPipe,
    FluentSchemaPipe,
    FluentControlPipe,
    FluentTypeofPipe,
    FluentWidgetTemplateRefPipe
  ],
  templateUrl: './form-col-content-outlet.component.html',
  host: {
    '[style.display]': `'none'`
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FluentFormColContentOutletComponent<T extends AnyObject | AnyArray> implements OnInit {
  protected config = inject(CONFIG);

  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<FluentFormColContentTemplateContext<T>>;

  @Input() control!: AbstractControl;
  @Input() schema!: AnySchema;
  @Input() model!: T;

  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    this.viewContainerRef.createEmbeddedView(this.templateRef, this);
  }

}
