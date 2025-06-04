import { NgModule } from '@angular/core';
import { FluentColDirective } from './col/col.component';
import { FluentRowDirective } from './row/row.component';

@NgModule({
  imports: [FluentRowDirective, FluentColDirective],
  exports: [FluentRowDirective, FluentColDirective]
})
export class FluentGridModule { }
