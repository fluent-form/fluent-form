import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, Injector } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzFormNoStatusService } from 'ng-zorro-antd/core/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Subject, tap } from 'rxjs';
import { FluentBindingDirective, FluentContextDirective, FluentContextGuardDirective, FluentInjectDirective, FluentLifeCycleDirective } from '../../directives';
import { FluentCallPipe, FluentColumnPipe } from '../../pipes';
import { SelectControlSchema } from '../../schemas';
import { AbstractWidget, WidgetTemplateContext } from '../abstract.widget';

type SelectWidgetTemplateContext = WidgetTemplateContext<SelectControlSchema, FormControl>;

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    NgStyle,
    ReactiveFormsModule,
    NzGridModule,
    NzSelectModule,
    FluentInjectDirective,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentContextDirective,
    FluentLifeCycleDirective,
    FluentCallPipe,
    FluentColumnPipe
  ],
  templateUrl: './select.widget.html',
  styles: [`nz-select { width: 100% }`]
})
export class SelectWidget extends AbstractWidget<SelectWidgetTemplateContext> {
  protected readonly NzFormNoStatusService = NzFormNoStatusService;
  protected readonly infinity = Infinity;
  protected readonly ctxClass = SelectWidgetTemplatePrivateContext;
}

export class SelectWidgetTemplatePrivateContext {
  private readonly keyword$ = new Subject<string>();
  private readonly cdr: ChangeDetectorRef;

  constructor(injector: Injector) {
    this.cdr = injector.get(ChangeDetectorRef);
  }

  init(schema: SelectControlSchema) {
    if (schema.fetchOptions) {
      this.keyword$.pipe(
        tap(() => schema.loading = true),
        schema.fetchOptions,
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
