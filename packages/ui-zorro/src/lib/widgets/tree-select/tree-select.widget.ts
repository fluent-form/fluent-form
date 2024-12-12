import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AbstractWidget, FluentBindingDirective, FluentColumnPipe, FluentContextGuardDirective, FluentControlWrapperDirective, FluentGridModule, FluentInjectPipe, FluentReactivePipe, InvokePipe, WidgetTemplateContext, isBoolean, isUndefined } from '@fluent-form/core';
import { SafeAny } from '@ngify/types';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { TreeSelectControlSchema } from '../../schemas';
import { NzSpaceCompactItemDirective } from '../space-compact/lib/space-compact-item.directive';

type TreeSelectWidgetTemplateContext = WidgetTemplateContext<TreeSelectControlSchema, FormControl<SafeAny[]>>;

/**
 * @internal
 */
@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzTreeSelectModule,
    NzSpaceCompactItemDirective,
    FluentGridModule,
    FluentBindingDirective,
    FluentContextGuardDirective,
    FluentReactivePipe,
    FluentColumnPipe,
    FluentInjectPipe,
    InvokePipe
  ],
  templateUrl: './tree-select.widget.html',
  styles: [`nz-tree-select { width: 100% }`]
})
export class TreeSelectWidget extends AbstractWidget<TreeSelectWidgetTemplateContext> {
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
