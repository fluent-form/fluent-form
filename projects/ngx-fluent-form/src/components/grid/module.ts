import { NgModule } from '@angular/core';
import { FluentColComponent } from './col/col.component';
import { FluentRowComponent } from './row/row.component';

@NgModule({
  imports: [FluentRowComponent, FluentColComponent],
  exports: [FluentRowComponent, FluentColComponent],
})
export class FluentGridModule { }
