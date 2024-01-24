import { Component } from '@angular/core';
import { FluentGridModule } from 'ngx-fluent-form';

@Component({
  standalone: true,
  imports: [FluentGridModule],
  templateUrl: './fit.component.html',
  styleUrls: ['../common.scss']
})
export class FitExampleComponent { }
