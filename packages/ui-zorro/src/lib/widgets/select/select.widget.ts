import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentColumnPipe, FluentContextDirective, FluentContextGuardDirective, FluentGridModule, FluentInjectDirective, FluentLifeCycleDirective, FluentReactivePipe, FluentTemplatePipe, WidgetTemplateContext } from '@fluent-form/core';
import { AnyObject } from '@ngify/types';
import { NzFormNoStatusService } from 'ng-zorro-antd/core/form';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Subject, filter, tap } from 'rxjs';
import { SelectControlSchema } from '../../schemas';

type SelectWidgetTemplateContext = WidgetTemplateContext<SelectControlSchema, FormControl>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzSelectModule,
    NzOutletModule,
    FluentGridModule,
    FluentInjectDirective,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentContextDirective,
    FluentLifeCycleDirective,
    FluentReactivePipe,
    FluentColumnPipe,
    FluentTemplatePipe
  ],
  templateUrl: './select.widget.html',
  styles: [`nz-select { width: 100% }`]
})
export class SelectWidget extends AbstractWidget<SelectWidgetTemplateContext> {
  protected readonly InputGroup = NzFormNoStatusService;
  protected readonly infinity = Infinity;
  protected readonly ctxClass = SelectWidgetTemplatePrivateContext;
}

export class SelectWidgetTemplatePrivateContext {
  private readonly keyword$ = new Subject<string>();
  private readonly cdr = inject(ChangeDetectorRef);

  open = false;

  init(schema: SelectControlSchema, model: AnyObject, control: FormControl) {
    const fetchOptionsFn = schema.fetchOptions;

    if (fetchOptionsFn) {
      this.keyword$.pipe(
        filter(() => this.open), // 选中后关闭浮层也会触发一次 keyword$，此时 open=false，过滤掉
        tap(() => schema.loading = true),
        source => fetchOptionsFn(source, { schema, model, control }), // TODO: bug, model 始终是空对象 {}，不会更新
      ).subscribe(options => {
        schema.options = options;
        schema.loading = false;
        this.cdr.detectChanges();
      });
    }
  }

  destroy() {
    this.keyword$.complete();
  }

  trigger(keyword: string) {
    this.keyword$.next(keyword);
  }
}
