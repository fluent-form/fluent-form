import { Directive, TemplateRef, ViewChild } from '@angular/core';

@Directive()
export abstract class TemplateRefHolder<C> {
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<C>;
}
