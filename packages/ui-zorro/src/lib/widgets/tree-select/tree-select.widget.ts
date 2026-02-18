import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  FluentReactivePipe,
  InvokePipe,
  StylePipe,
  WidgetTemplateContext,
  isBoolean,
  isUndefined
} from '@fluent-form/core';
import { SafeAny } from '@ngify/core';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { StatusPipe } from '../../pipes';
import { TreeSelectControlSchema } from '../../schemas';

type TreeSelectWidgetTemplateContext = WidgetTemplateContext<TreeSelectControlSchema, FormControl<SafeAny[]>>;

/**
 * @internal
 */
@Component({
  imports: [
    ReactiveFormsModule,
    NzTreeSelectModule,
    FluentGridModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentColumnPipe,
    FluentInjectPipe,
    InvokePipe,
    StatusPipe,
    ClassPipe,
    StylePipe
  ],
  templateUrl: './tree-select.widget.html',
  styles: `nz-tree-select { width: 100% }`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TreeSelectWidget extends AbstractWidget<TreeSelectWidgetTemplateContext> {
  protected readonly ControlWrapperDirective = FluentControlWrapperDirective;
  protected readonly helper = {
    checkable: (checkable: TreeSelectControlSchema['checkable']) =>
      isBoolean(checkable) ? checkable : !isUndefined(checkable?.strict),
    checkStrictly: (checkable: TreeSelectControlSchema['checkable']) =>
      isBoolean(checkable) || !checkable?.strict ? false : checkable.strict,
    showExpand: (expandIcon: TreeSelectControlSchema['expandIcon']) =>
      isUndefined(expandIcon) ? true : !!expandIcon,
    expandedIcon: (expandIcon: TreeSelectControlSchema['expandIcon']) =>
      isBoolean(expandIcon) ? undefined : expandIcon
  } as const;
}
