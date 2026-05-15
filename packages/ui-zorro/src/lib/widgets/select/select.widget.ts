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
  InvokePipe,
  StylePipe,
  WidgetTemplateContext
} from '@fluent-form/core';
import { SafeAny } from '@ngify/core';
import { NzFilterOptionType, NzSelectItemInterface, NzSelectModule } from 'ng-zorro-antd/select';
import { filter, Subject, tap } from 'rxjs';
import { StatusPipe } from '../../pipes';
import { SelectControlSchema } from '../../schemas';

type SelectWidgetTemplateContext = WidgetTemplateContext<SelectControlSchema, FormControl>;

const defaultFilterOption: NzFilterOptionType = (searchValue: string, item: NzSelectItemInterface): boolean => {
  if (item && item.nzLabel) {
    return item.nzLabel.toString().toLowerCase().includes(searchValue.toLowerCase());
  } else {
    return false;
  }
};

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
    StylePipe,
    InvokePipe
  ],
  templateUrl: './select.widget.html',
  styles: `nz-select { width: 100% }`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SelectWidget extends AbstractWidget<SelectWidgetTemplateContext> {
  protected readonly ControlWrapperDirective = FluentControlWrapperDirective;
  protected readonly infinity = Infinity;
  protected readonly compareWith = (a: SafeAny, b: SafeAny) => a === b;
  protected readonly helper = {
    serverSearchable: (schema: SelectControlSchema) => {
      // TODO more thinking
      if (typeof schema.searchable === 'boolean') {
        return schema.searchable && schema.fetchOptions;
      }
      return schema.searchable?.server && schema.fetchOptions;
    }
  };

  protected readonly ctxClass = SelectWidgetTemplatePrivateContext;
  readonly defaultFilter = defaultFilterOption;
}

export class SelectWidgetTemplatePrivateContext {
  private readonly keyword$ = new Subject<string>();

  options: SelectControlSchema['options'] = [];
  loading = false;
  open = false;

  constructor(schema: SelectControlSchema, control: FormControl) {
    const fetchOptionsFn = schema.fetchOptions;
    const cdr = inject(ChangeDetectorRef);

    if (schema.options) {
      this.options = schema.options;
    }

    if (fetchOptionsFn) {
      this.keyword$.pipe(
        filter(() => this.open), // 选中后关闭浮层也会触发一次 keyword$，此时 open=false，过滤掉
        tap(() => this.loading = true),
        source => fetchOptionsFn(source, { schema, control, model: {} }) // TODO: bug, model 始终是空对象 {}，不会更新
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
