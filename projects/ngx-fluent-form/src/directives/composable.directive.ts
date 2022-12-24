import { Directive, EmbeddedViewRef, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { NzFormNoStatusService } from 'ng-zorro-antd/core/form';

@Directive({
  selector: '[fluentComposable]',
  standalone: true
})
export class FluentComposableDirective {
  private readonly templateRef = inject(TemplateRef<void>);
  private readonly viewContainerRef = inject(ViewContainerRef);
  /** 如果有则代表当前在 input-group/number-input-group 容器里 */
  private readonly nzFormNoStatusService = inject(NzFormNoStatusService, { optional: true });
  private viewRef?: EmbeddedViewRef<void>;

  @Input()
  set fluentComposable(composableTemplateRef: TemplateRef<void>) {
    if (!this.viewRef) {
      this.viewRef = this.viewContainerRef.createEmbeddedView(
        this.nzFormNoStatusService ? composableTemplateRef : this.templateRef
      );
    }
  }

}
