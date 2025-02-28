import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentColumnPipe, FluentContextGuardDirective, FluentControlWrapperDirective, FluentGridModule, FluentInjectPipe, FluentNewPipe, FluentReactivePipe, FluentTemplatePipe, WidgetTemplateContext } from '@fluent-form/core';
import { AnyObject, SafeAny } from '@ngify/types';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { filter, Subject, tap } from 'rxjs';
import { SelectControlSchema } from '../../schemas';
import { NzSpaceCompactItemDirective } from '../space-compact/lib/space-compact-item.directive';

type SelectWidgetTemplateContext = WidgetTemplateContext<SelectControlSchema, FormControl>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzSelectModule,
    NzSpaceCompactItemDirective,
    NzOutletModule,
    FluentGridModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentColumnPipe,
    FluentTemplatePipe,
    FluentInjectPipe,
    FluentNewPipe,
  ],
  templateUrl: './select.widget.html',
  styles: [`nz-select { width: 100% }`]
})
export class SelectWidget extends AbstractWidget<SelectWidgetTemplateContext> {
  protected readonly ControlWrapperDirective = FluentControlWrapperDirective;
  protected readonly infinity = Infinity;
  protected readonly compareWith = (a: SafeAny, b: SafeAny) => a === b;
  protected readonly ctxClass = SelectWidgetTemplatePrivateContext;
}

export class SelectWidgetTemplatePrivateContext {
  private readonly keyword$ = new Subject<string>();

  open = false;

  constructor(schema: SelectControlSchema, model: AnyObject, control: FormControl) {
    const fetchOptionsFn = schema.fetchOptions;
    const cdr = inject(ChangeDetectorRef);

    if (fetchOptionsFn) {
      this.keyword$.pipe(
        filter(() => this.open), // 选中后关闭浮层也会触发一次 keyword$，此时 open=false，过滤掉
        tap(() => schema.loading = true),
        source => fetchOptionsFn(source, { schema, model, control }), // TODO: bug, model 始终是空对象 {}，不会更新
      ).subscribe(options => {
        schema.options = options;
        schema.loading = false;
        cdr.detectChanges();
      });
    }

    inject(DestroyRef).onDestroy(() => {
      this.keyword$.complete();
    });
  }

  trigger(keyword: string) {
    this.keyword$.next(keyword);
  }
}
