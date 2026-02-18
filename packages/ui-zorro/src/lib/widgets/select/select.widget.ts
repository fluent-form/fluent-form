import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  AbstractWidget,
  ClassPipe,
  FluentBindingDirective,
  FluentColumnPipe,
  FluentContextGuardDirective,
  FluentControlWrapperDirective,
  FluentGridModule,
  FluentInjectPipe,
  FluentNewPipe,
  FluentReactivePipe,
  FluentTemplateOutlet,
  FluentTemplatePipe,
  StylePipe,
  WidgetTemplateContext
} from '@fluent-form/core';
import { AnyObject, SafeAny } from '@ngify/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { filter, Subject, tap } from 'rxjs';
import { StatusPipe } from '../../pipes';
import { SelectControlSchema } from '../../schemas';

type SelectWidgetTemplateContext = WidgetTemplateContext<SelectControlSchema, FormControl>;

/**
 * @internal
 */
@Component({
  imports: [
    ReactiveFormsModule,
    NzSelectModule,
    FluentTemplateOutlet,
    FluentGridModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentColumnPipe,
    FluentTemplatePipe,
    FluentInjectPipe,
    FluentNewPipe,
    StatusPipe,
    ClassPipe,
    StylePipe
  ],
  templateUrl: './select.widget.html',
  styles: `nz-select { width: 100% }`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SelectWidget extends AbstractWidget<SelectWidgetTemplateContext> {
  protected readonly ControlWrapperDirective = FluentControlWrapperDirective;
  protected readonly infinity = Infinity;
  protected readonly compareWith = (a: SafeAny, b: SafeAny) => a === b;
  protected readonly ctxClass = SelectWidgetTemplatePrivateContext;
}

export class SelectWidgetTemplatePrivateContext {
  private readonly keyword$ = new Subject<string>();

  options: SelectControlSchema['options'] = [];
  loading = false;
  open = false;

  constructor(schema: SelectControlSchema, model: AnyObject, control: FormControl) {
    const fetchOptionsFn = schema.fetchOptions;
    const cdr = inject(ChangeDetectorRef);

    if (schema.options) {
      this.options = schema.options;
    }

    if (fetchOptionsFn) {
      this.keyword$.pipe(
        filter(() => this.open), // 选中后关闭浮层也会触发一次 keyword$，此时 open=false，过滤掉
        tap(() => this.loading = true),
        source => fetchOptionsFn(source, { schema, model, control }) // TODO: bug, model 始终是空对象 {}，不会更新
      ).subscribe(options => {
        this.options = options;
        this.loading = false;
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
